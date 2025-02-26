import {createCookieSessionStorage, redirect} from "@remix-run/node";
import type {Register} from "~/model/auth-model";
import claimCouponApi from "~/services/api";

export const baseUrl: string | undefined = process.env.BASE_URL;
export async function login(token : string) {
	const api = claimCouponApi(token, baseUrl);
	return api.login();
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
	throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
	cookie: {
		name: "RJ_session",
		// normally you want this to be `secure: true`
		// but that doesn't work on localhost for Safari
		// https://web.dev/when-to-use-local-https/
		secure: process.env.NODE_ENV === "production",
		secrets: [sessionSecret],
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 30,
		httpOnly: true,
	},
});

function getUserSession(request: Request) {
	return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserToken(request: Request) {
	const session = await getUserSession(request);
	const userToken = session.get("userToken");
	if (!userToken || typeof userToken !== "string") {
		return null;
	}
	return userToken;
}

export async function requireUserToken(request: Request) {
	const session = await getUserSession(request);
	const userToken = session.get("userToken");
	if (!userToken || typeof userToken !== "string") {
		throw redirect(`/login`);
	}
	return userToken;
}

export async function createUserSession(userToken: string | null) {
	const session = await storage.getSession();
	session.set("userToken", userToken);
	return redirect("/dashboard", {
		headers: {
			"Set-Cookie": await storage.commitSession(session),
		},
	});
}

export async function getUser(request: Request) {
	const userToken = await getUserToken(request);
	if (typeof userToken !== "string") {
		return null;
	}

	const api = claimCouponApi(userToken, baseUrl);
	const user = api.profile();

	if (!user) {
		throw await logout(request);
	}

	return user;
}

export async function logout(request: Request) {
	const session = await getUserSession(request);
	return redirect("/login", {
		headers: {
			"Set-Cookie": await storage.destroySession(session),
		},
	});
}

export async function register(data: Register, token: string | null) {
	const api = claimCouponApi(token, baseUrl);
	const user = api.register(data);
	if (!user) {
		return null;
	}

	return user;
}

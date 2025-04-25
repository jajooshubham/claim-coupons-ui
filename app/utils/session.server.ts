import {createCookieSessionStorage, redirect} from "@remix-run/node";
import type {Register} from "~/model/auth-model";
import claimCouponApi from "~/services/api";

export const baseUrl: string | undefined = process.env.BASE_URL;
export async function login(token : string | null) {
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
		maxAge: 86400000,
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

	const user = await login(userToken);

	let redirectParameter: string = "/";
	if(user.data == "success") {
		redirectParameter = "/dashboard";
	} else if(user.data == "User not Exists") {
		redirectParameter = "/register";
	} else {
		throw "Failed to register";
	}

	return redirect(redirectParameter, {
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

export function checkTokenExpiry(token: string) {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const decodedPayload = JSON.parse(atob(base64));

	const exp = decodedPayload.exp; // expiry time in seconds
	const currentTime = Math.floor(Date.now() / 1000);

	return exp >= currentTime;
}

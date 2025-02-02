import { Form, Link, useActionData } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { badRequest } from "~/utils/request.server";
import type { Login } from "~/model/auth-model";
import { createUserSession, login } from "~/utils/session.server";
import logo from "../assets/logo.jpg"

// Validation functions
function validateEmail(email: string) {
	if (email.length < 3) {
		return "Email must be at least 3 characters long";
	}
}

function validatePassword(password: string) {
	if (password.length < 6) {
		return "Passwords must be at least 6 characters long";
	}
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const form = await request.formData();
	const password = form.get("password");
	const email = form.get("email");

	if (typeof password !== "string" || typeof email !== "string") {
		return badRequest({
			fieldErrors: null,
			fields: null,
			formError: "Form not submitted correctly.",
		});
	}

	const fields : Login = { password, email };
	const fieldErrors = {
		password: validatePassword(password),
		email: validateEmail(email),
	};
	if (Object.values(fieldErrors).some(Boolean)) {
		return badRequest({
			fieldErrors,
			fields,
			formError: null,
		});
	}

    const user = await login({ email, password });
	if (!user) {
		return badRequest({
			fieldErrors: null,
			fields,
			formError: "Username/Password combination is incorrect",
		});
	}

	return createUserSession(await user.data.token);
};

export default function Login() {
	const actionData = useActionData<typeof action>();

	return (
		<section className="bg-gray-50">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<Link
					to="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
				>
					<img
						className="h-16 mr-2"
						src={logo}
						alt="logo"
					/>
				</Link>
				<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
							Sign in to your account
						</h1>
						<Form method="POST" className="space-y-4 md:space-y-6" action="#">
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900"
								>
									Your email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
									placeholder="name@company.com"
									required={true}
									defaultValue={actionData?.fields?.email}
									aria-invalid={Boolean(actionData?.fieldErrors?.email)}
									aria-errormessage={
										actionData?.fieldErrors?.email ? "email-error" : undefined
									}
								/>
								{actionData?.fieldErrors?.email ? (
									<p
										className="text-red-700 form-validation-error"
										role="alert"
										id="email-error"
									>
										{actionData.fieldErrors.email}
									</p>
								) : null}
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900"
								>
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
									required={true}
									defaultValue={actionData?.fields?.password}
									aria-invalid={Boolean(actionData?.fieldErrors?.password)}
									aria-errormessage={
										actionData?.fieldErrors?.password
											? "password-error"
											: undefined
									}
								/>
								{actionData?.fieldErrors?.password ? (
									<p
										className="text-red-700 form-validation-error"
										role="alert"
										id="password-error"
									>
										{actionData.fieldErrors.password}
									</p>
								) : null}
							</div>
							<button
								type="submit"
								className="w-full text-primary bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
							>
								Sign In
							</button>
							<p className="text-sm font-light text-gray-500">
								Don’t have an account yet?
								<Link
									to="/register"
									className="font-medium text-primary-600 hover:underline"
								>
									{" "}
									Sign Up
								</Link>
							</p>
						</Form>
					</div>
				</div>
			</div>
		</section>
	);
}

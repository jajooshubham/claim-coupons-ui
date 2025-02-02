import { Form, Link, useActionData } from "@remix-run/react";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { badRequest } from "~/utils/request.server";
import type { Register } from "~/model/auth-model";
import { register } from "~/utils/session.server";
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
	const phoneNumber = form.get("phoneNumber");
	const name = form.get("name");
	const parlourName = form.get("parlourName");
	const address = form.get("address");
	const pinCode = form.get("pinCode");

	if (
		typeof password !== "string" ||
		typeof email !== "string" ||
		typeof name !== "string" ||
		typeof phoneNumber !== "string" ||
		typeof parlourName !== "string" ||
		typeof address !== "string" ||
		typeof pinCode !== "string"
	) {
		return badRequest({
			fieldErrors: null,
			fields: null,
			formError: "Form not submitted correctly.",
		});
	}

	const fields: Register = {
		password,
		email,
		phoneNumber,
		name,
		parlourName,
		address,
		pinCode,
	};
	const fieldErrors = {
		password: validatePassword(password),
		email: validateEmail(email),
		phoneNumber: "",
		parlourName: "",
		address: "",
		pinCode: "",
		name: "",
	};
	if (Object.values(fieldErrors).some(Boolean)) {
		return badRequest({
			fieldErrors,
			fields,
			formError: null,
		});
	}

	const user = await register({
		email,
		parlourName,
		password,
		phoneNumber,
		pinCode,
		name,
		address,
	});
	if (!user) {
		return badRequest({
			fieldErrors: null,
			fields,
			formError: "Username/Password combination is incorrect",
		});
	}
	return redirect("/login");
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
				<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
							Sign up to your account
						</h1>
						<Form method="POST" className="space-y-4 md:space-y-6" action="#">
							<div className="flex justify-between gap-4">
								<div>
									<label
										htmlFor="name"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Your Name
									</label>
									<input
										type="text"
										name="name"
										id="name"
										className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
										placeholder="name"
										required={true}
										defaultValue={actionData?.fields?.name}
										aria-invalid={Boolean(actionData?.fieldErrors?.name)}
										aria-errormessage={
											actionData?.fieldErrors?.name ? "name-error" : undefined
										}
									/>
									{actionData?.fieldErrors?.name ? (
										<p
											className="text-red-700 form-validation-error"
											role="alert"
											id="name-error"
										>
											{actionData.fieldErrors.name}
										</p>
									) : null}
								</div>
								<div>
									<label
										htmlFor="phoneNumber"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Your Phone Number
									</label>
									<input
										type="tel"
										name="phoneNumber"
										id="phoneNumber"
										className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
										placeholder="+91 1234567890"
										required={true}
										defaultValue={actionData?.fields?.phoneNumber}
										aria-invalid={Boolean(actionData?.fieldErrors?.phoneNumber)}
										aria-errormessage={
											actionData?.fieldErrors?.phoneNumber
												? "phone-error"
												: undefined
										}
									/>
									{actionData?.fieldErrors?.phoneNumber ? (
										<p
											className="text-red-700 form-validation-error"
											role="alert"
											id="phone-error"
										>
											{actionData.fieldErrors.phoneNumber}
										</p>
									) : null}
								</div>
							</div>
							<div className="flex justify-between gap-4">
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
							</div>

							<div>
								<label
									htmlFor="parlourName"
									className="block mb-2 text-sm font-medium text-gray-900"
								>
									Your Parlour Name
								</label>
								<input
									type="text"
									name="parlourName"
									id="parlourName"
									className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
									placeholder="Beauty parlour"
									required={true}
									defaultValue={actionData?.fields?.parlourName}
									aria-invalid={Boolean(actionData?.fieldErrors?.parlourName)}
									aria-errormessage={
										actionData?.fieldErrors?.parlourName
											? "parlour-error"
											: undefined
									}
								/>
								{actionData?.fieldErrors?.parlourName ? (
									<p
										className="text-red-700 form-validation-error"
										role="alert"
										id="parlour-error"
									>
										{actionData.fieldErrors.parlourName}
									</p>
								) : null}
							</div>
							<div className="flex justify-between gap-4">
								<div>
									<label
										htmlFor="address"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Your Address
									</label>
									<input
										type="text"
										name="address"
										id="address"
										className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
										placeholder="402, abc society"
										required={true}
										defaultValue={actionData?.fields?.address}
										aria-invalid={Boolean(actionData?.fieldErrors?.address)}
										aria-errormessage={
											actionData?.fieldErrors?.address
												? "address-error"
												: undefined
										}
									/>
									{actionData?.fieldErrors?.address ? (
										<p
											className="text-red-700 form-validation-error"
											role="alert"
											id="address-error"
										>
											{actionData.fieldErrors.address}
										</p>
									) : null}
								</div>
								<div>
									<label
										htmlFor="pinCode"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Your Pin Code
									</label>
									<input
										type="number"
										name="pinCode"
										id="pinCode"
										className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
										placeholder="402878"
										required={true}
										defaultValue={actionData?.fields?.pinCode}
										aria-invalid={Boolean(actionData?.fieldErrors?.pinCode)}
										aria-errormessage={
											actionData?.fieldErrors?.pinCode
												? "pincode-error"
												: undefined
										}
									/>
									{actionData?.fieldErrors?.pinCode ? (
										<p
											className="text-red-700 form-validation-error"
											role="alert"
											id="pincode-error"
										>
											{actionData.fieldErrors.pinCode}
										</p>
									) : null}
								</div>
							</div>
							<button
								type="submit"
								className="w-full text-primary bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
							>
								Sign Up
							</button>
							<p className="text-sm font-light text-gray-500">
								You have an account
								<Link
									to="/login"
									className="font-medium text-primary-600 hover:underline"
								>
									{" "}
									Sign In
								</Link>
							</p>
						</Form>
					</div>
				</div>
			</div>
		</section>
	);
}

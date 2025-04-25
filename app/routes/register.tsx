import {Form, Link, useActionData, useNavigation} from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { badRequest } from "~/utils/request.server";
import type { Register } from "~/model/auth-model";
import {createUserSession, register, requireUserToken} from "~/utils/session.server";
import logo from "../assets/logo.jpg"

export const action = async ({ request }: ActionFunctionArgs) => {
	const token = await requireUserToken(request);

	const form = await request.formData();
	const name = form.get("name");
	const parlourName = form.get("parlourName");
	const address = form.get("address");
	const pinCode = form.get("pinCode");

	if (
		typeof name !== "string" ||
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
		name,
		parlourName,
		address,
		pinCode,
	};
	const fieldErrors = {
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
		parlourName,
		pinCode,
		name,
		address,
	}, token);
	if (!user) {
		return badRequest({
			fieldErrors: null,
			fields,
			formError: "Username/Password combination is incorrect",
		});
	}
	return createUserSession(token);
};

export default function Register() {
	const actionData = useActionData<typeof action>();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

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
						<Form method="POST" className="space-y-4 md:space-y-6" action={`/register`}>
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
										placeholder="Name"
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
											placeholder="Parlour Name"
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
												placeholder="Address"
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
												type="text"
												name="pinCode"
												id="pinCode"
												className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
												placeholder="6 digin Pin code"
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
										{isSubmitting ? "Submitting..." : "Register"}
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

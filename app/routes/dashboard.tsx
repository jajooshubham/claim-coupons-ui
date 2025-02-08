import {LoaderFunctionArgs} from "@remix-run/node";
import {isRouteErrorResponse, Link, Outlet, useLoaderData, useRouteError} from "@remix-run/react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import {ToastProvider} from "~/components/ToastProvider";
import {getUser, requireUserToken} from "~/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	await requireUserToken(request);
	return await getUser(request);
};

export default function Dashboard() {
	const user = useLoaderData<typeof loader>();
	console.log(user);
	return (
		<ToastProvider>
			<div className="w-full px-4 lg:px-0">
				<Header points={user?.data.points} />
				<main className="mx-auto sm:max-w-xl md:max-w-full py-10 px-4 lg:px-8">
					<Outlet context={user?.data} />
				</main>
				<Footer />
			</div>
		</ToastProvider>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();


	if (isRouteErrorResponse(error) && error.status === 404) {
		return (
			<div className="error-container">
				<p>There are no jokes to display.</p>
			</div>
		);
	}

	return (
		<div
			className="p-4 m-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
			role="alert">
			<p>
				<span className="font-medium">Warning alert!</span>
				Change a few things up and try submitting again.
			</p>
			<br />
			<Link to="/dashboard">Refresh and Try again</Link>
		</div>
	);
}
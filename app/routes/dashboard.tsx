import {LoaderFunctionArgs} from "@remix-run/node";
import {Outlet} from "@remix-run/react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import {requireUserToken} from "~/utils/session.server";
import {ToastProvider} from "~/components/ToastProvider";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	return await requireUserToken(request);
};

export default function Dashboard() {
	return (
		<ToastProvider>
			<div className="jokes-layout">
				<Header />
				<main className="jokes-main">
					<Outlet />
				</main>
				<Footer />
			</div>
		</ToastProvider>
	);
}

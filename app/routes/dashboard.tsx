import { LoaderFunctionArgs } from "@remix-run/node";
import { data, Outlet } from "@remix-run/react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { requireUserToken } from "~/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userToken = await requireUserToken(request);

	return data(userToken);
};

export default function Dashboard() {
	return (
		<div className="jokes-layout">
			<Header />
			<main className="jokes-main">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

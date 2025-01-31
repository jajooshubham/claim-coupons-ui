import ProductCard from "~/components/ProductCard";
import {LoaderFunctionArgs} from "@remix-run/node";
import {baseUrl, requireUserToken} from "~/utils/session.server";
import claimCouponApi from "~/services/api";
import {isRouteErrorResponse, Link, useFetcher, useLoaderData, useRouteError} from "@remix-run/react";
import {Product} from "~/model/products";
import {useEffect, useState} from "react";
import {useToast} from "~/hooks/useToast";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userToken = await requireUserToken(request);
	const api = claimCouponApi(userToken, baseUrl);

	return await api.products();
};

export default function IndexRoute() {
	const loaderData = useLoaderData<typeof loader>();
	const fetcher = useFetcher<typeof fetch>();
	const {addToast} = useToast();
	const [loading, setLoading] = useState(false);

	const buyNowAction = (productId: number) => {
		setLoading(true);
		fetcher.submit(null, {
			action: `/dashboard/buy/${productId}`,
			method: "POST",
			encType: "application/json",
		})
	}

	useEffect(() => {
		if(!fetcher.data) return;
		addToast(fetcher.data?.data, fetcher.data.status === 200 ? "success" : "error");
		setLoading(false);
	}, [fetcher.data]);

	return (
		<div className="m-4 grid gap-4 sm:grid-cols-3 md:mb-8 lg:grid-cols-4 xl:grid-cols-4">
			{loaderData.status === 200 && loaderData.data.map((product: Product) => (
				<ProductCard key={product.productId} product={product} buyNow={buyNowAction} loading={loading} />
			))}
		</div>
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
import ProductCard from "~/components/ProductCard";
import {LoaderFunctionArgs} from "@remix-run/node";
import {baseUrl, requireUserToken} from "~/utils/session.server";
import claimCouponApi from "~/services/api";
import {useFetcher, useLoaderData} from "@remix-run/react";
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
			action: `/dashboard/order/${productId}`,
			method: "POST",
			encType: "application/json",
		})
	}

	useEffect(() => {
		if(!fetcher.data) return;
		console.log(fetcher.data);
		(fetcher.data.data !== '')
			? addToast(fetcher.data?.data, "success")
			: addToast("Credit limit Exceed", "error")
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
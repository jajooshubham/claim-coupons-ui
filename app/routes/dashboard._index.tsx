import ProductCard from "~/components/ProductCard";

export default function IndexRoute() {
	return (
		<div className="m-4 grid gap-4 sm:grid-cols-3 md:mb-8 lg:grid-cols-4 xl:grid-cols-4">
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
		</div>
	);
}

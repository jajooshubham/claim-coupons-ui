import { Link } from "@remix-run/react";
import {Product} from "~/model/products";

export default function ProductCard({product, buyNow, loading}: {
	product: Product,
	buyNow: (productId: number) => void,
	loading?: boolean
}) {
	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<div className="h-56 w-full">
				<Link to="#">
					<img
						className="mx-auto h-full"
						src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
						alt=""
					/>
					<img
						className="mx-auto hidden h-full"
						src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
						alt=""
					/>
				</Link>
			</div>
			<div className="pt-6">
				<Link
					to="#"
					className="text-lg font-semibold leading-tight text-gray-900 hover:underline"
				>
					{product.name}
				</Link>

				<div className="mt-4 flex items-center justify-between gap-4">
					<p className="text-md font-extrabold leading-tight text-gray-900">
						{product.price} Points
					</p>

					<button
						type="button"
						onClick={() => buyNow(product.productId)}
						className="bg-lime-700 text-white inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300"
					>
						{loading ?
							<>
								<svg
									aria-hidden="true"
									role="status"
									className="inline w-4 h-4 me-3 text-white animate-spin"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="#E5E7EB"/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentColor"/>
								</svg>
								<span>Buying</span>
							</>
							:
							<>
								<svg
									className="-ms-2 me-2 h-5 w-5"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
									/>

								</svg>
								<span>Buy Now</span>
							</>
						}
					</button>
				</div>
			</div>
		</div>
	);
}

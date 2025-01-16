import { Link } from "@remix-run/react";

export default function ProductCard() {
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
					Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max
				</Link>

				<div className="mt-4 flex items-center justify-between gap-4">
					<p className="text-2xl font-extrabold leading-tight text-gray-900">
						$1,699
					</p>

					<button
						type="button"
						className="bg-lime-700 text-white inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300"
					>
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
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
							/>
						</svg>
						Buy Now
					</button>
				</div>
			</div>
		</div>
	);
}

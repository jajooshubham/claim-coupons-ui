import { Link } from "@remix-run/react";
import logo from "../assets/logo.jpg"

export default function IndexRoute() {
	return (
		<section className="bg-gray-50 h-screen">
			<div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
				<div className="mr-auto place-self-center lg:col-span-7">
					<h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-lime-700">
						Market place to purchase products
					</h1>
					<p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
						Enter coupons code from plants care products and redeem points by purchase items from the portal
					</p>
					<Link
						to="/dashboard"
						className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300"
					>
						Purchase Items
						<svg
							className="w-5 h-5 ml-2 -mr-1"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
					</Link>
					<Link
						to="/login"
						className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
					>
						Sign In
					</Link>
				</div>
				<div className="lg:mt-0 lg:col-span-5 lg:flex">
					<img
						src={logo}
						alt="Plants Care"
					/>
				</div>
			</div>
		</section>
	);
}

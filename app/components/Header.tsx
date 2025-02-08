import { Link } from "@remix-run/react";
import logo from "../assets/logo.jpg"

export default function Header({points}: { points: number | string }) {

	return (
		<nav className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
			<div
				className="md:h-16 h-28 mx-auto flex items-center justify-between flex-wrap md:flex-nowrap shadow-sm">
				<div className="md:order-1">
					<Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
						<img
							src={logo}
							className="h-16"
							alt="Plants care Logo"
						/>
					</Link>
				</div>
				<div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
					<ul className="flex font-semibold justify-between">
						<li className="md:px-4 md:py-2">
							<Link
								to="/dashboard"
								className="block py-2 px-3 primary-text border-b border-gray-100 hover: md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 "
								aria-current="page"
							>
								Home
							</Link>
						</li>
						<li className="md:px-4 md:py-2">
							<Link
								to="/dashboard/account"
								className="block py-2 px-3 primary-text border-b border-gray-100 hover: md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 "
								aria-current="page"
							>
								Account
							</Link>
						</li>
						<li className="md:px-4 md:py-2">
							<Link
								to="/dashboard/claim-coupons"
								className="block py-2 px-3 primary-text border-b border-gray-100 hover: md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 "
								aria-current="page"
							>
								Claim Coupons
							</Link>
						</li>
					</ul>
				</div>
				<div className="order-2 md:order-3">
					<button
						className="bg-lime-700 text-white font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5"
					>
						Your Points {points}
					</button>
				</div>
			</div>
		</nav>
	);
}

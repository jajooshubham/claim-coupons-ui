import { Link } from "@remix-run/react";

export default function Header() {
	return (
		<nav className="bg-white text-lime-500 border-gray-200 z-20 top-0 start-0 w-full">
			<div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
				<Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
					<img
						src=""
						className="h-5"
						alt="Plants care Logo"
					/>
				</Link>
				<div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
					<button
						className="bg-lime-700 text-white font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5"
					>
						Your Ponts 200
					</button>
					<button
						data-collapse-toggle="navbar-sticky"
						type="button"
						className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
						aria-controls="navbar-sticky"
						aria-expanded="false"
					>
						<span className="sr-only">Open main menu</span>
						<svg
							className="w-5 h-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 17 14"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 1h15M1 7h15M1 13h15"
							/>
						</svg>
					</button>
				</div>
				<div
					id="navbar-sticky"
					className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
				>
					<ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
						<li>
							<Link
								to="/"
								className="block py-2 px-3 primary-text border-b border-gray-100 hover: md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 "
								aria-current="page"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/contact"
								className="block py-2 px-3 primary-text border-b border-gray-100 hover: md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 "
								aria-current="page"
							>
								Contact
							</Link>
						</li>
						<li>
							<Link
								to="/dashboard/account"
								className="block py-2 px-3 primary-text border-b border-gray-100 hover: md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 "
								aria-current="page"
							>
								Account
							</Link>
						</li>						
					</ul>
				</div>
			</div>
		</nav>
	);
}

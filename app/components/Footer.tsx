import { Link } from "@remix-run/react";
import logo from "../assets/logo.jpg"

export default function Footer() {
	return (
		<div className="pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
			<div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
				<div className="sm:col-span-2">
					<Link
						to="/dashboard"
						aria-label="Go home"
						title="Company"
						className="inline-flex items-center"
					>
						<img
							src={logo}
							className="h-16"
							alt="Plants Care Logo"
						/>
					</Link>
					<div className="mt-6 lg:max-w-sm">
						<p className="text-sm text-gray-800">
							Manufacturer of beauty products, aloe vera gel & face cream since 2020
						</p>
					</div>
				</div>
				<div className="space-y-2 text-sm">
					<p className="text-base font-bold tracking-wide text-gray-900">
						Contacts
					</p>
					<div className="flex">
						<p className="mr-1 text-gray-800">Phone:</p>
						<Link
							to="tel:+917796714556"
							aria-label="Our phone"
							title="Our phone"
							className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
						>
							+91 77967 14556
						</Link>
					</div>
					<div className="flex">
						<p className="mr-1 text-gray-800">Email:</p>
						<Link
							to="mailto:help@plantscare.com"
							aria-label="Our email"
							title="Our email"
							className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
						>
							help@plantscare.com
						</Link>
					</div>
				</div>
				<div>
					<span className="text-base font-bold tracking-wide text-gray-900">
						Address
					</span>
					<div className="flex items-center my-1 space-x-3">
						<Link
							to="https://maps.app.goo.gl/8SNCgjX1vjsXpTuq8"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Our address"
							title="Our address"
							className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
						>
							NATUREEXPERT AYURVEDIC PVT. LTD. IP 2,
							Haridwar-249402, (UK) INDIA.
						</Link>
					</div>
				</div>
			</div>
			<div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
				<p className="text-sm text-gray-600">
					© Copyright 2025 Plants care. All rights reserved.
				</p>
			</div>
		</div>
	);
}

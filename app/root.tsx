import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	isRouteErrorResponse,
	useRouteError,
} from "@remix-run/react";
import type { PropsWithChildren } from "react";
import stylesheet from "~/styles/tailwind.css?url";
import logo from "./assets/logo.jpg";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: stylesheet }
];

export const meta: MetaFunction = () => {
	const description = "Plants Care offers an atom points system, where you can earn points by claiming coupons and redeem products using those points.";

	return [
		{ name: "description", content: description },
		{ name: "twitter:description", content: description },
		{ title: "Plants care atoms points" },
	];
};

function Document({
	children,
	title = "Plants care atom point",
}: PropsWithChildren<{ title?: string }>) {
	return (
		<html lang="en">
		<head>
			<meta charSet="utf-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<meta name="keywords" content="Plants care"/>
			<meta
				name="twitter:image"
				content={logo}
			/>
			<meta name="twitter:card" content="plants care atom points"/>
			<meta name="twitter:creator" content="Plants Care"/>
			<meta name="twitter:site" content="Atom Points"/>
			<meta name="twitter:title" content="Atom Points by Plants Care"/>
			<Meta/>
			<title>{title}</title>
			<link rel="icon" type="image/jpg" href={"https://beardsnshears.in/cdn/shop/files/FAV-SVG.svg?crop=center&height=32&v=1692612504&width=32"}/>
			<Links/>
		</head>
		<body>
		{children}
		<Scripts/>
		</body>
		</html>
	);
}

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();
	console.error(error);

	if (isRouteErrorResponse(error)) {
		return (
			<Document title={`${error.status} ${error.statusText}`}>
				<div className="error-container">
					<h1>
						{error.status} {error.statusText}
					</h1>
				</div>
			</Document>
		);
	}

	const errorMessage = error instanceof Error ? error.message : "Unknown error";
	return (
		<Document title="Uh-oh!">
			<div className="error-container">
				<h1>App Error</h1>
				<pre>{errorMessage}</pre>
			</div>
		</Document>
	);
}

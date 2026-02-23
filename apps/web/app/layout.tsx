import { siteConfiguration } from "~/core/siteConfiguration";
import "./globals.css";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { language } = await siteConfiguration.details();

	return (
		<html lang={language ?? "en"}>
			<body className="antialiased">{children}</body>
		</html>
	);
}

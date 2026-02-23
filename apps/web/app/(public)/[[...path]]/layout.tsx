import Link from "next/link";
import type { PropsWithChildren } from "react";

export default async function PublicLayout({ children }: PropsWithChildren) {
	return (
		<>
			<nav>
				<Link href="/">Home</Link>
			</nav>
			<main>{children}</main>
		</>
	);
}

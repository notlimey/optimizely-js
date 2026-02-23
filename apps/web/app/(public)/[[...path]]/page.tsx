import RenderPage from "~/core/routing/content-type-router";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function Page() {
	return <RenderPage />;
}

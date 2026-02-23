import { notFound } from "next/navigation";
import {
	type ContentByPathTypename,
	getContentByPath,
} from "~/features/shared/lib/getContentByPath";
import StartPage from "~/features/shared/views/startpage";
import { siteConfiguration } from "../siteConfiguration";
import { pageComponents } from "./pages";

export default async function RenderPage() {
	const { relativePath } = await siteConfiguration.details();
	// TODO: Startpage is indexed now so you can remove this and create a content type for start page
	if (relativePath === "/") return <StartPage />;

	const content = await getContentByPath();

	if (!content) return notFound();

	const type =
		(content._concreteType as ContentByPathTypename) || content.__typename;

	const PageComponent = pageComponents[type];

	if (!PageComponent) return notFound();

	// @ts-expect-error - Sometimes content is expected to be never? 🤔
	return <PageComponent content={content} />;
}

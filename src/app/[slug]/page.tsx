import { notFound } from "next/navigation";
import ArticlePage, { articleMetadata } from "@/components/ArticlePage";
import { ARTICLES } from "@/lib/siteConfig";

type Props = { params: Promise<{ slug: string }> };

/** Unknown slugs must 404 — do not soft-serve the homepage shell */
export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return articleMetadata(article);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();
  return <ArticlePage article={article} />;
}

import type { Metadata } from "next";
import ContentPageShell from "@/components/ContentPageShell";
import ContactForm from "@/components/ContactForm";
import MarkdownContent from "@/components/MarkdownContent";
import { getMarkdown, stripLeadingH1 } from "@/lib/content";
import { BRAND, ROUTES, SITE_ORIGIN } from "@/lib/siteConfig";

const PAGE_URL = `${SITE_ORIGIN}${ROUTES.contact}`;
const PAGE_TITLE = "Contact Us - Title Case Converter";
const PAGE_DESCRIPTION =
  "Contact TitleCaseConverter.io with questions or feedback about our title case converter and guides.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: BRAND.name,
    type: "website",
  },
};

export default function ContactPage() {
  const content = stripLeadingH1(getMarkdown("contact"));
  return (
    <ContentPageShell title="Contact Us" description={PAGE_DESCRIPTION}>
      <MarkdownContent content={content} />
      <div className="mt-10">
        <ContactForm />
      </div>
    </ContentPageShell>
  );
}

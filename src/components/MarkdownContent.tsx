"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import type { Components } from "react-markdown";

type Props = {
  content: string;
  className?: string;
};

function paragraphHasImage(node: unknown): boolean {
  if (!node || typeof node !== "object" || !("children" in node)) return false;
  const children = (node as { children?: Array<{ type?: string; tagName?: string }> }).children;
  return (
    Array.isArray(children) &&
    children.some((child) => child?.type === "element" && child?.tagName === "img")
  );
}

const components: Components = {
  h1: () => null,
  h2: ({ children }) => (
    <h2 className="prose-h2">
      <span className="prose-h2-bar" aria-hidden />
      <span>{children}</span>
    </h2>
  ),
  h3: ({ children }) => <h3 className="prose-h3">{children}</h3>,
  h4: ({ children }) => <h4 className="prose-h4">{children}</h4>,
  // Images become <figure>; never nest them inside <p> (invalid HTML → hydration error)
  p: ({ node, children }) =>
    paragraphHasImage(node) ? (
      <div className="prose-p-media">{children}</div>
    ) : (
      <p className="prose-p">{children}</p>
    ),
  ul: ({ children }) => <ul className="prose-ul">{children}</ul>,
  ol: ({ children }) => <ol className="prose-ol">{children}</ol>,
  li: ({ children }) => <li className="prose-li">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="prose-quote">{children}</blockquote>
  ),
  hr: () => <hr className="prose-hr" />,
  strong: ({ children }) => <strong className="prose-strong">{children}</strong>,
  em: ({ children }) => <em className="prose-em">{children}</em>,
  table: ({ children }) => (
    <div className="prose-table-wrap">
      <table className="prose-table">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  th: ({ children }) => <th>{children}</th>,
  td: ({ children }) => <td>{children}</td>,
  a: ({ href, children }) => {
    const url = href || "#";
    const external = url.startsWith("http");
    if (external) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="prose-a">
          {children}
        </a>
      );
    }
    return (
      <Link href={url} className="prose-a">
        {children}
      </Link>
    );
  },
  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") return null;
    const isLocal = src.startsWith("/");
    return (
      <figure className="prose-figure">
        {isLocal ? (
          <span className="relative block aspect-[16/9] w-full overflow-hidden">
            <Image
              src={src}
              alt={alt || ""}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 760px"
            />
          </span>
        ) : (
          <img src={src} alt={alt || ""} loading="lazy" />
        )}
        {alt ? <figcaption className="prose-caption">{alt}</figcaption> : null}
      </figure>
    );
  },
};

export default function MarkdownContent({ content, className = "" }: Props) {
  return (
    <div className={`prose-track ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

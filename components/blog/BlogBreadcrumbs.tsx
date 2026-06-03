import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  crumbs: Crumb[];
};

export default function BlogBreadcrumbs({ crumbs }: Props) {
  return (
    <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={crumb.label}>
            {i > 0 && <span className="blog-breadcrumb-sep">/</span>}
            {isLast || !crumb.href ? (
              <span className="blog-breadcrumb-current">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="blog-breadcrumb-link">
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

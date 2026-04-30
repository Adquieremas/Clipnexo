"use client";

import CopyButton from "@/components/tools/CopyButton";

type ResultCardProps = {
  title?: string;
  text: string;
  description?: string;
  copyLabel?: string;
  copiedLabel?: string;
};

export default function ResultCard({
  title,
  text,
  description,
  copyLabel = "Copiar",
  copiedLabel = "Copiado",
}: ResultCardProps) {
  const copyText = description ? `${title ? `${title}\n` : ""}${description}` : text;

  return (
    <article className="tool-result-card">
      {title ? <h3>{title}</h3> : null}
      <p>{text}</p>
      {description ? <span>{description}</span> : null}
      <div className="tool-result-actions">
        <CopyButton text={copyText} label={copyLabel} copiedLabel={copiedLabel} />
      </div>
    </article>
  );
}

"use client";

import {
  DownloadHistoryItem,
  formatHistoryDate,
} from "@/lib/download-history";

type Props = {
  lang: string;
  items: DownloadHistoryItem[];
  compact?: boolean;
  onReuse: (item: DownloadHistoryItem) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
};

export default function DownloadHistory({
  lang,
  items,
  compact = false,
  onReuse,
  onRemove,
  onClear,
}: Props) {
  const translations = {
    es: {
      title: "Historial reciente",
      empty: "Aún no tienes elementos en el historial.",
      reuse: "Usar de nuevo",
      remove: "Eliminar",
      clearAll: "Vaciar historial",
      typeVideo: "Video",
      typeMp3: "MP3",
    },
    en: {
      title: "Recent history",
      empty: "You do not have history items yet.",
      reuse: "Use again",
      remove: "Remove",
      clearAll: "Clear history",
      typeVideo: "Video",
      typeMp3: "MP3",
    },
    pt: {
      title: "Histórico recente",
      empty: "Você ainda não tem itens no histórico.",
      reuse: "Usar novamente",
      remove: "Remover",
      clearAll: "Limpar histórico",
      typeVideo: "Vídeo",
      typeMp3: "MP3",
    },
  };

  const t = translations[lang as "es" | "en" | "pt"] || translations.es;

  return (
    <div
      style={{
        marginTop: "18px",
        textAlign: "left",
        border: compact ? "none" : "1px solid #e5e7eb",
        background: compact ? "transparent" : "#ffffff",
        borderRadius: compact ? 0 : "12px",
        padding: compact ? "0 2px" : "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          marginBottom: compact ? 0 : "12px",
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: 700,
            color: "#111827",
          }}
        >
          {t.title}
        </p>

        {items.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            style={{
              border: "none",
              background: "transparent",
              color: compact ? "#6b7280" : "#dc2626",
              fontSize: compact ? "12px" : undefined,
              fontWeight: compact ? 500 : 600,
              cursor: "pointer",
              padding: compact ? "4px 0" : 0,
            }}
          >
            {t.clearAll}
          </button>
        )}
      </div>

      {items.length === 0 ? (
        !compact && (
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#6b7280",
              lineHeight: 1.6,
            }}
          >
            {t.empty}
          </p>
        )
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: compact ? 0 : "10px",
            marginTop: compact ? "8px" : 0,
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                borderWidth: compact ? "0 0 1px" : "1px",
                borderStyle: "solid",
                borderColor: compact ? "#eef0f5" : "#e5e7eb",
                borderRadius: compact ? 0 : "10px",
                padding: compact ? "9px 2px" : "12px",
                background: compact ? "transparent" : "#f8fafc",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: compact ? "10px" : "12px",
                  alignItems: compact ? "center" : "flex-start",
                }}
              >
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title || "Thumbnail"}
                    style={{
                      width: compact ? "48px" : "72px",
                      height: compact ? "48px" : "72px",
                      objectFit: "cover",
                      borderRadius: compact ? "7px" : "8px",
                      flexShrink: 0,
                      background: "#e5e7eb",
                    }}
                  />
                ) : null}

                <div style={{ minWidth: 0, flex: 1 }}>
                  <p
                    style={{
                      margin: compact ? "0 0 2px 0" : "0 0 6px 0",
                      fontSize: compact ? "13px" : "14px",
                      fontWeight: 700,
                      color: "#111827",
                      wordBreak: compact ? "normal" : "break-word",
                      whiteSpace: compact ? "nowrap" : "normal",
                      overflow: compact ? "hidden" : "visible",
                      textOverflow: compact ? "ellipsis" : "clip",
                    }}
                  >
                    {item.title || item.description || item.url}
                  </p>

                  <p
                    style={{
                      margin: compact ? "0 0 2px 0" : "0 0 6px 0",
                      fontSize: compact ? "12px" : "13px",
                      color: "#6b7280",
                      wordBreak: compact ? "normal" : "break-word",
                      whiteSpace: compact ? "nowrap" : "normal",
                      overflow: compact ? "hidden" : "visible",
                      textOverflow: compact ? "ellipsis" : "clip",
                    }}
                  >
                    {item.url}
                  </p>

                  <p
                    style={{
                      margin: 0,
                      fontSize: compact ? "11px" : "12px",
                      color: compact ? "#8b91a1" : "#6b7280",
                    }}
                  >
                    {item.type === "mp3" ? t.typeMp3 : t.typeVideo} ·{" "}
                    {formatHistoryDate(item.createdAt, lang)}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: compact ? "8px" : "12px",
                      marginTop: compact ? "5px" : "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => onReuse(item)}
                      style={{
                        border: "none",
                        background: compact ? "#f0efff" : "#2563eb",
                        color: compact ? "#4f46e5" : "#fff",
                        borderRadius: compact ? "7px" : "8px",
                        padding: compact ? "5px 9px" : "8px 12px",
                        fontSize: compact ? "12px" : undefined,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {t.reuse}
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      style={{
                        border: "none",
                        background: "transparent",
                        color: compact ? "#8b5a67" : "#dc2626",
                        padding: compact ? "5px 4px" : "8px 0",
                        fontSize: compact ? "12px" : undefined,
                        fontWeight: compact ? 500 : 600,
                        cursor: "pointer",
                      }}
                    >
                      {t.remove}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

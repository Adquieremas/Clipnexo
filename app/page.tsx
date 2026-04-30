"use client";

import { useState, useEffect } from "react";

type DownloadResult = {
  embed?: string;
  video?: string;
  audio?: string;
  error?: string;
  raw?: {
    title?: string;
  };
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [loading, setLoading] = useState(false);
  const type = "video";

  const handleDownload = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, type }),
    });

    try {
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ error: "Error procesando respuesta" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result?.embed) {
      const existingScript = document.querySelector(
        'script[src="https://www.tiktok.com/embed.js"]'
      );

      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;

      document.body.appendChild(script);
    }
  }, [result]);

  const forceDownload = async (fileUrl: string, filename: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      alert("Error al descargar el archivo");
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(135deg, #4f46e5, #ec4899)",
        padding: "40px 0 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        body { margin: 0; }
      `}</style>
      {/* HEADER */}
      <div style={{ textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "800", textAlign: "center" }}>
          Descargador de Videos TikTok
        </h1>
        <p style={{ marginTop: 10 }}>
          Descarga videos de TikTok sin marca de agua
        </p>
      </div>

      {/* CARD */}
      <div
        style={{
          maxWidth: 500,
          margin: "40px auto",
          background: "white",
          padding: 25,
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <input
          type="text"
          placeholder="Pega aquí el enlace de TikTok..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "100%",
            padding: 15,
            borderRadius: 8,
            border: "1px solid #ddd",
            marginBottom: 15,
            color: "black",
          }}
        />

        <button
          onClick={handleDownload}
          style={{
            width: "100%",
            padding: 15,
            borderRadius: 8,
            border: "none",
            color: "white",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #6366f1, #ec4899)",
            cursor: "pointer",
          }}
        >
          DESCARGAR
        </button>

        {loading && (
          <p style={{ marginTop: 15, textAlign: "center" }}>
            Procesando...
          </p>
        )}
      </div>

      {/* RESULTADO */}
      {result && (
        <div
          style={{
            maxWidth: 900,
            margin: "40px auto",
            background: "white",
            padding: 25,
            borderRadius: 12,
            display: "flex",
            gap: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* VIDEO */}
          <div style={{ flex: 1 }}>
            {result?.video ? (
              <video
                src={result.video}
                controls
                style={{ width: "100%", borderRadius: 10 }}
              />
            ) : (
              <p style={{ color: "black" }}>No se pudo cargar el video</p>
            )}
          </div>

          {/* INFO + BOTONES */}
          <div style={{ flex: 1 }}>
            {result?.raw?.title && (
              <p style={{ color: "black", fontWeight: "bold", marginBottom: 10 }}>
                {result.raw.title}
              </p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {result?.video && (
                <button
                  onClick={() => forceDownload(result.video || "", "video.mp4")}
                  style={{
                    padding: 12,
                    background: "#2563eb",
                    color: "white",
                    textAlign: "center",
                    borderRadius: 8,
                    border: "none",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Descargar Video (Sin Marca)
                </button>
              )}

              {result?.audio && (
                <button
                  onClick={() => forceDownload(result.audio || "", "audio.mp3")}
                  style={{
                    padding: 12,
                    background: "#16a34a",
                    color: "white",
                    textAlign: "center",
                    borderRadius: 8,
                    border: "none",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Descargar Audio (MP3)
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* CONTENIDO SEO */}
      <div style={{
        maxWidth: 900,
        margin: "40px auto",
        background: "white",
        padding: 25,
        borderRadius: 12,
        color: "black",
        lineHeight: 1.6
      }}>
        <h2 style={{ fontSize: "30px", fontWeight: "700", marginTop: 20 }}>
          ¿Qué es Clipnexo descargar videos de TikTok sin marca de agua?
        </h2>
        <p>
          Clipnexo es una herramienta online gratuita que te permite descargar videos de TikTok sin marca de agua en alta calidad.
          Solo necesitas copiar el enlace del video, pegarlo en el campo superior y descargarlo en segundos.
        </p>

        <h2 style={{ fontSize: "30px", fontWeight: "700", marginTop: 20 }}>
          ¿Cómo descargar videos de TikTok?
        </h2>
        <ol>
          <li>Copia el enlace del video desde TikTok</li>
          <li>Pégalo en el campo de arriba</li>
          <li>Haz clic en descargar</li>
          <li>Guarda el video sin marca de agua</li>
        </ol>

        <h2 style={{ fontSize: "30px", fontWeight: "700", marginTop: 20 }}>
          Ventajas de usar Clipnexo
        </h2>
        <ul>
          <li>Descarga sin marca de agua</li>
          <li>Compatible con celular y PC</li>
          <li>No necesitas instalar nada</li>
          <li>Rápido y gratis</li>
        </ul>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 900, margin: "40px auto" }}>
        <h2 style={{ color: "white", textAlign: "center", fontSize: "32px", fontWeight: "800" }}>
          Preguntas frecuentes
        </h2>

        {[
          {
            q: "¿Por qué no puedo descargar el video?",
            a: "Verifica que el enlace sea correcto y que el video sea público."
          },
          {
            q: "¿Se puede descargar en HD?",
            a: "Sí, siempre que el video original tenga alta calidad."
          },
          {
            q: "¿Es seguro usar Clipnexo?",
            a: "Sí, no necesitas instalar nada ni registrarte."
          },
          {
            q: "¿Funciona en celular?",
            a: "Sí, puedes usarlo en Android, iPhone y PC."
          }
        ].map((item, i) => (
          <details key={i} style={{
            background: "white",
            padding: 15,
            borderRadius: 8,
            marginBottom: 10
          }}>
            <summary style={{ fontWeight: "bold", cursor: "pointer", color: "black", fontSize: "16px" }}>
              {item.q}
            </summary>
            <p style={{ marginTop: 10, color: "black" }}>{item.a}</p>
          </details>
        ))}
      </div>

      {/* FOOTER */}
      <footer style={{
        background: "#000",
        color: "white",
        padding: "30px 0",
        marginTop: "auto",
        width: "100%",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
          <h3>Clipnexo</h3>
          <p>Descargador de videos de TikTok sin marca de agua.</p>

          <p style={{ marginTop: 10 }}>
            Contacto: Hola@clipnexo.com
          </p>

          <div style={{ marginTop: 20, fontSize: 12, opacity: 0.7 }}>
            © 2026 Clipnexo. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </main>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const MAX_IMAGE_MB = 15;
const MAX_AUDIO_MB = 20;
const MAX_CLIP_SECONDS = 10;
const CANVAS_SIZE = 512;

const strings = {
  es: {
    imageDropText: "Arrastra una imagen aquí o haz clic para seleccionarla",
    imageDropHint: "JPG, PNG, WebP o GIF (máx. 15 MB)",
    audioDropText: "Arrastra un audio aquí o haz clic para seleccionarlo",
    audioDropHint: "MP3, WAV, OGG o M4A (máx. 20 MB)",
    notImage: "El archivo seleccionado no es una imagen válida.",
    notAudio: "El archivo seleccionado no es un audio válido.",
    imageTooBig: "La imagen es demasiado grande. Usa un archivo de máximo 15 MB.",
    audioTooBig: "El audio es demasiado grande. Usa un archivo de máximo 20 MB.",
    audioError: "No se pudo leer el archivo de audio.",
    start: "Inicio del recorte",
    duration: "Duración",
    seconds: "s",
    preview: "Reproducir recorte",
    generate: "Generar sticker con sonido",
    generating: "Generando video...",
    download: "Descargar WebM",
    clear: "Limpiar todo",
    notSupported: "Tu navegador no soporta la grabación de video. Prueba con la última versión de Chrome o Firefox.",
    resultTitle: "Tu sticker con sonido",
    legal: "Usa solo imágenes y sonidos que tengas permiso de usar.",
    privacy: "La imagen y el audio se procesan en tu navegador. No se suben a ningún servidor.",
    soundsCta: "Buscar sonidos gratis",
    memesCta: "Buscar memes gratis",
  },
  en: {
    imageDropText: "Drag an image here or click to select it",
    imageDropHint: "JPG, PNG, WebP or GIF (max 15 MB)",
    audioDropText: "Drag an audio file here or click to select it",
    audioDropHint: "MP3, WAV, OGG or M4A (max 20 MB)",
    notImage: "The selected file is not a valid image.",
    notAudio: "The selected file is not a valid audio file.",
    imageTooBig: "The image is too large. Use a file up to 15 MB.",
    audioTooBig: "The audio is too large. Use a file up to 20 MB.",
    audioError: "Could not read the audio file.",
    start: "Clip start",
    duration: "Duration",
    seconds: "s",
    preview: "Play clip",
    generate: "Generate sound sticker",
    generating: "Generating video...",
    download: "Download WebM",
    clear: "Clear all",
    notSupported: "Your browser doesn't support video recording. Try the latest version of Chrome or Firefox.",
    resultTitle: "Your sound sticker",
    legal: "Use only images and sounds you have permission to use.",
    privacy: "The image and audio are processed in your browser. Nothing is uploaded to any server.",
    soundsCta: "Browse free sounds",
    memesCta: "Browse free memes",
  },
  pt: {
    imageDropText: "Arraste uma imagem aqui ou clique para selecionar",
    imageDropHint: "JPG, PNG, WebP ou GIF (máx. 15 MB)",
    audioDropText: "Arraste um áudio aqui ou clique para selecionar",
    audioDropHint: "MP3, WAV, OGG ou M4A (máx. 20 MB)",
    notImage: "O arquivo selecionado não é uma imagem válida.",
    notAudio: "O arquivo selecionado não é um áudio válido.",
    imageTooBig: "A imagem é muito grande. Use um arquivo de no máximo 15 MB.",
    audioTooBig: "O áudio é muito grande. Use um arquivo de no máximo 20 MB.",
    audioError: "Não foi possível ler o arquivo de áudio.",
    start: "Início do corte",
    duration: "Duração",
    seconds: "s",
    preview: "Reproduzir corte",
    generate: "Gerar figurinha com som",
    generating: "Gerando vídeo...",
    download: "Baixar WebM",
    clear: "Limpar tudo",
    notSupported: "Seu navegador não suporta a gravação de vídeo. Tente a versão mais recente do Chrome ou Firefox.",
    resultTitle: "Sua figurinha com som",
    legal: "Use apenas imagens e sons que você tenha permissão de usar.",
    privacy: "A imagem e o áudio são processados no seu navegador. Nada é enviado a nenhum servidor.",
    soundsCta: "Buscar sons grátis",
    memesCta: "Buscar memes grátis",
  },
};

function pickSupportedMimeType(): string | null {
  if (typeof MediaRecorder === "undefined") return null;
  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];
  for (const type of candidates) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return null;
}

export default function SoundStickerGenerator({ lang }: Props) {
  const t = strings[lang];

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [audioDuration, setAudioDuration] = useState(0);
  const [clipStart, setClipStart] = useState(0);
  const [clipDuration, setClipDuration] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const previewTimeoutRef = useRef<number | null>(null);

  // Computed only on the client (after hydration) since MediaRecorder isn't
  // available during SSR — useSyncExternalStore avoids a hydration mismatch
  // by rendering the server snapshot (null) until the client takes over.
  const mimeType = useSyncExternalStore(
    () => () => {},
    pickSupportedMimeType,
    () => null
  );

  const showError = useCallback((msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 4000);
  }, []);

  const handleImageSelect = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        showError(t.notImage);
        return;
      }
      if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
        showError(t.imageTooBig);
        return;
      }
      setImageFile(file);
      setImageUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
      setResultUrl("");
    },
    [showError, t]
  );

  const handleAudioSelect = useCallback(
    (file: File) => {
      if (!file.type.startsWith("audio/") && !/\.(mp3|wav|ogg|m4a)$/i.test(file.name)) {
        showError(t.notAudio);
        return;
      }
      if (file.size > MAX_AUDIO_MB * 1024 * 1024) {
        showError(t.audioTooBig);
        return;
      }
      setAudioFile(file);
      setAudioUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
      setClipStart(0);
      setResultUrl("");
    },
    [showError, t]
  );

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      if (previewTimeoutRef.current) window.clearTimeout(previewTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePreview = useCallback(() => {
    const audio = audioElRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = clipStart;
    audio.play().catch(() => {});
    if (previewTimeoutRef.current) window.clearTimeout(previewTimeoutRef.current);
    previewTimeoutRef.current = window.setTimeout(() => {
      audio.pause();
    }, clipDuration * 1000);
  }, [clipStart, clipDuration]);

  const handleGenerate = useCallback(async () => {
    if (!imageFile || !audioFile) return;
    if (!mimeType) {
      showError(t.notSupported);
      return;
    }

    setGenerating(true);
    setResultUrl("");

    try {
      const img = new Image();
      const imgLoaded = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("image load failed"));
      });
      img.src = URL.createObjectURL(imageFile);
      await imgLoaded;

      const canvas = document.createElement("canvas");
      canvas.width = CANVAS_SIZE;
      canvas.height = CANVAS_SIZE;
      // The canvas must be attached to the document for captureStream() to
      // keep emitting frames reliably across browsers (a detached canvas is
      // not guaranteed to repaint). Keep it off-screen rather than hidden.
      canvas.style.position = "fixed";
      canvas.style.left = "-9999px";
      canvas.style.top = "0";
      document.body.appendChild(canvas);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("no canvas context");

      const scale = Math.max(CANVAS_SIZE / img.width, CANVAS_SIZE / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const drawFrame = () => {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        ctx.drawImage(img, (CANVAS_SIZE - drawW) / 2, (CANVAS_SIZE - drawH) / 2, drawW, drawH);
      };
      drawFrame();

      const AudioContextCtor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextCtor();
      const arrayBuffer = await audioFile.arrayBuffer();
      const decoded = await audioCtx.decodeAudioData(arrayBuffer.slice(0));

      const dest = audioCtx.createMediaStreamDestination();
      const source = audioCtx.createBufferSource();
      source.buffer = decoded;
      source.connect(dest);

      const videoStream = canvas.captureStream(10);
      const combined = new MediaStream([
        ...videoStream.getVideoTracks(),
        ...dest.stream.getAudioTracks(),
      ]);

      const recorder = new MediaRecorder(combined, { mimeType });
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      const stopped = new Promise<void>((resolve) => {
        recorder.onstop = () => resolve();
      });

      // The image never changes, but canvas.captureStream() only emits a
      // new frame when the canvas actually repaints, so redraw it on every
      // animation frame for the duration of the recording.
      let rafId = 0;
      let keepDrawing = true;
      const drawLoop = () => {
        if (!keepDrawing) return;
        drawFrame();
        rafId = requestAnimationFrame(drawLoop);
      };
      drawLoop();

      recorder.start();
      const safeDuration = Math.min(clipDuration, decoded.duration - clipStart, MAX_CLIP_SECONDS);
      source.start(0, clipStart, safeDuration > 0 ? safeDuration : clipDuration);

      await new Promise((resolve) => setTimeout(resolve, Math.max(safeDuration, 0.5) * 1000 + 300));
      recorder.stop();
      await stopped;
      keepDrawing = false;
      cancelAnimationFrame(rafId);
      document.body.removeChild(canvas);
      await audioCtx.close();
      URL.revokeObjectURL(img.src);

      const blob = new Blob(chunks, { type: mimeType.split(";")[0] });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch {
      showError(t.audioError);
    }

    setGenerating(false);
  }, [imageFile, audioFile, mimeType, clipStart, clipDuration, showError, t]);

  const handleClear = useCallback(() => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setImageFile(null);
    setImageUrl("");
    setAudioFile(null);
    setAudioUrl("");
    setAudioDuration(0);
    setClipStart(0);
    setClipDuration(5);
    setResultUrl("");
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (audioInputRef.current) audioInputRef.current.value = "";
  }, [imageUrl, audioUrl, resultUrl]);

  const maxDuration = Math.min(MAX_CLIP_SECONDS, audioDuration || MAX_CLIP_SECONDS);
  const maxStart = Math.max(0, audioDuration - 0.5);

  return (
    <div className="tool-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {!mimeType && (
          <div style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "13px" }}>
            {t.notSupported}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          {/* Image drop */}
          <div
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) handleImageSelect(file);
            }}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => imageInputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label={t.imageDropText}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                imageInputRef.current?.click();
              }
            }}
            style={{
              border: "2px dashed var(--border)",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              minHeight: "180px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              background: "var(--surface)",
              overflow: "hidden",
            }}
          >
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="" style={{ maxWidth: "100%", maxHeight: "140px", borderRadius: "8px", objectFit: "contain" }} />
            ) : (
              <>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>{t.imageDropText}</span>
                <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{t.imageDropHint}</span>
              </>
            )}
            <input ref={imageInputRef} type="file" accept="image/*" style={{ display: "none" }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageSelect(f); }} />
          </div>

          {/* Audio drop */}
          <div
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) handleAudioSelect(file);
            }}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => audioInputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label={t.audioDropText}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                audioInputRef.current?.click();
              }
            }}
            style={{
              border: "2px dashed var(--border)",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              minHeight: "180px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              background: "var(--surface)",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
              {audioFile ? audioFile.name : t.audioDropText}
            </span>
            {!audioFile && <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{t.audioDropHint}</span>}
            <input ref={audioInputRef} type="file" accept="audio/*,.mp3,.wav,.ogg,.m4a" style={{ display: "none" }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleAudioSelect(f); }} />
          </div>
        </div>

        {audioUrl && (
          <audio
            ref={audioElRef}
            src={audioUrl}
            style={{ display: "none" }}
            onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration || 0)}
          />
        )}

        {audioFile && audioDuration > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>
              {t.start}: {clipStart.toFixed(1)}{t.seconds}
              <input type="range" min={0} max={maxStart} step={0.1} value={clipStart}
                onChange={(e) => setClipStart(parseFloat(e.target.value))} />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>
              {t.duration}: {clipDuration.toFixed(1)}{t.seconds}
              <input type="range" min={1} max={maxDuration} step={0.5} value={clipDuration}
                onChange={(e) => setClipDuration(parseFloat(e.target.value))} />
            </label>
          </div>
        )}

        {error && (
          <div role="status" aria-live="polite" style={{ padding: "10px 16px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "14px" }}>
            {error}
          </div>
        )}

        <div className="tool-actions">
          <button type="button" className="tool-button-secondary" onClick={handlePreview} disabled={!audioFile}>
            {t.preview}
          </button>
          <button type="button" className="tool-button" onClick={handleGenerate} disabled={!imageFile || !audioFile || generating || !mimeType}>
            {generating ? t.generating : t.generate}
          </button>
          <button type="button" className="tool-button-secondary" onClick={handleClear}>
            {t.clear}
          </button>
        </div>

        {resultUrl && (
          <div style={{ padding: "20px", background: "var(--surface)", borderRadius: "12px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>{t.resultTitle}</h3>
            <video src={resultUrl} controls style={{ maxWidth: "260px", borderRadius: "8px" }} />
            <a href={resultUrl} download="clipnexo-sticker-sonido.webm" className="tool-button">
              {t.download}
            </a>
          </div>
        )}

        <div style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)", fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
          {t.legal}
        </div>
        <div style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)", fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
          {t.privacy}
        </div>
      </div>
    </div>
  );
}

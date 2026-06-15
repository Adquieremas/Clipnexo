"use client";

import { useState } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const strings = {
  es: {
    title: "Generador de conclusiones",
    topicLabel: "Tema",
    topicPlaceholder: "Ejemplo: Cambio climático...",
    keyPointsLabel: "Puntos clave",
    keyPointsPlaceholder: "Escribe los puntos clave (separados por comas o en viñetas)...",
    toneLabel: "Tono",
    generate: "Generar conclusión",
    result: "Conclusión generada",
    tones: {
      formal: "Formal",
      reflective: "Reflexivo",
      mixed: "Mixto",
    },
    noTopic: "Por favor ingresa un tema para generar una conclusión.",
  },
  en: {
    title: "Conclusion Generator",
    topicLabel: "Topic",
    topicPlaceholder: "Example: Climate change...",
    keyPointsLabel: "Key points",
    keyPointsPlaceholder: "Enter key points (comma separated or bullet points)...",
    toneLabel: "Tone",
    generate: "Generate conclusion",
    result: "Generated conclusion",
    tones: {
      formal: "Formal",
      reflective: "Reflective",
      mixed: "Mixed",
    },
    noTopic: "Please enter a topic to generate a conclusion.",
  },
  pt: {
    title: "Gerador de conclusões",
    topicLabel: "Tópico",
    topicPlaceholder: "Exemplo: Mudanças climáticas...",
    keyPointsLabel: "Pontos-chave",
    keyPointsPlaceholder: "Digite os pontos-chave (separados por vírgulas ou em marcadores)...",
    toneLabel: "Tom",
    generate: "Gerar conclusão",
    result: "Conclusão gerada",
    tones: {
      formal: "Formal",
      reflective: "Reflexivo",
      mixed: "Misto",
    },
    noTopic: "Por favor, insira um tópico para gerar uma conclusão.",
  },
};

type Tone = "formal" | "reflective" | "mixed";

function parseKeyPoints(raw: string): string[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];

  // Try splitting by newlines first (bullet points)
  const byLine = trimmed
    .split("\n")
    .map((l) => l.replace(/^[-*•]\s*/, "").trim())
    .filter(Boolean);

  if (byLine.length > 1) return byLine;

  // Try comma separated
  const byComma = trimmed
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (byComma.length > 1) return byComma;

  return [trimmed];
}

function generateConclusion(
  topic: string,
  keyPoints: string[],
  tone: Tone,
  lang: SupportedLang
): string {
  const isEn = lang === "en";
  const isEs = lang === "es";

  const closingPools: Record<Tone, string[]> = {
    formal: isEn
      ? [
          `In conclusion, ${topic} represents a significant area of inquiry with far-reaching implications.`,
          `The analysis presented here demonstrates that ${topic} warrants continued attention and study.`,
          `To summarize, the key findings underscore the importance of ${topic} in contemporary discourse.`,
          `These insights into ${topic} contribute to a deeper understanding of the subject.`,
          `Ultimately, the evidence suggests that ${topic} will remain a relevant and pressing concern.`,
        ]
      : isEs
      ? [
          `En conclusión, ${topic} representa un área de investigación significativa con implicaciones de gran alcance.`,
          `El análisis presentado aquí demuestra que ${topic} merece atención y estudio continuos.`,
          `En resumen, los hallazgos clave subrayan la importancia de ${topic} en el discurso contemporáneo.`,
          `Estas perspectivas sobre ${topic} contribuyen a una comprensión más profunda del tema.`,
          `En última instancia, la evidencia sugiere que ${topic} seguirá siendo una preocupación relevante y apremiante.`,
        ]
      : [
          `Em conclusão, ${topic} representa uma área significativa de investigação com implicações de longo alcance.`,
          `A análise apresentada aqui demonstra que ${topic} merece atenção e estudo contínuos.`,
          `Para resumir, as principais descobertas sublinham a importância de ${topic} no discurso contemporâneo.`,
          `Estas percepções sobre ${topic} contribuem para uma compreensão mais profunda do assunto.`,
          `Em última análise, as evidências sugerem que ${topic} continuará sendo uma preocupação relevante e urgente.`,
        ],
    reflective: isEn
      ? [
          `Looking back at what we have explored, ${topic} invites us to think more deeply about the world.`,
          `As we reflect on ${topic}, it becomes clear that there is still much to learn and discover.`,
          `The journey through ${topic} has shown us how interconnected ideas truly are.`,
          `Stepping back, ${topic} reminds us of the complexity and beauty of the subject.`,
          `Perhaps the most important takeaway from ${topic} is the need for continued curiosity.`,
        ]
      : isEs
      ? [
          `Al mirar hacia atrás lo que hemos explorado, ${topic} nos invita a pensar más profundamente sobre el mundo.`,
          `Al reflexionar sobre ${topic}, queda claro que aún queda mucho por aprender y descubrir.`,
          `El viaje a través de ${topic} nos ha mostrado cuán interconectadas están realmente las ideas.`,
          `Retrocediendo, ${topic} nos recuerda la complejidad y belleza del tema.`,
          `Quizás la conclusión más importante de ${topic} es la necesidad de una curiosidad continua.`,
        ]
      : [
          `Olhando para trás no que exploramos, ${topic} nos convida a pensar mais profundamente sobre o mundo.`,
          `Ao refletir sobre ${topic}, fica claro que ainda há muito a aprender e descobrir.`,
          `A jornada através de ${topic} nos mostrou como as ideias estão verdadeiramente interconectadas.`,
          `Recuando, ${topic} nos lembra da complexidade e beleza do assunto.`,
          `Talvez a lição mais importante de ${topic} seja a necessidade de curiosidade contínua.`,
        ],
    mixed: isEn
      ? [
          `To bring it all together, ${topic} proves to be both challenging and rewarding to explore.`,
          `The analysis of ${topic} reveals patterns and insights that are hard to ignore.`,
          `What stands out most about ${topic} is how it connects to broader questions.`,
          `In wrapping up, ${topic} leaves us with more questions — and that is a good thing.`,
          `Taken as a whole, ${topic} offers a rich landscape for future exploration.`,
        ]
      : isEs
      ? [
          `Para resumir todo, ${topic} resulta ser tanto desafiante como gratificante de explorar.`,
          `El análisis de ${topic} revela patrones y perspectivas que son difíciles de ignorar.`,
          `Lo que más destaca de ${topic} es cómo se conecta con preguntas más amplias.`,
          `Para concluir, ${topic} nos deja con más preguntas — y eso es algo bueno.`,
          `En conjunto, ${topic} ofrece un rico panorama para la exploración futura.`,
        ]
      : [
          `Para resumir tudo, ${topic} mostra-se desafiador e gratificante de explorar.`,
          `A análise de ${topic} revela padrões e percepções difíceis de ignorar.`,
          `O que mais se destaca em ${topic} é como se conecta a questões mais amplas.`,
          `Concluindo, ${topic} nos deixa com mais perguntas — e isso é algo bom.`,
          `Tomado como um todo, ${topic} oferece uma rica paisagem para exploração futura.`,
        ],
  };

  const closing = closingPools[tone];
  const closingSentence = closing[Math.floor(Math.random() * closing.length)];

  let keyPointsText = "";
  if (keyPoints.length > 0) {
    if (isEn) {
      keyPointsText = `The key points discussed include ${keyPoints.join(", ")}. `;
    } else if (isEs) {
      keyPointsText = `Los puntos clave discutidos incluyen ${keyPoints.join(", ")}. `;
    } else {
      keyPointsText = `Os pontos-chave discutidos incluem ${keyPoints.join(", ")}. `;
    }
  }

  let recapIntro = "";
  if (isEn) {
    recapIntro = `This paper has examined ${topic} from multiple perspectives. `;
  } else if (isEs) {
    recapIntro = `Este trabajo ha examinado ${topic} desde múltiples perspectivas. `;
  } else {
    recapIntro = `Este trabalho examinou ${topic} de múltiplas perspectivas. `;
  }

  const finalClosure = isEn
    ? `In closing, ${topic} remains a vital and evolving subject that deserves ongoing reflection.`
    : isEs
    ? `Para finalizar, ${topic} sigue siendo un tema vital y en evolución que merece una reflexión continua.`
    : `Para finalizar, ${topic} continua sendo um assunto vital e em evolução que merece reflexão contínua.`;

  return (
    recapIntro + keyPointsText + closingSentence + " " + finalClosure
  );
}

export default function ConclusionGenerator({ lang }: Props) {
  const t = strings[lang];
  const [topic, setTopic] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [tone, setTone] = useState<Tone>("formal");
  const [conclusion, setConclusion] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = () => {
    if (!topic.trim()) {
      setError(t.noTopic);
      setConclusion("");
      return;
    }
    setError("");
    const points = parseKeyPoints(keyPoints);
    setConclusion(generateConclusion(topic.trim(), points, tone, lang));
  };

  return (
    <div className="tool-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div className="tool-grid">
          <label className="tool-field" style={{ gridColumn: "span 2" }}>
            <span>{t.topicLabel}</span>
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (error) setError("");
              }}
              placeholder={t.topicPlaceholder}
              style={{
                padding: "10px 14px",
                fontSize: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                outline: "none",
                width: "100%",
              }}
            />
          </label>
          <label className="tool-field" style={{ gridColumn: "span 2" }}>
            <span>{t.keyPointsLabel}</span>
            <textarea
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              placeholder={t.keyPointsPlaceholder}
              style={{
                width: "100%",
                minHeight: "80px",
                padding: "10px 14px",
                fontSize: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                outline: "none",
                fontFamily: "inherit",
                resize: "vertical",
              }}
            />
          </label>
          <label className="tool-field">
            <span>{t.toneLabel}</span>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              style={{
                padding: "10px 14px",
                fontSize: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                outline: "none",
                width: "100%",
              }}
            >
              {(Object.keys(t.tones) as Tone[]).map((k) => (
                <option key={k} value={k}>
                  {t.tones[k]}
                </option>
              ))}
            </select>
          </label>
        </div>

        {error && (
          <div
            style={{
              padding: "12px",
              backgroundColor: "#fef2f2",
              borderRadius: "8px",
              border: "1px solid #fecaca",
              color: "#b91c1c",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <div className="tool-actions">
          <button
            type="button"
            className="tool-button-secondary"
            onClick={handleGenerate}
          >
            {t.generate}
          </button>
        </div>

        {conclusion && (
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "12px",
              border: "1px solid #eee",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "12px",
                color: "#666",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              {t.result}
            </span>
            <p
              style={{
                margin: 0,
                fontSize: "16px",
                lineHeight: 1.8,
                color: "#111",
              }}
            >
              {conclusion}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import CopyButton from "./CopyButton";
import ResultCard from "./ResultCard";

export default function SocialMediaTextGenerator({ lang }: { lang: string }) {
  const [topic, setTopic] = useState("");
  const [network, setNetwork] = useState("General");
  const [tone, setTone] = useState("profesional");
  const [results, setResults] = useState<string[]>([]);

  const t = {
    es: { topic: "Tema o idea", network: "Red Social", tone: "Tono", generate: "Generar Textos", clear: "Limpiar" },
    en: { topic: "Topic or idea", network: "Social Network", tone: "Tone", generate: "Generate Texts", clear: "Clear" },
    pt: { topic: "Tema ou ideia", network: "Rede Social", tone: "Tom", generate: "Gerar Textos", clear: "Limpar" }
  }[lang] || { topic: "Tema", network: "Red Social", tone: "Tono", generate: "Generar", clear: "Limpiar" };

  const handleGenerate = () => {
    if (!topic) return;
    const items = [
      "¡Descubre todo sobre " + topic + " en " + network + " con un estilo " + tone + "!",
      "Si te interesa " + topic + ", esto te va a encantar.",
      topic + " es tendencia. ¡Únete a la conversación!",
      "Hablemos de " + topic + " hoy mismo.",
      "¿Sabías esto sobre " + topic + "?",
      "Un tip rápido sobre " + topic + "."
    ];
    setResults(items);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">{t.topic}</label>
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)} className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t.topic} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">{t.network}</label>
            <select value={network} onChange={e => setNetwork(e.target.value)} className="p-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Twitter">Twitter/X</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="TikTok">TikTok</option>
              <option value="General">General</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">{t.tone}</label>
            <select value={tone} onChange={e => setTone(e.target.value)} className="p-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="profesional">Profesional / Professional / Profissional</option>
              <option value="divertido">Divertido / Fun / Divertido</option>
              <option value="vendedor">Vendedor / Sales / Vendedor</option>
              <option value="emocional">Emocional / Emotional / Emocional</option>
              <option value="educativo">Educativo / Educational / Educativo</option>
              <option value="directo">Directo / Direct / Direto</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4 mt-2">
          <button onClick={handleGenerate} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity">
            {t.generate}
          </button>
          <button onClick={() => { setTopic(""); setResults([]); }} className="bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors">
            {t.clear}
          </button>
        </div>
      </div>
      
      {results.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">Resultados</h3>
            <CopyButton text={results.join('\n\n')} label="Copiar Todos" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((r, i) => (
              <ResultCard key={i} text={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
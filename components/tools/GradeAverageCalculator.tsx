"use client";

import { useState, useCallback, useMemo } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

type GradeEntry = {
  id: number;
  name: string;
  grade: string;
  weight: string;
};

type ScaleType = "0-20" | "0-100" | "custom";

const strings = {
  es: {
    evaluationName: "Nombre de evaluación",
    grade: "Nota",
    weight: "Peso (%)",
    addGrade: "Agregar nota",
    simpleAverage: "Promedio simple",
    weightedAverage: "Promedio ponderado",
    scale: "Escala",
    clear: "Limpiar",
    delete: "Eliminar",
    totalWeight: "Peso total",
    outOf: "de",
    custom: "Personalizada",
    customMax: "Máx. personalizado",
    privacy: "Los cálculos se realizan en tu navegador. No se guardan datos.",
    noGrades: "Agrega al menos una nota para calcular.",
  },
  en: {
    evaluationName: "Evaluation name",
    grade: "Grade",
    weight: "Weight (%)",
    addGrade: "Add grade",
    simpleAverage: "Simple average",
    weightedAverage: "Weighted average",
    scale: "Scale",
    clear: "Clear",
    delete: "Delete",
    totalWeight: "Total weight",
    outOf: "out of",
    custom: "Custom",
    customMax: "Custom max",
    privacy: "Calculations are done in your browser. No data is stored.",
    noGrades: "Add at least one grade to calculate.",
  },
  pt: {
    evaluationName: "Nome da avaliação",
    grade: "Nota",
    weight: "Peso (%)",
    addGrade: "Adicionar nota",
    simpleAverage: "Média simples",
    weightedAverage: "Média ponderada",
    scale: "Escala",
    clear: "Limpar",
    delete: "Excluir",
    totalWeight: "Peso total",
    outOf: "de",
    custom: "Personalizada",
    customMax: "Máx. personalizado",
    privacy: "Os cálculos são feitos no seu navegador. Nenhum dado é armazenado.",
    noGrades: "Adicione pelo menos uma nota para calcular.",
  },
};

let nextId = 1;

function createEntry(): GradeEntry {
  return { id: nextId++, name: "", grade: "", weight: "" };
}

export default function GradeAverageCalculator({ lang }: Props) {
  const t = strings[lang];

  const [entries, setEntries] = useState<GradeEntry[]>([createEntry()]);
  const [scaleType, setScaleType] = useState<ScaleType>("0-20");
  const [customMax, setCustomMax] = useState("100");

  const scaleMax = scaleType === "0-20" ? 20 : scaleType === "0-100" ? 100 : parseInt(customMax, 10) || 100;

  const addEntry = useCallback(() => {
    setEntries((prev) => [...prev, createEntry()]);
  }, []);

  const removeEntry = useCallback((id: number) => {
    setEntries((prev) => (prev.length <= 1 ? prev : prev.filter((e) => e.id !== id)));
  }, []);

  const updateEntry = useCallback(
    (id: number, field: keyof Omit<GradeEntry, "id">, value: string) => {
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
      );
    },
    []
  );

  const clearAll = useCallback(() => {
    setEntries([createEntry()]);
  }, []);

  const { simpleAvg, weightedAvg, totalWeight } = useMemo(() => {
    const valid = entries.filter((e) => {
      const g = parseFloat(e.grade);
      return !isNaN(g) && e.grade.trim() !== "";
    });

    if (valid.length === 0) return { simpleAvg: null, weightedAvg: null, totalWeight: 0 };

    const simpleSum = valid.reduce((sum, e) => sum + parseFloat(e.grade), 0);
    const simpleAvgVal = simpleSum / valid.length;

    let weightedSum = 0;
    let totalW = 0;
    let hasWeighted = false;
    for (const e of valid) {
      const w = parseFloat(e.weight);
      if (!isNaN(w) && e.weight.trim() !== "" && w > 0) {
        weightedSum += parseFloat(e.grade) * w;
        totalW += w;
        hasWeighted = true;
      }
    }

    if (!hasWeighted || totalW === 0) {
      return { simpleAvg: simpleAvgVal, weightedAvg: null, totalWeight: 0 };
    }

    return {
      simpleAvg: simpleAvgVal,
      weightedAvg: weightedSum / totalW,
      totalWeight: totalW,
    };
  }, [entries]);

  const hasGrades = useMemo(
    () => entries.some((e) => e.grade.trim() !== "" && !isNaN(parseFloat(e.grade))),
    [entries]
  );

  return (
    <div className="tool-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Scale selector */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 160px", minWidth: "160px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {t.scale}
            </label>
            <select
              value={scaleType}
              onChange={(e) => setScaleType(e.target.value as ScaleType)}
              aria-label={t.scale}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                backgroundColor: "white",
                cursor: "pointer",
                minHeight: "44px",
                width: "100%",
              }}
            >
              <option value="0-20">0-20</option>
              <option value="0-100">0-100</option>
              <option value="custom">{t.custom}</option>
            </select>
          </div>
          {scaleType === "custom" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 140px", minWidth: "140px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {t.customMax}
              </label>
              <input
                type="number"
                min="1"
                value={customMax}
                onChange={(e) => setCustomMax(e.target.value)}
                aria-label={t.customMax}
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "14px",
                  minHeight: "44px",
                  boxSizing: "border-box",
                  width: "100%",
                }}
              />
            </div>
          )}
        </div>

        {/* Grade entries table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                <th style={{ textAlign: "left", padding: "8px 12px", color: "#374151", fontWeight: 600, minWidth: "140px" }}>
                  {t.evaluationName}
                </th>
                <th style={{ textAlign: "left", padding: "8px 12px", color: "#374151", fontWeight: 600, minWidth: "80px" }}>
                  {t.grade} (0-{scaleMax})
                </th>
                <th style={{ textAlign: "left", padding: "8px 12px", color: "#374151", fontWeight: 600, minWidth: "100px" }}>
                  {t.weight}
                </th>
                <th style={{ textAlign: "center", padding: "8px 12px", color: "#374151", fontWeight: 600, width: "60px" }}></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "8px 12px" }}>
                    <input
                      type="text"
                      value={entry.name}
                      onChange={(e) => updateEntry(entry.id, "name", e.target.value)}
                      aria-label={`${t.evaluationName} ${entry.id}`}
                      placeholder={t.evaluationName}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        fontSize: "14px",
                        minHeight: "44px",
                        boxSizing: "border-box",
                      }}
                    />
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <input
                      type="number"
                      value={entry.grade}
                      onChange={(e) => updateEntry(entry.id, "grade", e.target.value)}
                      aria-label={`${t.grade} ${entry.id}`}
                      placeholder="0"
                      min="0"
                      max={scaleMax}
                      step="0.01"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        fontSize: "14px",
                        minHeight: "44px",
                        boxSizing: "border-box",
                      }}
                    />
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <input
                      type="number"
                      value={entry.weight}
                      onChange={(e) => updateEntry(entry.id, "weight", e.target.value)}
                      aria-label={`${t.weight} ${entry.id}`}
                      placeholder="%"
                      min="0"
                      max="100"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        fontSize: "14px",
                        minHeight: "44px",
                        boxSizing: "border-box",
                      }}
                    />
                  </td>
                  <td style={{ padding: "8px 12px", textAlign: "center" }}>
                    <button
                      type="button"
                      onClick={() => removeEntry(entry.id)}
                      aria-label={`${t.delete} ${entry.id}`}
                      disabled={entries.length <= 1}
                      style={{
                        minHeight: "44px",
                        minWidth: "44px",
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #fca5a5",
                        backgroundColor: "#fef2f2",
                        color: "#dc2626",
                        cursor: entries.length <= 1 ? "not-allowed" : "pointer",
                        fontSize: "14px",
                        fontWeight: 600,
                        opacity: entries.length <= 1 ? 0.5 : 1,
                      }}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add / Clear buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <button
            type="button"
            className="tool-button-secondary"
            onClick={addEntry}
            style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "200px" }}
          >
            + {t.addGrade}
          </button>
          <button
            type="button"
            className="tool-button-secondary"
            onClick={clearAll}
            style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "200px" }}
          >
            {t.clear}
          </button>
        </div>

        {/* Results */}
        {hasGrades && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "12px",
          }}>
            <div style={{
              padding: "20px",
              backgroundColor: "#eef2ff",
              borderRadius: "12px",
              border: "1px solid #c7d2fe",
              textAlign: "center",
            }}>
              <span style={{ display: "block", fontSize: "11px", color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                {t.simpleAverage}
              </span>
              <strong style={{ fontSize: "28px", color: "#312e81" }}>
                {simpleAvg !== null ? simpleAvg.toFixed(2) : "—"}
              </strong>
              <span style={{ display: "block", fontSize: "13px", color: "#6366f1", marginTop: "2px" }}>
                {t.outOf} {scaleMax}
              </span>
            </div>

            <div style={{
              padding: "20px",
              backgroundColor: "#fdf2f8",
              borderRadius: "12px",
              border: "1px solid #fbcfe8",
              textAlign: "center",
            }}>
              <span style={{ display: "block", fontSize: "11px", color: "#db2777", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                {t.weightedAverage}
              </span>
              <strong style={{ fontSize: "28px", color: "#831843" }}>
                {weightedAvg !== null ? weightedAvg.toFixed(2) : "—"}
              </strong>
              <span style={{ display: "block", fontSize: "13px", color: "#db2777", marginTop: "2px" }}>
                {t.outOf} {scaleMax}
              </span>
            </div>

            <div style={{
              padding: "20px",
              backgroundColor: "#f0fdf4",
              borderRadius: "12px",
              border: "1px solid #bbf7d0",
              textAlign: "center",
            }}>
              <span style={{ display: "block", fontSize: "11px", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                {t.totalWeight}
              </span>
              <strong style={{ fontSize: "28px", color: "#14532d" }}>
                {totalWeight.toFixed(0)}%
              </strong>
            </div>
          </div>
        )}

        {!hasGrades && (
          <div style={{
            padding: "16px",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            border: "1px solid #eee",
            textAlign: "center",
            color: "#6b7280",
            fontSize: "14px",
          }}>
            {t.noGrades}
          </div>
        )}

        {/* Privacy notice */}
        <div style={{
          padding: "12px 16px",
          borderRadius: "8px",
          backgroundColor: "#fffbeb",
          border: "1px solid #fde68a",
          fontSize: "13px",
          color: "#92400e",
          lineHeight: "1.5",
        }}>
          {t.privacy}
        </div>
      </div>
    </div>
  );
}

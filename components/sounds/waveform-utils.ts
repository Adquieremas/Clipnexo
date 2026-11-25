export function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Deterministic decorative waveform bars derived from an id, used as a
// lightweight placeholder (grid cards) or fallback when real decoding fails.
export function deterministicBars(id: string, count = 24): number[] {
  let seed = 0;
  for (let i = 0; i < id.length; i++) seed = (seed * 31 + id.charCodeAt(i)) >>> 0;
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    bars.push(20 + (seed % 100) * 0.8);
  }
  return bars;
}

// Decodes an audio file client-side into normalized peak values (0-100) for
// a real waveform. Only called for the single sound on its own detail page,
// never for list/grid cards, to avoid pre-loading audio in bulk.
export async function decodeWaveformPeaks(url: string, barCount = 64): Promise<number[]> {
  const AudioContextCtor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const audioContext = new AudioContextCtor();
  try {
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const channel = audioBuffer.getChannelData(0);
    const blockSize = Math.max(1, Math.floor(channel.length / barCount));
    const peaks: number[] = [];
    for (let i = 0; i < barCount; i++) {
      const start = i * blockSize;
      let max = 0;
      for (let j = 0; j < blockSize && start + j < channel.length; j++) {
        const abs = Math.abs(channel[start + j]);
        if (abs > max) max = abs;
      }
      peaks.push(Math.max(8, Math.min(100, max * 100 * 1.4)));
    }
    return peaks;
  } finally {
    audioContext.close().catch(() => {});
  }
}

import { useEffect, useState } from "react";

export type TopicResult = { best: number; last: number; total: number; attempts: number };
const KEY = "az900-progress";

export function readProgress(): Record<string, TopicResult> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveResult(id: string, score: number, total: number) {
  const all = readProgress();
  const prev = all[id];
  all[id] = {
    best: Math.max(prev?.best ?? 0, score),
    last: score,
    total,
    attempts: (prev?.attempts ?? 0) + 1,
  };
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function useProgress() {
  const [p, setP] = useState<Record<string, TopicResult>>({});
  useEffect(() => setP(readProgress()), []);
  return p;
}

export function useOnboarded() {
  const [seen, setSeen] = useState(true);
  useEffect(() => setSeen(localStorage.getItem("az900-onboarded") === "1"), []);
  const done = () => {
    localStorage.setItem("az900-onboarded", "1");
    setSeen(true);
  };
  return [seen, done] as const;
}

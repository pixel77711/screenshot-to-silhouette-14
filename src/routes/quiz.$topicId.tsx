import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getTopic } from "@/data/quiz";
import { saveResult } from "@/lib/progress";

export const Route = createFileRoute("/quiz/$topicId")({
  loader: ({ params }) => {
    const topic = getTopic(params.topicId);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.topic;
    const title = t ? `${t.title} – AZ-900 Quiz` : "AZ-900 Quiz";
    const desc = t ? `Practice AZ-900: ${t.summary}` : "AZ-900 practice quiz.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: Quiz,
});

function Quiz() {
  const { topic } = Route.useLoaderData();
  const qs = topic.questions;
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const done = answers.length === qs.length && picked === null;
  const score = answers.filter(Boolean).length;

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    const next = [...answers, idx === qs[i]!.answer];
    setAnswers(next);
    if (next.length === qs.length) saveResult(topic.id, next.filter(Boolean).length, qs.length);
  };
  const next = () => {
    setPicked(null);
    if (i < qs.length - 1) setI(i + 1);
  };
  const restart = () => { setI(0); setPicked(null); setAnswers([]); };

  return (
    <main className="min-h-screen">
      <div className="bg-hero text-ink-foreground">
        <div className="mx-auto max-w-2xl px-6 py-6">
          <Link to="/" className="text-sm text-ink-foreground/70 hover:text-ink-foreground">← All topics</Link>
          <p className="mt-3 text-xs uppercase tracking-widest text-accent">{topic.domain}</p>
          <h1 className="text-2xl font-bold">{topic.title}</h1>
          <div className="mt-4 flex gap-1.5">
            {qs.map((_, k) => (
              <div key={k} className={`h-1.5 flex-1 rounded-full ${
                answers[k] === undefined ? "bg-ink-foreground/20" : answers[k] ? "bg-success" : "bg-destructive"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-8">
        {done ? (
          <div className="rounded-2xl border bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">Your score</p>
            <p className="font-display text-6xl font-bold mt-2">{Math.round((score / qs.length) * 100)}%</p>
            <p className="mt-2 text-muted-foreground">{score} of {qs.length} correct</p>
            <p className="mt-4">
              {score / qs.length >= 0.7
                ? "Solid. You're on track for this topic."
                : "Review the explanations below, then try again."}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button onClick={restart} className="rounded-lg border px-5 py-2.5 text-sm font-medium hover:border-primary">Retake</button>
              <Link to="/" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Next topic</Link>
            </div>
            <ul className="mt-8 space-y-2 text-left">
              {qs.map((q, k) => (
                <li key={k} className={`rounded-lg p-3 text-sm ${answers[k] ? "bg-success-soft" : "bg-destructive-soft"}`}>
                  <span className="font-semibold">{answers[k] ? "✓" : "✗"} </span>{q.q}
                  {!answers[k] && <p className="mt-1 text-muted-foreground">Answer: {q.options[q.answer]}</p>}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <QuestionCard key={i} n={i + 1} total={qs.length} q={qs[i]!} picked={picked} onPick={choose} onNext={next} last={i === qs.length - 1} />
        )}
      </div>
    </main>
  );
}

function QuestionCard({ q, n, total, picked, onPick, onNext, last }: {
  q: ReturnType<typeof getTopic> extends infer T ? T extends { questions: (infer Q)[] } ? Q : never : never;
  n: number; total: number; picked: number | null; onPick: (i: number) => void; onNext: () => void; last: boolean;
}) {
  const answered = picked !== null;
  const right = picked === q.answer;
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <p className="text-sm text-muted-foreground">Question {n} of {total}</p>
      <h2 className="mt-2 text-xl font-semibold leading-snug">{q.q}</h2>
      <div className="mt-6 space-y-3">
        {q.options.map((o, idx) => {
          const isAns = idx === q.answer;
          const state = !answered ? "border-border bg-card hover:border-primary"
            : isAns ? "border-success bg-success-soft"
            : idx === picked ? "border-destructive bg-destructive-soft"
            : "border-border bg-card opacity-60";
          return (
            <button key={idx} disabled={answered} onClick={() => onPick(idx)}
              className={`w-full flex items-center gap-3 rounded-xl border-2 p-4 text-left transition ${state}`}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted font-display text-sm font-semibold">
                {answered && isAns ? "✓" : answered && idx === picked ? "✗" : String.fromCharCode(65 + idx)}
              </span>
              <span>{o}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-6 rounded-2xl border bg-card p-5 animate-in fade-in duration-300">
          <p className={`font-display font-semibold text-lg ${right ? "text-success" : "text-destructive"}`}>
            {right ? "Correct!" : `Not quite. The answer is ${String.fromCharCode(65 + q.answer)}: ${q.options[q.answer]}.`}
          </p>
          <div className="mt-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">From the docs</span>
            <p className="mt-1">{q.explanation}</p>
          </div>
          {q.tip && (
            <div className="mt-3 rounded-lg bg-muted p-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Study tip</span>
              <p className="mt-1 text-sm">{q.tip}</p>
            </div>
          )}
          <div className="mt-4 flex items-center justify-between">
            <a href={q.source} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">Read on Microsoft Learn ↗</a>
            <button onClick={onNext} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              {last ? "See results" : "Next question"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

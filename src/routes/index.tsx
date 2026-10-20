import { createFileRoute, Link } from "@tanstack/react-router";
import { topics, domains } from "@/data/quiz";
import { useProgress, useOnboarded } from "@/lib/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AZ-900 Practice Quizzes with Instant Feedback" },
      { name: "description", content: "Practice Azure Fundamentals (AZ-900) by topic with instant feedback, clear explanations, and progress tracking." },
      { property: "og:title", content: "AZ-900 Practice Quizzes" },
      { property: "og:description", content: "Topic-by-topic AZ-900 quizzes with instant, documented explanations." },
    ],
  }),
  component: Index,
});

const steps = [
  ["Pick a topic", "Sections follow the official AZ-900 learning path. Each takes 10–15 minutes."],
  ["Answer & learn", "You see right away if you're correct, with a plain explanation and a link to Microsoft Learn."],
  ["Track progress", "Your best scores are saved, and weak topics are highlighted for review."],
];

function Index() {
  const progress = useProgress();
  const [onboarded, finish] = useOnboarded();
  const totalQ = topics.reduce((s, t) => s + t.questions.length, 0);
  const correct = topics.reduce((s, t) => s + (progress[t.id]?.best ?? 0), 0);
  const pct = Math.round((correct / totalQ) * 100);
  const weak = topics.filter((t) => progress[t.id] && progress[t.id].best / progress[t.id].total < 0.7);

  return (
    <main className="min-h-screen">
      <header className="bg-hero text-ink-foreground">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <p className="text-sm font-medium tracking-widest text-accent uppercase">Azure Fundamentals</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold max-w-2xl">Learn AZ-900 one topic at a time.</h1>
          <p className="mt-4 max-w-xl text-ink-foreground/75">
            Short quizzes, instant feedback, and explanations based on Microsoft Learn.
          </p>
          <div className="mt-8 flex items-center gap-4 max-w-md">
            <div className="h-2 flex-1 rounded-full bg-ink-foreground/15 overflow-hidden">
              <div className="h-full bg-accent transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-sm">{correct}/{totalQ} mastered</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10 space-y-12">
        {!onboarded && (
          <section className="rounded-2xl border bg-card p-6 md:p-8">
            <h2 className="text-xl font-semibold">How it works</h2>
            <ol className="mt-5 grid gap-5 md:grid-cols-3">
              {steps.map(([t, d], i) => (
                <li key={t} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-semibold">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{t}</p>
                    <p className="text-sm text-muted-foreground mt-1">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm text-muted-foreground">
              Explanations are labeled: <b className="text-foreground">From the docs</b> for documented facts and <b className="text-foreground">Study tip</b> for our own advice.
            </p>
            <button onClick={finish} className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Got it
            </button>
          </section>
        )}

        {weak.length > 0 && (
          <section className="rounded-2xl border border-destructive/30 bg-destructive-soft p-5">
            <p className="font-semibold">Worth reviewing</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {weak.map((t) => (
                <Link key={t.id} to="/quiz/$topicId" params={{ topicId: t.id }} className="rounded-full bg-card px-3 py-1 text-sm border hover:border-primary">
                  {t.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        {domains.map((d, di) => (
          <section key={d}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Domain {di + 1} · {d}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {topics.filter((t) => t.domain === d).map((t) => {
                const r = progress[t.id];
                const tp = r ? Math.round((r.best / r.total) * 100) : 0;
                return (
                  <Link key={t.id} to="/quiz/$topicId" params={{ topicId: t.id }}
                    className="group flex flex-col rounded-2xl border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-lg">
                    <h3 className="font-semibold text-lg group-hover:text-primary">{t.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground flex-1">{t.summary}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{t.questions.length} questions · ~{t.minutes} min</span>
                      <span className={r ? (tp >= 70 ? "text-success font-semibold" : "text-destructive font-semibold") : ""}>
                        {r ? `Best ${tp}%` : "Not started"}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full ${tp >= 70 ? "bg-success" : "bg-primary"}`} style={{ width: `${tp}%` }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

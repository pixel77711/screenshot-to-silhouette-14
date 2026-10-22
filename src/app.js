import "./styles.css";
import { topics, domains, getTopic } from "./data/quiz.js";

/* ---------- progress (localStorage) ---------- */

const PROGRESS_KEY = "az900-progress";
const ONBOARD_KEY = "az900-onboarded";

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveResult(id, score, total) {
  const all = readProgress();
  const prev = all[id];
  all[id] = {
    best: Math.max(prev?.best ?? 0, score),
    last: score,
    total,
    attempts: (prev?.attempts ?? 0) + 1,
  };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
}

/* ---------- helpers ---------- */

const app = document.getElementById("app");

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pct(part, total) {
  return total ? Math.round((part / total) * 100) : 0;
}

/* ---------- home ---------- */

function renderHome() {
  document.title = "AZ-900 Practice Quizzes with Instant Feedback";
  const progress = readProgress();
  const totalQ = topics.reduce((s, t) => s + t.questions.length, 0);
  const correct = topics.reduce((s, t) => s + (progress[t.id]?.best ?? 0), 0);
  const mastered = pct(correct, totalQ);
  const weak = topics.filter((t) => {
    const r = progress[t.id];
    return r && r.best / r.total < 0.7;
  });
  const onboarded = localStorage.getItem(ONBOARD_KEY) === "1";

  const steps = [
    ["Pick a topic", "Sections follow the official AZ-900 learning path. Each takes 10–15 minutes."],
    ["Answer & learn", "You see right away if you're correct, with a plain explanation and a link to Microsoft Learn."],
    ["Track progress", "Your best scores are saved, and weak topics are highlighted for review."],
  ];

  app.innerHTML = `
    <main class="page">
      <header class="hero">
        <div class="container">
          <p class="eyebrow">Azure Fundamentals</p>
          <h1>Learn AZ-900 one topic at a time.</h1>
          <p class="hero-sub">Short quizzes, instant feedback, and explanations based on Microsoft Learn.</p>
          <div class="hero-progress">
            <div class="bar"><div class="bar-fill accent" style="width:${mastered}%"></div></div>
            <span>${correct}/${totalQ} mastered</span>
          </div>
        </div>
      </header>

      <div class="container stack">
        ${onboarded ? "" : `
        <section class="card pad" id="onboarding">
          <h2>How it works</h2>
          <ol class="steps">
            ${steps.map(([t, d], i) => `
              <li>
                <span class="step-num">${i + 1}</span>
                <div>
                  <p class="strong">${esc(t)}</p>
                  <p class="muted small">${esc(d)}</p>
                </div>
              </li>`).join("")}
          </ol>
          <p class="muted small">Explanations are labeled: <b>From the docs</b> for documented facts and <b>Study tip</b> for our own advice.</p>
          <button class="btn primary" id="onboard-done">Got it</button>
        </section>`}

        ${weak.length ? `
        <section class="card soft-danger">
          <p class="strong">Worth reviewing</p>
          <div class="pills">
            ${weak.map((t) => `<a class="pill" href="#/quiz/${t.id}">${esc(t.title)}</a>`).join("")}
          </div>
        </section>` : ""}

        ${domains.map((d, di) => `
        <section>
          <h2 class="domain-label">Domain ${di + 1} · ${esc(d)}</h2>
          <div class="grid">
            ${topics.filter((t) => t.domain === d).map((t) => {
              const r = progress[t.id];
              const tp = r ? Math.round((r.best / r.total) * 100) : 0;
              return `
              <a class="card topic" href="#/quiz/${t.id}">
                <h3>${esc(t.title)}</h3>
                <p class="muted small grow">${esc(t.summary)}</p>
                <div class="topic-meta">
                  <span>${t.questions.length} questions · ~${t.minutes} min</span>
                  <span class="${r ? (tp >= 70 ? "success strong" : "danger strong") : ""}">${r ? `Best ${tp}%` : "Not started"}</span>
                </div>
                <div class="bar thin"><div class="bar-fill ${tp >= 70 ? "success" : "primary"}" style="width:${tp}%"></div></div>
              </a>`;
            }).join("")}
          </div>
        </section>`).join("")}
      </div>
    </main>
  `;

  const done = document.getElementById("onboard-done");
  if (done) {
    done.addEventListener("click", () => {
      localStorage.setItem(ONBOARD_KEY, "1");
      renderHome();
    });
  }
}

/* ---------- quiz ---------- */

let quiz = null; // { topic, i, picked, answers }

function startQuiz(topic) {
  quiz = { topic, i: 0, picked: null, answers: [] };
  renderQuiz();
}

function renderQuiz() {
  const { topic, i, picked, answers } = quiz;
  const qs = topic.questions;
  const done = answers.length === qs.length && picked === null;
  const score = answers.filter(Boolean).length;
  document.title = `${topic.title} – AZ-900 Quiz`;

  app.innerHTML = `
    <main class="page">
      <header class="hero slim">
        <div class="container">
          <a class="back-link" href="#/">← All topics</a>
          <p class="eyebrow">${esc(topic.domain)}</p>
          <h1>${esc(topic.title)}</h1>
          <div class="segments">
            ${qs.map((_, k) => `<div class="segment ${answers[k] === undefined ? "" : answers[k] ? "ok" : "bad"}"></div>`).join("")}
          </div>
        </div>
      </header>

      <div class="container quiz-body">
        ${done ? resultsHTML(topic, score) : questionHTML(qs[i], i, qs.length, picked)}
      </div>
    </main>
  `;

  if (done) {
    document.getElementById("retake").addEventListener("click", () => startQuiz(topic));
    return;
  }

  app.querySelectorAll(".option").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (quiz.picked !== null) return;
      quiz.picked = Number(btn.dataset.idx);
      const next = [...quiz.answers, quiz.picked === qs[quiz.i].answer];
      quiz.answers = next;
      if (next.length === qs.length) saveResult(topic.id, next.filter(Boolean).length, qs.length);
      renderQuiz();
    });
  });

  const nextBtn = document.getElementById("next");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      quiz.picked = null;
      if (quiz.i < qs.length - 1) quiz.i += 1;
      renderQuiz();
    });
  }
}

function questionHTML(q, n, total, picked) {
  const answered = picked !== null;
  const right = picked === q.answer;
  const states = q.options.map((_, idx) =>
    !answered ? "idle"
    : idx === q.answer ? "correct"
    : idx === picked ? "wrong"
    : "dim");
  return `
    <div class="qcard rise">
      <p class="muted small">Question ${n + 1} of ${total}</p>
      <h2>${esc(q.q)}</h2>
      <div class="options">
        ${q.options.map((o, idx) => `
          <button class="option ${states[idx]}" data-idx="${idx}" ${answered ? "disabled" : ""}>
            <span class="opt-letter">${answered && idx === q.answer ? "✓" : answered && idx === picked ? "✗" : String.fromCharCode(65 + idx)}</span>
            <span>${esc(o)}</span>
          </button>`).join("")}
      </div>
      ${answered ? `
      <div class="card feedback rise">
        <p class="verdict ${right ? "success" : "danger"}">${right ? "Correct!" : `Not quite. The answer is ${String.fromCharCode(65 + q.answer)}: ${esc(q.options[q.answer])}.`}</p>
        <div>
          <span class="docs-label">From the docs</span>
          <p>${esc(q.explanation)}</p>
        </div>
        ${q.tip ? `
        <div class="tip">
          <span class="tip-label">Study tip</span>
          <p class="small">${esc(q.tip)}</p>
        </div>` : ""}
        <div class="feedback-actions">
          <a href="${esc(q.source)}" target="_blank" rel="noreferrer">Read on Microsoft Learn ↗</a>
          <button class="btn primary" id="next">${n === total - 1 ? "See results" : "Next question"}</button>
        </div>
      </div>` : ""}
    </div>
  `;
}

function resultsHTML(topic, score) {
  const qs = topic.questions;
  const p = pct(score, qs.length);
  return `
    <div class="card pad results rise">
      <p class="muted small">Your score</p>
      <p class="score">${p}%</p>
      <p class="muted">${score} of ${qs.length} correct</p>
      <p>${score / qs.length >= 0.7 ? "Solid. You're on track for this topic." : "Review the explanations below, then try again."}</p>
      <div class="results-actions">
        <button class="btn ghost" id="retake">Retake</button>
        <a class="btn primary" href="#/">All topics</a>
      </div>
      <ul class="review">
        ${qs.map((q, k) => `
          <li class="${quiz.answers[k] ? "good" : "poor"}">
            <span class="strong">${quiz.answers[k] ? "✓" : "✗"} </span>${esc(q.q)}
            ${!quiz.answers[k] ? `<p class="muted small">Answer: ${esc(q.options[q.answer])}</p>` : ""}
          </li>`).join("")}
      </ul>
    </div>
  `;
}

/* ---------- router ---------- */

function route() {
  const m = location.hash.match(/^#\/quiz\/([\w-]+)\/?$/);
  if (m) {
    const topic = getTopic(m[1]);
    if (!topic) return renderNotFound();
    if (!quiz || quiz.topic.id !== topic.id) startQuiz(topic);
    else renderQuiz();
  } else {
    quiz = null;
    renderHome();
  }
}

function renderNotFound() {
  document.title = "Page not found – AZ-900 Quiz";
  app.innerHTML = `
    <main class="page center">
      <div class="card pad">
        <h1>404</h1>
        <p class="muted">That topic doesn't exist.</p>
        <a class="btn primary" href="#/">Go home</a>
      </div>
    </main>
  `;
}

window.addEventListener("hashchange", route);
route();

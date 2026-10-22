import { topics, domains, getTopic } from "../data/quiz.js";

describe("quiz data", () => {
  test("has 12 module-aligned sections across 3 domains", () => {
    expect(topics).toHaveLength(12);
    expect(domains).toHaveLength(3);
  });

  test("every section has at least 4 valid questions with a Microsoft Learn source", () => {
    for (const t of topics) {
      expect(t.questions.length).toBeGreaterThanOrEqual(4);
      for (const q of t.questions) {
        expect(q.options.length).toBeGreaterThanOrEqual(2);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
        expect(q.source).toMatch(/^https:\/\/learn\.microsoft\.com\//);
      }
    }
  });

  test("total question count is 53 and lookup works", () => {
    const total = topics.reduce((s, t) => s + t.questions.length, 0);
    expect(total).toBe(53);
    expect(getTopic("cloud-computing").title).toContain("cloud computing");
    expect(getTopic("nope")).toBeUndefined();
  });
});

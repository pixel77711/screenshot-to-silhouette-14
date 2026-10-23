<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Architecture

- The app is plain HTML/CSS/JavaScript on vanilla Vite: root `index.html`, `src/app.js`, `src/styles.css`, `src/data/quiz.js`. Why: the user asked to replace the React/TanStack stack; do not reintroduce React, TanStack, Tailwind, or JSX.
- Routing is hash-based (`#/`, `#/quiz/<id>`) inside `src/app.js`; quiz progress lives in localStorage under `az900-progress` / `az900-onboarded`.

# Colipot Agent · Repo Onboarding

Mục tiêu: full-stack (Next.js + Tailwind + GSAP), Sanity CMS, Auth Clerk, OpenAI Agent ChatKit.

## Quick rules

- Code: TypeScript, ESM, lint strict.
- UI: Tailwind v4 classes, GSAP isolated modules.
- Data: Sanity client-side fetch qua server routes, không public token.
- Auth: Clerk on app root layout, server actions protected.
- AI: API routes `/api/chat/*`, không để key ở client.
- Agentkit: OpenAI agent chat kit integration.

## Scripts kỳ vọng

- dev, build, lint, typecheck, test agent chat kit, studio (Sanity).

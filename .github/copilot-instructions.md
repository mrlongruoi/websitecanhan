# Copilot Repo Instructions

- Prefer TypeScript, Next.js App Router.
- Tailwind v4 utilities. No custom CSS trừ khi cần.
- GSAP per-component, cleanup on unmount.
- Sanity queries server-only. Use GROQ helpers.
- Clerk for auth gates.
- OpenAI ChatKit: stream responses, backoff on 429.

# Copilot Repo Prompts Backend
Rules:
- Route handlers in `app/api/**/route.ts`.
- Zod validate input/output.
- Sanity queries qua server-only helper.
- Clerk: protect bằng `auth()` hoặc middleware.
- OpenAI ChatKit: stream nếu có, timeouts, retries.

Deliverables:
- Handler + schema + example curl.

# Copilot Repo Prompts Frontend
Rules:
- Layout: grid/flex, container mx-auto, spacing từ Tailwind scale.
- GSAP: useEffect client-only, context() để cleanup, no global timelines.
- Accessibility: semantic tags, focus states, prefers-reduced-motion.
- Images: next/image, width/height set, priority minimal.

Deliverables:
- Component + usage snippet.
- Tailwind classes rõ ràng, không lồng CSS trừ khi cần.

# Copilot Repo Prompts Base
Role:
- You are the repo’s automation agent. Optimize for production-ready Next.js 15 + React 19 + Tailwind v4 + GSAP.
- Back end via Sanity (content), OpenAI ChatKit API routes, Clerk auth.

Stack guardrails:
- TypeScript only. No any.
- Tailwind v4 utilities, no inline styles trừ khi cần.
- GSAP scoped: registerPlugin per component, clear on unmount.
- Next.js App Router, Server Actions, Route Handlers.

Security:
- Secrets chỉ dùng qua process.env ở server.
- Không fetch Sanity public token trên client.

Outputs:
- Patches nhỏ, PRs atomic, commits conventional (`feat:`, `fix:`, …).
- Tạo file kèm docstring ngắn, ví dụ usage.

When asked:
- Phân tích cây thư mục → liệt kê thay đổi tối thiểu.
- Đề xuất migration path, không chèn tool lạ.

## PR expectations

- Small, testable, include example usage.
- Follow conventional commits.

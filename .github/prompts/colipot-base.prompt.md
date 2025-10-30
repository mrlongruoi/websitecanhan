# Colipot Agent · Repo Onboarding

---
description: "Colipot Base: TypeScript only. No any."
model: "default"
tools: []
mode: "default"
---
- TypeScript only. No any.

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

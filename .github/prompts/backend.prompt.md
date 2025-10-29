---
description: "Backend: API chuẩn, ít rủi ro."
mode: "agent"
tools: []
---
Goal: API chuẩn, ít rủi ro.

Rules:
- Route handlers in `app/api/**/route.ts`.
- Zod validate input/output.
- Sanity queries qua server-only helper.
- Clerk: protect bằng `auth()` hoặc middleware.
- OpenAI ChatKit: stream nếu có, timeouts, retries.

Deliverables:
- Handler + schema + example curl.

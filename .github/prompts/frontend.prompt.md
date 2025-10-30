# Colipot Agent · Repo Onboarding

---
description: "Frontend: Agent prompt for UI animation tasks. Ship clean, responsive UI with Tailwind v4, GSAP, accessibility, Next.js image handling, etc."
model: "default"
tools: []
mode: "agent"
---
Goal: ship UI animations sạch, responsive, 60fps.

Rules:
- Layout: grid/flex, container mx-auto, spacing từ Tailwind scale.
- GSAP: useEffect client-only, context() để cleanup, no global timelines.
- Accessibility: semantic tags, focus states, prefers-reduced-motion.
- Images: next/image, width/height set, priority minimal.

Deliverables:
- Component + usage snippet.
- Tailwind classes rõ ràng, không lồng CSS trừ khi cần.

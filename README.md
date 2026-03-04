# verifiedsoftware.dev

A content-driven landing page and newsletter for the emerging verified software space. Built with Astro, Tailwind CSS, and Buttondown.

## Local development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:4321`.

## Adding a blog post

Create a new `.md` file in `src/content/blog/` with this frontmatter:

```yaml
---
title: "Your Post Title"
description: "A one-line description."
date: 2026-03-15
author: "Brendan"
tags: ["verification", "lean"]
draft: false
---

Your content here...
```

Set `draft: true` to preview locally without publishing.

## Environment variables

| Variable | Description |
|---|---|
| `BUTTONDOWN_API_KEY` | API key from [Buttondown](https://buttondown.com) for newsletter subscriptions |

Copy `.env.example` to `.env` and fill in your key.

## Deployment

Deployed via Cloudflare Pages connected to this GitHub repo. Push to `main` to deploy.

The `functions/api/subscribe.js` file is a Cloudflare Pages Function that proxies newsletter signups to Buttondown. Set `BUTTONDOWN_API_KEY` in your Cloudflare Pages environment variables.

## Tech stack

- [Astro](https://astro.build) — Static site generator
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Buttondown](https://buttondown.com) — Newsletter
- [Cloudflare Pages](https://pages.cloudflare.com) — Hosting
- [Plausible](https://plausible.io) — Analytics (cookieless)

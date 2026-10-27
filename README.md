# Retno Safinaeni — personal website

Plain HTML. Nothing to install or run.

## Open it

Double-click `index.html`. Use the **ID / EN** switch at the top right to change language. The Insurance link opens `prudential.html`.

## What's in the folder

| File | What it is |
| --- | --- |
| `index.html` | Homepage: about, two roles, experience, principles, contact |
| `prudential.html` | Insurance page: hero with profile card, introduction, 5-chapter journey (story scroll on large screens, stacking cards on phones), contact |
| `style.css` | Colors, layout, phone sizes |
| `script.js` | Language switch, header, gentle fade-in, pausing the hero's moving light off screen |
| `images/` | The pictures the pages use (portraits, chibi, journey chibis) |
| `personal-website-guide.md` | The original brief |

## Editing text

Every sentence appears twice, next to each other: `lang="id"` for Indonesian and `lang="en"` for English. Change both so the meaning stays the same. Open a page in any text editor, find the sentence, change it, save, and refresh the browser.

English links look like `index.html?lang=en`.

## Journey chibis (insurance page)

Each chapter of "Perjalanan saya" has a half-body chibi: `images/journey-1.webp` (Dari nol), `journey-2` (Belajar IT), `journey-3` (Sepuluh tahun menjembatani), `journey-4` (Bertemu Prudential), `journey-5` (Hari ini). These are small 360px copies. The full-size originals are no longer stored in this repo (they made the download about 12 MB); they are kept outside it and remain in Git history. To replace a chibi, send the new PNG and ask Claude to make the 360px WebP.

Layout: on large screens (above 900px) a pastel panel on the left pins one chibi that changes to match the chapter in the middle of the screen, with progress dots; the current chapter is highlighted. On phones and small tablets each chapter is a pastel card that stacks over the previous one while scrolling (same effect as the homepage experience cards); on very small screens, or with reduced motion, they stay a normal list. The chibis wave every few seconds (still with reduced motion).

## Content rules

- Do not name the current employer or mention Intoch.
- Do not add contributions, achievements, dates or metrics that Retno has not confirmed. Experience text comes only from her own account: project management, managing teams, overseas clients, careful listening and understanding unstated needs.
- Golfer is "selected portfolio work". Its only source is https://topgolfer.app/zh. No third-party images until permission is confirmed.
- Insurance: never promise acceptance, approval, guaranteed returns, or benefits beyond the policy. The process, FAQ and discussion questions stay out until Retno confirms her service scope.
- Contact: WhatsApp 0878-3779-2220 (`wa.me/6287837792220`) and rsafinaeni@gmail.com, confirmed by Retno. Never add placeholder links.
- Confirmed facts: based in Yogyakarta & Jakarta; 10 years of product & project experience; conversations in Bahasa Indonesia & English. No other numbers (no insurance years, clients or amounts) unless Retno confirms them.
- Insurance affiliation confirmed by Retno: PT Prudential Life Assurance, Inspiring Agency, joined 2026. Calling name: Rere. Her leader is Vivi Agustina; they met at a work event (do not add how they are connected beyond that).
- Journey facts confirmed by Retno: parents were day labourers (buruh harian lepas); often ill as a child; studied IT at school but could not continue because of cost; 10 years in product/project work. Keep the tone factual, not a sob story, and never use her illness for fear-based selling.
- The portraits and chibi are AI-generated likenesses approved by Retno. Review the likeness before publishing.

## Motion (measured on the Athos reference, athos2.framer.website, then softened)

| Where | Athos, as measured in a browser | This site |
| --- | --- | --- |
| Hero entrance | Plays once on load. Blocks rise 32px and fade in over ~0.6s, ~80-200ms apart; header slides down 18px | Rise 20px over 0.9s, 100ms apart, gentle slow-down |
| Section reveals | Play once when ~45-75px into view. Rise 32px, fade in ~0.4s. Never replay | Rise 18px over 0.8s when ~40px into view, never replay; content already on screen is never hidden |
| Header | Transparent at the top; once scrolled, morphs into a floating white rounded bar (~0.45s, slight spring) | Same shape, 0.6s with no bounce; separate on/off points (48px / 8px) so it never flickers; no page shift |
| Project cards | 4 sticky cards, each pinned 15px lower; the next card slides over; covered cards shrink ~5% per card, tied to scroll position (reverses), lightly smoothed; all release together | Same, shrinking 4% per card from the top edge so pinned cards stay put. Normal list on phones, with reduced motion, or when a card would not fit the screen |
| Hover | Button fills ~0.2s; links fade slightly; arrow nudges | Button fills, arrow nudges, ~0.2s |

Our own additions: the hero's moving pastel light and waves (pause off screen), and hero depth: while scrolling past the hero its text drifts up a little slower than the page and fades before reaching the bottom strip. With reduced motion nothing moves.

## Still needed before publishing

- Confirm name spelling, role titles and both language versions of all copy.
- AAJI licence number or other credentials, verification links, and logo permission.
- Optional: LinkedIn link.
- Optional: two or three personal details, authorized testimonials.
- Golfer images (only ones Retno is allowed to use).

# Charity Jenkins — Portfolio

Portfolio site for **Charity Jenkins**, Figma UI/UX and Klaviyo Email Designer (US).

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Home — intro, split hero (Email Design ⇄ UI/UX), what I do, contact |
| `ui-ux.html` | UI/UX projects only |
| `email.html` | Klaviyo email design projects only |
| `style.css` | All styling (light + dark themes) |
| `scripts.js` | Nav, sticky header, theme toggle, scroll reveal — shared by every page |
| `projects.js` | Project lightbox; reads `window.PROJECT_DATA` / `window.PROJECT_MODE` from the page |

## Split hero

The first screen is nothing but the two posters: `images/hero-email.jpg` (left) and
`images/hero-ui-ux.jpg` (right), full-bleed at 50/50.

Expansion is driven by pointer position in `scripts.js`, not CSS `:hover`: a side only opens to
90% once the pointer passes the 30% mark on that side, so the middle 40% of the screen — where
the bio disc sits — leaves both halves resting at 50/50. Clicking opens that discipline's project
page. Touch devices never get the expand state; a tap just opens the page.

The bio sits on a glass disc in the centre, so the posters are cropped to `object-position: right`
— that hides their own "EMAIL DESIGN" / "UI/UX DESIGN" wordmarks and shows the mockups instead.
The wordmark slides back into view only as a panel expands, and the bio fades out then. Stacked
layouts zoom the crop further (`scale(1.5)`) because a wide, short panel would otherwise fit the
whole poster in. The UI/UX label is right-aligned, the email label left-aligned.

## Colour

The palette is sampled from those same two posters, so the whole site reads as one system:

| Token | Light | Source |
| --- | --- | --- |
| `--bg-color` | `#FAF9FE` | UI/UX poster lavender |
| `--second-bg` | `#EFECFB` | UI/UX poster panel |
| `--text-color` | `#1A1C47` | UI/UX poster indigo |
| `--main-color` | `#6C45F5` | UI/UX wordmark violet |
| `--accent-color` | `#FF2E88` | Email wordmark magenta |
| `--accent-warm` | `#FF9E2C` | Email wordmark amber |

Dark mode swaps the background to `#05041A` — the email poster's own near-black plum.
UI/UX pages lean violet, email pages lean magenta; buttons and the footer run the gradient
between them.

## Adding a project

1. Put the artwork in `images/email/<slug>/` or `images/projects/<slug>/`.
2. Add a `thumb.jpg` for the card (email cards are 700×860, UI/UX cards 800×520).
3. Add a `.portfolio-box` to the page's grid with the next `data-project` index.
4. Add a matching entry — same order — to that page's `window.PROJECT_DATA` array.

## Images

Source artwork is huge (some emails are 14 000 px tall), so each project folder carries
downscaled copies the site actually serves:

- `web/*.jpg` — max 1200 px wide (email) / 1400 px wide (UI/UX), used in the lightbox
- `thumb.jpg` — the grid card

The original PNGs in `images/email/*/` are kept locally as masters and are git-ignored.
Animated GIFs are served as-is because they can't be re-encoded losslessly here.

## Built with

HTML5 · CSS3 · vanilla JavaScript · [Boxicons](https://boxicons.com) · [ScrollReveal](https://scrollrevealjs.org)

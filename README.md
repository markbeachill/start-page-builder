# Personal Start Page Creator — Stage 1.15

**Live website:** https://markbeachill.github.io/start-page-builder  
**GitHub repository:** https://github.com/markbeachill/start-page-builder

A static GitHub Pages website for creating standalone personal start pages.

## GitHub Pages

Set this project website to publish from:

```text
/docs
```

For a user's own published start page, the simplest rule is:

```text
Rename the saved start page to index.html.
```

Then put `index.html` at the top of the chosen GitHub Pages publishing source:

```text
/index.html        if publishing from the repository root
/docs/index.html   if publishing from /docs
```

## Structure

```text
docs/
  index.html              integrated public home page
  templates.html          templates and example pages
  why-start-page.html     explanation of why a custom start page is useful
  ai-menu-help.html       instructions for building a menu with AI
  github-pages.html       publishing guide
  about.html              about this tool
  help.html               help and notes
  builder.html            light-wrapper app page
  assets/site.css         public site styling
  templates/*.json        starter templates
  examples/*.html         exported demo start pages
```

## Design rule

The public informational pages use the integrated site design. The builder uses only a light top navigation wrapper. Exported start pages remain standalone HTML and do not depend on the website design.


## Stage 1.15 update

- Added `docs/about.html`.
- Added footer links to the About page across the integrated site pages.
- Kept the builder page as a light workspace without a heavy footer.

## Stage 1.15 features

- Added a **Why use a start page?** page explaining deep links, reduced distraction, spatial familiarity, no-extension use, and digital autonomy.
- Link rows now have ↑ / ↓ controls and can be dragged within their section to reorder links.
- Publishing page now has a simpler heading and puts the AI step-by-step publishing prompt near the top.
- AI instruction blocks on the AI and publishing pages now include copy-to-clipboard buttons.
- Home page now links to the start-page rationale as well as examples.
- Publishing page now strongly recommends renaming the saved start page to `index.html` for GitHub Pages.
- Publishing AI prompt now asks the AI to guide the user step by step, use `index.html`, calculate the final URL, write a README and choose a shortcut system.
- Integrated home, templates, AI help, publishing and help pages.
- Light-wrapper builder page with wide editor and preview panes.
- Template selector: Typical UK User, Typical US User, Software Developer and Blank.
- Real example start pages for UK, US and Software Developer menus.
- Save/load start page as first-class actions.
- Save/load menu config as first-class actions.
- Import list dropdown: Markdown, CSV and plain text.
- Export list dropdown: Markdown and plain text.
- Load existing exported start page HTML back into the builder.
- Section **Use** control remains, with sections used by default.
- No framework, no backend, no account, no external library dependency.

## File concepts

- **Start page**: the finished `.html` page used in a browser or published online.
- **Menu config**: the `.json` configuration file that lets this builder reload sections, links, colours and settings later.
- **List**: Markdown, CSV or plain text used for importing/exporting links.

## Local testing

```bash
cd docs
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Publishing URL pattern

For a normal GitHub Pages project repository, the live URL is usually:

```text
https://USERNAME.github.io/REPOSITORY/
```

For a special user site repository named `USERNAME.github.io`, the live URL is usually:

```text
https://USERNAME.github.io/
```

After publishing, add the URL to the user's `README.md` and choose a shortcut method such as a browser bookmark, browser homepage, desktop shortcut, phone/tablet home-screen shortcut, or another launcher system.

## Stage 1.15 update

- Updated the exported start-page search area so it feels more like a search-first browser start page.
- The search bar is now aligned with the menu content width.
- The search box is larger, has an accessibility label, and autofocuses in saved/exported start pages.
- The button now says “Search” rather than “Go”.
- The builder preview does not steal focus while editing.


## Stage 1.15 note

This point release fixes editor focus loss while typing. Text edits now update the preview without rebuilding the editor form, so inputs should keep focus as expected.

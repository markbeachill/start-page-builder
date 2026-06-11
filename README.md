# Personal Start Page Creator — Stage 1.19

**Live website:** https://markbeachill.github.io/start-page-builder  
**GitHub repository:** https://github.com/markbeachill/start-page-builder

A static GitHub Pages website for creating standalone personal start pages.

## Stage 1.19 update

- Tidied the home page featured examples to three cards: UK, US and Workplace.
- Removed the Software Developer card from the home page featured row so the examples fit neatly three-abreast.
- Kept Software Developer available on the Jump-start Templates page and in the builder.
- Removed public **View JSON** buttons from template cards.
- Kept template JSON files available behind the scenes for the builder and for direct use if needed.
- Added a short note on the templates page explaining that templates open in the builder for editing.

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
  templates.html          jump-start template catalogue and example pages
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

## Current features

- Integrated home, templates, AI help, publishing, about and help pages.
- Light-wrapper builder page with wide editor and preview panes.
- Template selector with everyday, workplace, software, education, business, creative, life and fandom templates.
- Real example start pages for ready-to-use templates.
- Save/load start page as first-class actions.
- Save/load menu config as first-class actions.
- Import list dropdown: Markdown, CSV and plain text.
- Export list dropdown: Markdown and plain text.
- Load existing exported start page HTML back into the builder.
- Link rows have ↑ / ↓ controls and can be dragged within their section to reorder links.
- Section **Use** control remains, with sections used by default.
- Responsive classic renderer with full-width buttons, calculated five-column widths and search-first behaviour.
- Publishing page recommends renaming saved start pages to `index.html` for GitHub Pages.
- AI instruction blocks include copy-to-clipboard buttons.
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


## Stage 1.18 update

- Added the jump-start template catalogue from `menu_list(1).csv`.
- Added 40 catalogue JSON templates from `start_page_menu_json_files(1).zip`.
- Replaced the Workplace template with the updated `start-page-workplace-menu-config.json`.
- Generated 28 jump-start example pages and marked 12 placeholder templates as coming soon.
- Updated example links so standalone example pages open in a new tab/window.

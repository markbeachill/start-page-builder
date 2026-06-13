# Personal Start Page Creator — Stage 1.22

**Live website:** https://markbeachill.github.io/start-page-builder  
**GitHub repository:** https://github.com/markbeachill/start-page-builder

A static GitHub Pages website for creating standalone personal start pages.

## Stage 1.22 update

This stage adds two new presentation options to the builder and exported start pages.

- Added a **Colours** setting with **Primary** and **Pastel** options.
- Added a **Show title** setting.
- **Show title** defaults to on for new templates and new menus.
- When shown, the page title appears beside the search box on wider screens.
- On narrower screens, the title and search area wrap naturally so the search remains usable.
- Menu config JSON now saves top-level `colours` and `showTitle` values.
- Existing menu configs without these values still load safely: `colours` defaults to `primary`, and `showTitle` defaults to `true`.
- Exported standalone start pages now write `data-colours` and `data-show-title` onto the `<body>` tag.
- Loading an existing start page now tries to detect the colour style and title display state.
- Regenerated example start pages so they use the title beside search by default.

## Previous Stage 1.21 update

Stage 1.21 implemented adjustable desktop columns.

- Users can choose **2, 3, 4 or 5 columns** for wider screens.
- Phones and small screens still stack to one column automatically.
- The default remains **5 columns** for backwards compatibility.
- Menu config JSON saves a top-level `columns` value.
- Loading an existing start page tries to detect the column count from `data-columns`, the `--columns` CSS variable, or the number of `.col` elements.
- Templates include recommended default column counts.

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

The classic menu structure is still protected: sections, headers, buttons, search bar and collapse behaviour are preserved. Stage 1.22 only adds controlled presentation settings: colour strength and title display.

## Current features

- Integrated home, templates, AI help, publishing, about and help pages.
- Light-wrapper builder page with wide editor and preview panes.
- Template selector with everyday, workplace, software, education, business, creative, life, hobbies and fandom templates.
- Real example start pages for ready-to-use templates.
- Adjustable desktop column count: 2, 3, 4 or 5 columns.
- Primary or Pastel colour style.
- Show/hide page title beside search.
- Mobile layout automatically stacks to one column.
- Save/load start page as first-class actions.
- Save/load menu config as first-class actions.
- Import list dropdown: Markdown, CSV and plain text.
- Export list dropdown: Markdown and plain text.
- Load existing exported start page HTML back into the builder.
- Link rows have ↑ / ↓ controls and can be dragged within their section to reorder links.
- Section **Use** control remains, with sections used by default.
- Responsive classic renderer with full-width buttons, calculated column widths and search-first behaviour.
- Publishing page recommends renaming saved start pages to `index.html` for GitHub Pages.
- AI instruction blocks include copy-to-clipboard buttons.
- No framework, no backend, no account, no external library dependency.

## File concepts

- **Start page**: the finished `.html` page used in a browser or published online.
- **Menu config**: the `.json` configuration file that lets this builder reload sections, links, colours, column count, title display and settings later.
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

## Template quality work retained from Stage 1.20

Stage 1.20 replaced the first group of short jump-start templates with fuller ready-to-use menu configs and regenerated example pages:

- Student templates: primary/elementary, secondary/high school, university/college, UK and US.
- Teacher templates: UK and US.
- Small Business templates: UK and US.
- Workplace template: universal.
- Retired / Everyday Life templates: UK and US.
- Local History templates: UK and US, grouped under Hobbies.

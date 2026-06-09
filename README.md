# Personal Start Page Creator — Stage 1.8

**Live website:** https://markbeachill.github.io/start-page-builder  
**GitHub repository:** https://github.com/markbeachill/start-page-builder

A static GitHub Pages website for creating standalone personal start pages.

## GitHub Pages

Set GitHub Pages to publish from:

```text
/docs
```

## Structure

```text
docs/
  index.html              integrated public home page
  templates.html          templates and example pages
  ai-menu-help.html       instructions for building a menu with AI
  github-pages.html       publishing guide
  help.html               help and notes
  builder.html            light-wrapper app page
  assets/site.css         public site styling
  templates/*.json        starter templates
  examples/*.html         exported demo start pages
```

## Design rule

The public informational pages use the integrated site design. The builder uses only a light top navigation wrapper. Exported start pages remain standalone HTML and do not depend on the website design.

## Stage 1.8 features

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

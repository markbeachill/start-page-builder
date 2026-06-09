# Personal Start Page Creator — Stage 1.9

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

## Stage 1.9 features

- Integrated home, templates, AI help, publishing and help pages.
- Publishing page now includes a copy/paste AI prompt for step-by-step GitHub Pages setup, URL calculation, README wording and shortcut setup.
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

After publishing, add the URL to this README and choose a shortcut method such as a browser bookmark, browser homepage, desktop shortcut, phone/tablet home-screen shortcut, or another launcher system.

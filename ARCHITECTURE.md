# Architecture

Personal Start Page Creator is a static GitHub Pages site. It is intentionally simple: plain HTML, CSS and JavaScript, with no backend and no build step.

## Publishing source

The live project site is intended to publish from:

```text
/docs
```

That means files under `docs/` are public website files. Root markdown files are repository/project documentation rather than part of the published site.

## Main website pages

```text
docs/index.html            public home page
docs/templates.html        template catalogue
docs/why-start-page.html   explanation page
docs/ai-menu-help.html     AI-assisted menu guide
docs/github-pages.html     publishing guide
docs/about.html            about page
docs/help.html             help and notes
docs/builder.html          main builder app
```

Shared public assets live in:

```text
docs/assets/site.css                 public site styling
docs/assets/start-page-renderer.js   shared menu renderer/export module
```

## Builder app

`docs/builder.html` is the main application. It contains the builder UI and editor/import logic. Shared project conversion, preview rendering and standalone export logic live in `docs/assets/start-page-renderer.js`.

The builder handles:

- loading template JSON files;
- maintaining menu state in the browser;
- editing sections and links;
- moving sections between stable columns;
- moving links within or between expanded sections;
- rendering the live preview via the shared renderer;
- importing Markdown, CSV, plain text, JSON config and existing exported HTML;
- exporting menu config JSON;
- exporting standalone start page HTML via the shared renderer.

There is no server-side storage. Saved files are downloaded by the browser. The shared renderer is required by the Node-based maintainer tools so examples can be generated without duplicating export logic.

## Shared renderer

`docs/assets/start-page-renderer.js` exposes the classic renderer through `window.StartPageRenderer` in the browser and `module.exports` in Node. The most useful entry point for tooling is:

```js
htmlFromProject(projectJson)
```

That helper normalises a template/project JSON object, converts it to the internal menu state, and returns a complete standalone HTML page. `tools/generate-examples.js` calls this function to generate public example pages.

Keep renderer functions in this file when they affect exported output. Keep browser-only editor behaviour, downloads, drag/drop and local storage handling in `docs/builder.html`.


## Maintainer tools

Maintainer tooling lives outside the published site:

```text
tools/generate-examples.js    regenerate example HTML from catalogue template JSON
tools/validate-templates.js   validate catalogue, templates, examples, builder links and local links
```

These scripts are not part of the public GitHub Pages site. They use Node's built-in modules only and are run from the repository root. The generator imports `docs/assets/start-page-renderer.js`, so browser exports and generated examples share the same rendering path.

## Template system

Template JSON files live in:

```text
docs/templates/*.json
```

The public catalogue metadata lives in:

```text
docs/templates/catalog.json
```

The builder has its own template file map and dropdown options in `docs/builder.html`. The public catalogue page has its own cards in `docs/templates.html`. These are still maintained manually, but `tools/validate-templates.js` checks that available catalogue entries also appear in the builder and public template-page links.

## Example pages

Generated example pages live in:

```text
docs/examples/*.html
```

They are exported start pages used by the **Try it** links on `docs/templates.html`. Available catalogue examples are generated with `tools/generate-examples.js` from the shared renderer.

Each current example should be self-contained and should include:

```html
<script type="application/json" id="spb-menu-config">
```

The embedded config lets `docs/builder.html` reload an exported page as structured data.

## Exported start pages

Exported pages are standalone HTML files. They should not require assets from the main website after being saved.

The exported menu uses namespaced classes, variables and data attributes to reduce clashes if a user adapts the page into another site. Examples include:

```text
spb-btn
spb-hdr
spb-col
spb-searchbar-form
spb-menu-title
--spb-columns
--spb-c-blue
data-spb-columns
data-spb-colours
data-spb-show-title
```

## Data concepts

- **Start page**: the finished `.html` page used in a browser or published online.
- **Menu config**: the `.json` configuration file that lets the builder reload sections, links, colours, column count, title display and other settings.
- **List**: Markdown, CSV or plain text used for importing/exporting link lists.
- **Template**: a starter menu config stored in `docs/templates/*.json`.
- **Example**: a generated standalone page stored in `docs/examples/*.html`.

## Layout model

The builder supports controlled 2–5 column layouts for wider screens. Mobile layouts stack into one column.

Sections have a stored `column` value so placement is stable. Changing the overall column count moves sections from removed columns into the last remaining column.

Section order is managed within each column. Link order is managed within each section, and links can be dragged between expanded sections.

## Compatibility model

Current exported pages include embedded structured config. The builder should prefer this config when loading an existing exported page.

Older exported pages may not include that block, so the loader also includes fallback behaviour that reads the visible HTML where practical. Preserve this compatibility when changing import/export logic.

## Design boundaries

- The public informational pages use the integrated site design.
- The builder uses a light wrapper so the editor and preview can use the available width.
- Exported start pages keep their own standalone styling and behaviour.
- The classic menu behaviour remains protected: sections, headers, buttons, search bar and collapse behaviour should remain recognisable and reliable.
## Maintainer automation

The repository has two manual GitHub Actions workflows in `.github/workflows/`:

- `validate.yml` runs the syntax checks, `tools/generate-examples.js --check` and `tools/validate-templates.js` without changing files.
- `generate-examples.yml` runs `tools/generate-examples.js`, validates the generated output and commits changed files in `docs/examples/` back to the branch.

These workflows are maintenance helpers only. They do not control GitHub Pages deployment, which remains based on publishing the static `/docs` folder.


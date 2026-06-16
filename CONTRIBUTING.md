# Contributing

This repository is a static GitHub Pages project. There is no build step, framework, backend service or package manager requirement for normal editing. The root `tools/` scripts are optional maintainer utilities and use only built-in Node modules.

## Local development

Run the published site directory with a local static server:

```bash
cd docs
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

Use the local server rather than opening files directly from disk, because template loading uses browser `fetch()` and should be tested under normal HTTP behaviour.

## Typical editing workflow

1. Create or edit files in `docs/`.
2. Test the site locally from the `docs` directory.
3. Check the relevant public page in a browser.
4. Check `builder.html` if template, import/export, preview or editor behaviour changed.
5. Regenerate affected example pages with `node tools/generate-examples.js` or a focused `--template <code>` run.
6. Run `node tools/validate-templates.js`.
7. If export output changes, update `docs/assets/start-page-renderer.js` rather than duplicating renderer logic in the builder or tools.
8. Update the root markdown docs when the workflow, architecture or template rules change.
9. Record notable user-facing or maintainer-facing changes in `CHANGELOG.md`.

## Template batch workflow

When turning placeholder templates into available templates, update these files together:

1. `docs/templates/<template-code>.json`
2. `docs/templates/catalog.json`
3. `docs/templates.html`
4. `docs/builder.html`
5. `docs/examples/start-page-<template-code>.html` generated with `tools/generate-examples.js`
6. `docs/examples/README.md`
7. `CHANGELOG.md`

The public template card, builder dropdown, catalogue metadata and example page should agree before the change is considered complete.


## Manual GitHub Actions

The repository includes two manual Actions workflows:

- **Validate site** checks JavaScript syntax, confirms generated examples are up to date and runs template/site validation. It is read-only.
- **Generate examples** regenerates `docs/examples/*.html` from the template JSON files, validates the result and commits changed example files back to the branch.

GitHub Pages publishing is still handled separately from the `/docs` folder; these actions do not replace the Pages publishing setup.

## Maintainer tools

Run these commands from the repository root:

```bash
node tools/generate-examples.js          # regenerate all available catalogue examples
node tools/generate-examples.js --check  # check examples without writing files
node tools/generate-examples.js --template student-primary-uk
node tools/validate-templates.js
```

The generator reads `docs/templates/catalog.json`, loads the relevant template JSON files and calls `htmlFromProject(projectJson)` from `docs/assets/start-page-renderer.js`. The validator is intentionally strict about generated examples being up to date, so regenerate examples before validating after template or renderer changes.

## Validation checks

At minimum, check that:

- all JSON files in `docs/templates/` parse successfully;
- `docs/templates/catalog.json` points to real template files and example pages for available templates;
- every available template appears in the builder dropdown;
- every available template has a matching public card on `docs/templates.html`;
- every available template has a matching example page under `docs/examples/`;
- affected example pages include the embedded builder-readable config block;
- changed pages open through the local static server;
- `docs/assets/start-page-renderer.js` passes a Node syntax check when changed;
- there are no broken local links introduced by the change.

The preferred full validation command is:

```bash
node tools/validate-templates.js
```

For renderer changes, also check syntax directly:

```bash
node --check docs/assets/start-page-renderer.js
```

## Code style

The project intentionally keeps the implementation simple:

- plain HTML, CSS and JavaScript;
- shared renderer/export logic should live in `docs/assets/start-page-renderer.js`;
- no bundled frontend framework;
- no backend dependency;
- no external runtime dependency for exported start pages;
- user-facing wording should stay clear and non-technical;
- exported start pages should remain portable standalone HTML.

## Compatibility expectations

Builder changes should preserve the ability to reload older exported pages where practical. The current exporter embeds a JSON config block, but the loader also includes compatibility paths for older visible HTML exports.

Do not remove backwards-compatible import behaviour unless there is a deliberate migration plan.

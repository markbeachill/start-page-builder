# Changelog

This file contains the stage-by-stage history for Personal Start Page Creator.

The project uses informal stage numbers rather than packaged software releases. Keep the newest stage at the top.

## Stage 1.36 — manual GitHub Actions tooling

Stage 1.36 adds simple manual GitHub Actions workflows for repository maintenance while leaving GitHub Pages publishing from `/docs` unchanged.

- Added `.github/workflows/validate.yml` as a manual read-only action that checks JavaScript syntax, verifies generated examples are up to date and runs template/site validation.
- Added `.github/workflows/generate-examples.yml` as a manual action that regenerates `docs/examples/*.html` from `docs/templates/catalog.json` and the template JSON files, validates the result and commits changed example files back to the branch.
- Updated repository documentation and release notes to describe the manual validation and generation buttons.

## Stage 1.35b — template tooling

Stage 1.35b adds dependency-free maintainer tools for regenerating examples and validating template consistency.

- Added `tools/generate-examples.js` to regenerate available catalogue example pages from template JSON through the shared renderer.
- Added `tools/validate-templates.js` to check catalogue metadata, template JSON shape, builder dropdown consistency, public template-page links, generated examples and local static links.
- Regenerated current catalogue example pages through `htmlFromProject(projectJson)` so examples match the extracted renderer.
- Updated `docs/examples/README.md` so example filenames are direct markdown links.
- Updated repository documentation to use the new generator and validator in the maintainer workflow.

## Stage 1.35a — shared renderer extraction

Stage 1.35a extracts the classic start-page rendering and export logic out of the monolithic builder page and into a shared browser/Node-compatible renderer module.

- Added `docs/assets/start-page-renderer.js` as the shared renderer/export module.
- Updated `docs/builder.html` to load the shared renderer instead of carrying duplicate rendering functions inline.
- Added `htmlFromProject(projectJson)` as a direct JSON-to-standalone-HTML helper for future maintainer tooling.
- Kept browser-only UI/editor behaviour in `docs/builder.html`.
- Preserved the existing standalone export shape, embedded config block and classic menu behaviour.

## Stage 1.34 — repository documentation cleanup

Stage 1.34 reorganises the repository documentation into a more standard GitHub layout.

- Rewrote `README.md` as a concise project overview and entry point.
- Moved the stage history out of the README and into this changelog.
- Added `CONTRIBUTING.md` for maintainer workflow and validation notes.
- Added `TEMPLATE_GUIDE.md` for template content and technical rules.
- Added `ARCHITECTURE.md` to explain how the static site, builder, templates and exports work.
- Added `RELEASE_CHECKLIST.md` for repeatable checks before publishing template or builder changes.

## Stage 1.33 — template quality batch 5

Stage 1.33 improves the remaining placeholder sport, fandom and hobby jump-start templates with fuller, more practical menus and regenerates their matching **Try it** example pages.

Enhanced templates:

- Sports — UK
- Sports — US
- UK Football — UK
- Movie Buffs — UK
- Movie Buffs — US
- K-Pop Fans
- Music Fans — UK
- Music Fans — US

Template notes:

- Sports now covers live scores, news, major leagues, cricket, rugby, tennis, golf, motorsport, fantasy games, tickets, streaming and analysis.
- UK Football now covers matchday links, Premier League, EFL, non-league, cups, Europe, transfers, stats, women’s football, tickets, travel, rules and supporter resources.
- Movie Buffs now covers film tracking, streaming finders, cinemas/theaters, criticism, industry news, archives, awards, filmmaking, posters, data and communities.
- K-Pop Fans now covers official platforms, news, music shows, voting, charts, streaming, albums, merch, concerts, language tools, fan communities and archives.
- Music Fans now covers listening, charts, releases, gigs, festivals, record shops, reviews, sessions, setlists, music data, gear and communities.

## Stage 1.32 — template quality batch 4

Stage 1.32 improved another six jump-start templates with fuller, more practical menus and regenerated their matching **Try it** example pages.

Enhanced templates:

- Family & Home — UK
- Family & Home — US
- Travel Planners — UK
- Travel Planners — US
- Readers & Writers — UK
- Readers & Writers — US

Template notes:

- Family & Home now covers search, shared calendars, school, groceries, money, health, utilities, travel, entertainment and online safety.
- Travel Planners now covers maps, flights, trains/road travel, stays, itineraries, travel safety, money, local transport, activities and travel tools.
- Readers & Writers is now a ready-to-use Hobbies template covering libraries, writing tools, research, publishing, reviews, journals, notes, references, audio and writing communities.

## Stage 1.31 — link drag between sections

Stage 1.31 lets links be moved between sections using the existing link drag handles.

- Link drag-and-drop now works across expanded sections, not only within the same section.
- Dropping a link onto another link row inserts it at that position.
- Dropping a link into the empty link area of a section appends it to that section.
- Empty sections can receive dragged links.
- Dragging still starts only from the link handle, so text fields, URL fields, selects and buttons remain safe to click and edit.
- Existing link ↑ / ↓ buttons still reorder within the current section.
- Section drag-and-drop remains limited to reordering sections within the same column.
- The preview, browser draft, saved menu config and exported start page all reflect the new link location.

## Stage 1.30 — editor ordering by column

Stage 1.30 makes the builder editor match the new stable column model from Stage 1.29.

- Section cards are now grouped by column in the editor: Column 1 first, then Column 2, and so on.
- Added visible column dividers such as `Column 1 · 3 sections`.
- Empty columns are shown with a small placeholder message so users can see where sections can be moved.
- Ordering within each column is preserved.
- Section **←** and **→** movement now places the moved section at the bottom of the destination column.
- Section **↑** and **↓** continue to reorder within the current column.
- Section drag-and-drop still works within the current column only.
- The exported start page output is unchanged; this is an editor usability improvement.

## Stage 1.29 — stable section column placement

Stage 1.29 changes section placement so columns are predictable rather than repeatedly auto-balanced.

- Each section now has a stored column number.
- Templates and older files without section column numbers are auto-assigned once using the previous balancing logic.
- After that, section placement stays stable unless the user changes it.
- Section cards now show their column number, for example `Col 3`.
- Added section **←** and **→** controls to move a section left or right between columns.
- Existing section **↑** and **↓** controls now reorder sections within the current column.
- Section drag-and-drop is kept to reordering within the same column.
- If the column count is reduced, sections in removed columns move into the last remaining column. For example, column 5 sections move to column 4 when changing from five to four columns.
- Menu config JSON and embedded exported-page config now include section-level `column` values.
- Example pages and templates were regenerated with stable section column values.

## Stage 1.28 — editor expand/collapse controls

Stage 1.28 adds simple builder-wide editor controls for working with large menus.

- Added **Expand all** and **Collapse all** controls above the section editor.
- **Collapse all** hides link rows and add-link controls across all sections, leaving section headers, Use checkboxes, colours, drag handles and section movement buttons visible.
- This makes large templates easier to reorder without changing the exported start page.
- **Expand all** restores the full link editor.
- The collapse state is editor-only and is not saved into menu configs or exported start pages.

## Stage 1.27 — section reordering

This stage adds section reordering to the builder editor.

- Section cards now have a dedicated drag handle.
- Sections can be dragged up or down to change their order.
- Existing ↑ / ↓ section movement buttons remain as a reliable fallback.
- Dragging is deliberately limited to the section handle so text fields, selects and buttons do not lose focus.
- Link dragging within a section still works as before.
- Reordered sections update the preview, browser draft, saved menu config and exported start page.

## Stage 1.26 update

This stage improves another six jump-start templates with fuller, more practical menus and regenerated examples.

Enhanced templates:

- Creative Pros
- Creators
- News Buffs — UK
- News Buffs — US
- Health & Wellness — UK
- Health & Wellness — US

Each upgraded template now has a richer set of sections, practical short button labels, country-specific official links where useful, recommended columns, colour style and title display settings, and a regenerated standalone example page.

## Stage 1.25 update

Stage 1.25 improved portability and the AI-assisted menu workflow.

- Exported start pages embed a builder-readable menu config in:

  ```html
  <script type="application/json" id="spb-menu-config">
  ```

- Loading an existing start page checks for that embedded config first, then falls back to parsing older visible HTML.
- The embedded config contains the exported/visible menu content and settings, making saved start pages easier to reload into the builder.
- The builder includes **Paste list from AI**.
- Pasted Markdown, CSV and plain-text lists can be imported without first saving a temporary file.
- If pasted text contains `START OF LIST` and `END OF LIST`, the builder imports only the marked block and ignores surrounding AI commentary.
- The AI Help page explains an interactive workflow: chat, refine, type **Menu finished**, copy the marked list, then paste it into the builder.

## Stage 1.24 update

Stage 1.24 namespaced the exported menu HTML/CSS/JS so it is safer to copy into, or adapt for, an existing website.

- Exported menu CSS classes use an `spb-` prefix, for example `spb-btn`, `spb-hdr`, `spb-col`, `spb-searchbar-form` and `spb-menu-title`.
- Exported CSS variables use an `--spb-` prefix, for example `--spb-columns` and `--spb-c-blue`.
- Exported body data attributes use `data-spb-*`, for example `data-spb-columns`, `data-spb-colours` and `data-spb-show-title`.
- Section headers are real `<button type="button">` controls with `aria-expanded`.
- Collapse behaviour uses the `hidden` attribute.
- Import compatibility is retained for older exported files using `.btn`, `.hdr`, `.col`, `data-columns`, `data-colours`, `data-show-title` and `--columns`.

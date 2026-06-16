#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const renderer = require("../docs/assets/start-page-renderer.js");

const repoRoot = path.resolve(__dirname, "..");
const docsDir = path.join(repoRoot, "docs");
const templatesDir = path.join(docsDir, "templates");
const examplesDir = path.join(docsDir, "examples");
const catalogPath = path.join(templatesDir, "catalog.json");
const builderPath = path.join(docsDir, "builder.html");
const templatesPagePath = path.join(docsDir, "templates.html");
const examplesReadmePath = path.join(examplesDir, "README.md");

const errors = [];
const warnings = [];
const notes = [];

function rel(filePath){
  return path.relative(repoRoot, filePath).split(path.sep).join("/");
}
function fail(message){ errors.push(message); }
function warn(message){ warnings.push(message); }
function note(message){ notes.push(message); }
function readText(filePath){ return fs.readFileSync(filePath, "utf8"); }
function readJson(filePath){ return JSON.parse(readText(filePath)); }
function exists(filePath){ return fs.existsSync(filePath); }
function isObject(value){ return value && typeof value === "object" && !Array.isArray(value); }
function uniqueValues(values){ return new Set(values).size === values.length; }
function nonEmptyString(value){ return typeof value === "string" && value.trim().length > 0; }
function findRepeated(values){
  const seen = new Set();
  const repeats = new Set();
  values.forEach(value => {
    if(seen.has(value)) repeats.add(value);
    else seen.add(value);
  });
  return [...repeats];
}
function extractBetween(text, startPattern, endPattern){
  const start = text.search(startPattern);
  if(start < 0) return "";
  const tail = text.slice(start);
  const end = tail.search(endPattern);
  return end < 0 ? tail : tail.slice(0, end);
}
function extractBuilderTemplateOptions(builderHtml){
  const select = extractBetween(builderHtml, /<select\s+id="templateSelect"[^>]*>/, /<\/select>/);
  const values = [];
  const re = /<option\s+value="([^"]+)"/g;
  let match;
  while((match = re.exec(select))) values.push(match[1]);
  return values;
}
function extractBuilderTemplateMap(builderHtml){
  const objectBlockMatch = builderHtml.match(/const\s+templateFiles\s*=\s*\{([\s\S]*?)\};/);
  const map = new Map();
  if(!objectBlockMatch) return map;
  const re = /"([^"]+)"\s*:\s*"([^"]+)"/g;
  let match;
  while((match = re.exec(objectBlockMatch[1]))) map.set(match[1], match[2]);
  return map;
}
function extractTemplatePageBuildCodes(html){
  const values = [];
  const re = /href="builder\.html\?template=([^"&#]+)"/g;
  let match;
  while((match = re.exec(html))) values.push(match[1]);
  return values;
}
function extractTemplatePageExamplePaths(html){
  const values = [];
  const re = /href="(examples\/[^"#?]+\.html)"/g;
  let match;
  while((match = re.exec(html))) values.push(match[1]);
  return values;
}
function extractMarkdownHtmlLinks(markdown){
  const links = [];
  const re = /\[[^\]]+\]\(([^)#?]+\.html)\)/g;
  let match;
  while((match = re.exec(markdown))) links.push(match[1]);
  return links;
}
function validateUrl(url, context){
  if(!nonEmptyString(url)){ fail(`${context}: missing URL`); return; }
  if(!/^https?:\/\//i.test(url)){
    fail(`${context}: URL should start with http:// or https:// (${url})`);
    return;
  }
  try{ new URL(url); }
  catch(_error){ fail(`${context}: invalid URL (${url})`); }
}
function validateTemplateShape(template, filePath, catalogEntry){
  const context = rel(filePath);
  if(!isObject(template)){ fail(`${context}: template JSON must be an object`); return; }
  ["format","title","description","filename","columns","colours","showTitle","sections"].forEach(field => {
    if(!(field in template)) fail(`${context}: missing top-level field ${field}`);
  });
  if(template.format !== "personal-start-page-creator-v1") fail(`${context}: format should be personal-start-page-creator-v1`);
  if(!nonEmptyString(template.title)) fail(`${context}: title must be a non-empty string`);
  if(!nonEmptyString(template.filename)) fail(`${context}: filename must be a non-empty string`);
  if(!Number.isInteger(template.columns) || template.columns < renderer.MIN_COLUMNS || template.columns > renderer.MAX_COLUMNS){
    fail(`${context}: columns must be an integer from ${renderer.MIN_COLUMNS} to ${renderer.MAX_COLUMNS}`);
  }
  if(!renderer.allowedColourStyles.includes(template.colours)) fail(`${context}: colours must be one of ${renderer.allowedColourStyles.join(", ")}`);
  if(typeof template.showTitle !== "boolean") fail(`${context}: showTitle must be a boolean`);
  if(!Array.isArray(template.sections)) fail(`${context}: sections must be an array`);

  if(catalogEntry){
    if(template.filename !== path.basename(catalogEntry.example || "")) fail(`${context}: filename should match catalogue example basename (${catalogEntry.example})`);
    if(template.columns !== catalogEntry.columns) fail(`${context}: columns do not match catalogue entry (${template.columns} vs ${catalogEntry.columns})`);
    if(template.colours !== catalogEntry.colours) fail(`${context}: colours do not match catalogue entry (${template.colours} vs ${catalogEntry.colours})`);
    if(template.showTitle !== catalogEntry.showTitle) fail(`${context}: showTitle does not match catalogue entry`);
  }

  if(!Array.isArray(template.sections)) return;
  const sectionNames = [];
  template.sections.forEach((section, sectionIndex) => {
    const sectionContext = `${context} section ${sectionIndex + 1}`;
    if(!isObject(section)){ fail(`${sectionContext}: section must be an object`); return; }
    if(!nonEmptyString(section.name)) fail(`${sectionContext}: missing section name`);
    else sectionNames.push(section.name.trim().toLowerCase());
    if(!renderer.allowedColours.includes(section.colour)) fail(`${sectionContext}: colour must be one of ${renderer.allowedColours.join(", ")}`);
    if(!Number.isInteger(section.column) || section.column < 1 || section.column > template.columns){
      fail(`${sectionContext}: column must be an integer from 1 to ${template.columns}`);
    }
    if("included" in section && typeof section.included !== "boolean") fail(`${sectionContext}: included must be a boolean when present`);
    if(!Array.isArray(section.links)){ fail(`${sectionContext}: links must be an array`); return; }

    const labels = [];
    section.links.forEach((link, linkIndex) => {
      const linkContext = `${sectionContext} link ${linkIndex + 1}`;
      if(!isObject(link)){ fail(`${linkContext}: link must be an object`); return; }
      if(!nonEmptyString(link.label)) fail(`${linkContext}: missing label`);
      else labels.push(link.label.trim().toLowerCase());
      validateUrl(link.url, linkContext);
      if("colour" in link && !renderer.allowedColours.includes(link.colour)) fail(`${linkContext}: colour must be one of ${renderer.allowedColours.join(", ")}`);
      if("included" in link && typeof link.included !== "boolean") fail(`${linkContext}: included must be a boolean when present`);
    });
    findRepeated(labels).forEach(label => fail(`${sectionContext}: duplicate link label "${label}"`));
  });
  findRepeated(sectionNames).forEach(name => fail(`${context}: duplicate section name "${name}"`));

  try{
    const generated = renderer.htmlFromProject(template);
    if(!generated.includes('id="spb-menu-config"')) fail(`${context}: renderer output is missing embedded config block`);
  }catch(error){
    fail(`${context}: renderer failed (${error.message})`);
  }
}

function validateLocalHrefTargets(filePath){
  const html = readText(filePath);
  const re = /(?:href|src)="([^"]+)"/g;
  let match;
  while((match = re.exec(html))){
    const target = match[1];
    if(/^(https?:|mailto:|tel:|#|javascript:)/i.test(target)) continue;
    if(target.startsWith("data:")) continue;
    const clean = target.split("#")[0].split("?")[0];
    if(!clean) continue;
    const targetPath = path.resolve(path.dirname(filePath), clean);
    if(!targetPath.startsWith(repoRoot)){
      fail(`${rel(filePath)}: local link points outside repository (${target})`);
      continue;
    }
    if(!exists(targetPath)) fail(`${rel(filePath)}: missing local link target ${target}`);
  }
}

function main(){
  let catalog;
  try{
    catalog = readJson(catalogPath);
    if(!Array.isArray(catalog)) fail("docs/templates/catalog.json must be a JSON array");
    else note(`catalog entries: ${catalog.length}`);
  }catch(error){
    fail(`docs/templates/catalog.json failed to parse: ${error.message}`);
    catalog = [];
  }

  const templateFiles = fs.readdirSync(templatesDir).filter(name => name.endsWith(".json") && name !== "catalog.json").sort();
  const templateByCatalogPath = new Map();
  const codes = [];
  const templatePaths = [];
  const examplePaths = [];

  catalog.forEach((entry, index) => {
    const context = `catalog entry ${index + 1}${entry && entry.code ? ` (${entry.code})` : ""}`;
    if(!isObject(entry)){ fail(`${context}: entry must be an object`); return; }
    ["section","code","title","description","template","example","available","columns","colours","showTitle"].forEach(field => {
      if(!(field in entry)) fail(`${context}: missing field ${field}`);
    });
    if(nonEmptyString(entry.code)) codes.push(entry.code);
    else fail(`${context}: code must be a non-empty string`);
    if(typeof entry.available !== "boolean") fail(`${context}: available must be a boolean`);
    if(!Number.isInteger(entry.columns) || entry.columns < renderer.MIN_COLUMNS || entry.columns > renderer.MAX_COLUMNS) fail(`${context}: columns must be ${renderer.MIN_COLUMNS}-${renderer.MAX_COLUMNS}`);
    if(!renderer.allowedColourStyles.includes(entry.colours)) fail(`${context}: colours must be one of ${renderer.allowedColourStyles.join(", ")}`);
    if(typeof entry.showTitle !== "boolean") fail(`${context}: showTitle must be a boolean`);

    if(nonEmptyString(entry.template)){
      const templatePath = path.join(docsDir, entry.template);
      templatePaths.push(entry.template);
      templateByCatalogPath.set(path.normalize(entry.template), entry);
      if(!exists(templatePath)) fail(`${context}: missing template file ${entry.template}`);
    }else fail(`${context}: template must be a non-empty string`);

    if(nonEmptyString(entry.example)){
      examplePaths.push(entry.example);
      const examplePath = path.join(docsDir, entry.example);
      if(entry.available && !exists(examplePath)) fail(`${context}: available template missing example ${entry.example}`);
      if(!entry.available && exists(examplePath)) warn(`${context}: unavailable template already has an example page ${entry.example}`);
    }else fail(`${context}: example must be a non-empty string`);
  });

  findRepeated(codes).forEach(code => fail(`catalog: duplicate code ${code}`));
  findRepeated(templatePaths).forEach(templatePath => fail(`catalog: duplicate template path ${templatePath}`));
  findRepeated(examplePaths).forEach(examplePath => fail(`catalog: duplicate example path ${examplePath}`));

  templateFiles.forEach(fileName => {
    const filePath = path.join(templatesDir, fileName);
    let template;
    try{ template = readJson(filePath); }
    catch(error){ fail(`${rel(filePath)} failed to parse: ${error.message}`); return; }
    const catalogEntry = templateByCatalogPath.get(path.normalize(`templates/${fileName}`));
    validateTemplateShape(template, filePath, catalogEntry);
  });
  note(`template files parsed: ${templateFiles.length}`);

  let builderHtml = "";
  try{ builderHtml = readText(builderPath); }
  catch(error){ fail(`Could not read ${rel(builderPath)}: ${error.message}`); }
  if(builderHtml){
    const dropdownValues = extractBuilderTemplateOptions(builderHtml);
    const templateMap = extractBuilderTemplateMap(builderHtml);
    if(!dropdownValues.length) fail("docs/builder.html: could not find template dropdown values");
    if(!templateMap.size) fail("docs/builder.html: could not find templateFiles map");
    dropdownValues.forEach(code => {
      if(!templateMap.has(code)) fail(`docs/builder.html: dropdown option ${code} is missing from templateFiles map`);
    });
    [...templateMap.entries()].forEach(([code, templatePath]) => {
      if(!dropdownValues.includes(code)) fail(`docs/builder.html: templateFiles entry ${code} is missing from dropdown`);
      if(!exists(path.join(docsDir, templatePath))) fail(`docs/builder.html: templateFiles entry ${code} points to missing file ${templatePath}`);
    });
    catalog.filter(entry => entry.available === true).forEach(entry => {
      if(!dropdownValues.includes(entry.code)) fail(`docs/builder.html: available catalogue template ${entry.code} is missing from dropdown`);
      if(templateMap.get(entry.code) !== entry.template) fail(`docs/builder.html: templateFiles path for ${entry.code} does not match catalogue (${templateMap.get(entry.code)} vs ${entry.template})`);
    });
    validateLocalHrefTargets(builderPath);
    note(`builder template options: ${dropdownValues.length}`);
  }

  let templatesPageHtml = "";
  try{ templatesPageHtml = readText(templatesPagePath); }
  catch(error){ fail(`Could not read ${rel(templatesPagePath)}: ${error.message}`); }
  if(templatesPageHtml){
    const buildCodes = extractTemplatePageBuildCodes(templatesPageHtml);
    const tryPaths = extractTemplatePageExamplePaths(templatesPageHtml);
    catalog.filter(entry => entry.available === true).forEach(entry => {
      if(!buildCodes.includes(entry.code)) fail(`docs/templates.html: missing Build with this link for ${entry.code}`);
      if(!tryPaths.includes(entry.example)) fail(`docs/templates.html: missing Try it link for ${entry.example}`);
    });
    validateLocalHrefTargets(templatesPagePath);
    note(`templates page build links: ${buildCodes.length}`);
  }

  let examplesReadme = "";
  try{ examplesReadme = readText(examplesReadmePath); }
  catch(error){ fail(`Could not read ${rel(examplesReadmePath)}: ${error.message}`); }
  if(examplesReadme){
    const readmeLinks = extractMarkdownHtmlLinks(examplesReadme);
    readmeLinks.forEach(link => {
      if(!exists(path.join(examplesDir, link))) fail(`docs/examples/README.md: missing linked example ${link}`);
    });
    catalog.filter(entry => entry.available === true).forEach(entry => {
      const basename = path.basename(entry.example);
      if(!readmeLinks.includes(basename)) fail(`docs/examples/README.md: missing example link ${basename}`);
    });
    note(`examples README links: ${readmeLinks.length}`);
  }

  catalog.filter(entry => entry.available === true).forEach(entry => {
    const templatePath = path.join(docsDir, entry.template);
    const examplePath = path.join(docsDir, entry.example);
    if(!exists(templatePath) || !exists(examplePath)) return;
    let template;
    try{ template = readJson(templatePath); }
    catch(_error){ return; }
    const expected = renderer.htmlFromProject(template);
    const current = readText(examplePath);
    if(current !== expected) fail(`${rel(examplePath)}: example page is out of date; run node tools/generate-examples.js`);
    if(!current.includes('id="spb-menu-config"')) fail(`${rel(examplePath)}: missing embedded config block`);
    validateLocalHrefTargets(examplePath);
  });

  // Check local links on the small public pages as well. Template/example pages are already checked above.
  ["index.html","why-start-page.html","ai-menu-help.html","github-pages.html","about.html","help.html"].forEach(fileName => {
    const filePath = path.join(docsDir, fileName);
    if(exists(filePath)) validateLocalHrefTargets(filePath);
  });

  if(warnings.length){
    console.log("Warnings:");
    warnings.forEach(message => console.log(`! ${message}`));
    console.log("");
  }
  if(errors.length){
    console.error("Validation failed:");
    errors.forEach(message => console.error(`✗ ${message}`));
    process.exitCode = 1;
    return;
  }

  notes.forEach(message => console.log(`✓ ${message}`));
  console.log("✓ catalogue/template/example consistency checked");
  console.log("✓ builder dropdown and template map checked");
  console.log("✓ public template links checked");
  console.log("✓ generated examples are up to date");
  console.log("\nValidation passed.");
}

main();

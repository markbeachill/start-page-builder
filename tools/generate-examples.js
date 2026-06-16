#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const renderer = require("../docs/assets/start-page-renderer.js");

const repoRoot = path.resolve(__dirname, "..");
const docsDir = path.join(repoRoot, "docs");
const catalogPath = path.join(docsDir, "templates", "catalog.json");

function usage(){
  console.log(`Usage: node tools/generate-examples.js [options]\n\nRegenerates standalone example pages from docs/templates/catalog.json and the shared renderer.\n\nOptions:\n  --check              Compare generated output with existing files, but do not write.\n  --template <code>    Generate or check one catalogue template code.\n  --all                Include unavailable catalogue entries. Default: available templates only.\n  --help               Show this help text.\n`);
}

function parseArgs(argv){
  const options = {check:false, template:null, includeUnavailable:false};
  for(let i = 0; i < argv.length; i += 1){
    const arg = argv[i];
    if(arg === "--check") options.check = true;
    else if(arg === "--all") options.includeUnavailable = true;
    else if(arg === "--template"){
      const value = argv[i + 1];
      if(!value || value.startsWith("--")) throw new Error("--template requires a template code");
      options.template = value;
      i += 1;
    }else if(arg.startsWith("--template=")){
      options.template = arg.slice("--template=".length);
      if(!options.template) throw new Error("--template requires a template code");
    }else if(arg === "--help" || arg === "-h"){
      options.help = true;
    }else{
      throw new Error(`Unknown option: ${arg}`);
    }
  }
  return options;
}

function readJson(filePath){
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function displayPath(filePath){
  return path.relative(repoRoot, filePath).split(path.sep).join("/");
}

function main(){
  const options = parseArgs(process.argv.slice(2));
  if(options.help){ usage(); return; }

  const catalog = readJson(catalogPath);
  if(!Array.isArray(catalog)) throw new Error("docs/templates/catalog.json must be a JSON array");

  let entries = catalog.filter(entry => options.includeUnavailable || entry.available === true);
  if(options.template){
    entries = entries.filter(entry => entry.code === options.template);
    if(entries.length === 0) throw new Error(`No catalogue entry found for template code: ${options.template}`);
  }

  let changed = 0;
  let unchanged = 0;
  const outOfDate = [];

  entries.forEach(entry => {
    if(!entry.template) throw new Error(`Catalogue entry ${entry.code || "(missing code)"} has no template path`);
    if(!entry.example) throw new Error(`Catalogue entry ${entry.code || "(missing code)"} has no example path`);

    const templatePath = path.join(docsDir, entry.template);
    const examplePath = path.join(docsDir, entry.example);
    const template = readJson(templatePath);
    const html = renderer.htmlFromProject(template);
    const current = fs.existsSync(examplePath) ? fs.readFileSync(examplePath, "utf8") : null;

    if(current === html){
      unchanged += 1;
      console.log(`✓ unchanged ${displayPath(examplePath)}`);
      return;
    }

    changed += 1;
    if(options.check){
      outOfDate.push(displayPath(examplePath));
      const status = current === null ? "missing" : "out of date";
      console.log(`✗ ${status} ${displayPath(examplePath)}`);
      return;
    }

    fs.mkdirSync(path.dirname(examplePath), {recursive:true});
    fs.writeFileSync(examplePath, html, "utf8");
    console.log(`✓ wrote ${displayPath(examplePath)}`);
  });

  if(options.check && outOfDate.length){
    console.error(`\n${outOfDate.length} example page${outOfDate.length === 1 ? " is" : "s are"} not up to date. Run: node tools/generate-examples.js`);
    process.exitCode = 1;
    return;
  }

  const action = options.check ? "checked" : "processed";
  console.log(`\n${action} ${entries.length} example page${entries.length === 1 ? "" : "s"}: ${changed} changed, ${unchanged} unchanged.`);
}

try{
  main();
}catch(error){
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}

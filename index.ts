import { build } from "astro";
import { readdirSync } from "node:fs";
import { readdir, mkdir, copyFile, rmdir } from "node:fs/promises";
import path from "node:path";

const createAstroBuild = async (mdx: string) => {
  const randString = Math.random().toString(36).substring(2, 15);
  try {
    const src = "./";
    const dest = path.resolve("/tmp", randString);
    await copyDirectory(src, dest);
    Bun.write(path.resolve("/tmp", randString, "src", "pages", "index.mdx"), mdx);
    const interval = setInterval(() => {
      try {
        const f = readdirSync(path.resolve('./', '.astro'))
        // this should never log
        console.log('\n\n******** .astro is created in project dir *********\n\n');
      } catch (e) {
      }
    }, 100);
    try {
      await build({
        root: path.resolve("/tmp", randString),
        outDir: path.resolve("/tmp", "dist", randString),
        mode: "production",
        cacheDir: path.resolve("/tmp", "cache", randString),
        vite: {
          cacheDir: path.resolve("/tmp", "cache", randString),
        },
      });
    } catch (e) {
      console.log(e);
    }
    clearInterval(interval);
    const res = (Bun.file(path.resolve("/tmp", "dist", randString, "index.html")));
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

createAstroBuild('<h1>Hello World</h1>');

async function copyDirectory(src: string, dest: string) {
  await mkdir(dest, { recursive: true });

  const entries = await readdir(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}
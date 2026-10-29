import { describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

describe("Brand Favicon & Web Manifest Suite", () => {
  const rootDir = path.resolve(".");

  it("32. index.html defines high-resolution favicon, vector svg and manifest links", () => {
    const htmlPath = path.join(rootDir, "index.html");
    assert.ok(fs.existsSync(htmlPath), "index.html must exist");
    const html = fs.readFileSync(htmlPath, "utf-8");

    assert.ok(html.includes('rel="icon" type="image/x-icon" href="/favicon.ico"'));
    assert.ok(html.includes('rel="icon" type="image/svg+xml" href="/favicon.svg"'));
    assert.ok(html.includes('rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"'));
    assert.ok(html.includes('rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"'));
    assert.ok(html.includes('rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"'));
    assert.ok(html.includes('rel="manifest" href="/site.webmanifest"'));
    assert.ok(html.includes('name="theme-color" content="#0E382B"'));
  });

  it("33. All favicon files exist in public/ for static Vite delivery", () => {
    const requiredFiles = [
      "public/favicon.ico",
      "public/favicon.svg",
      "public/favicon.png",
      "public/favicon-16x16.png",
      "public/favicon-32x32.png",
      "public/apple-touch-icon.png",
      "public/android-chrome-192x192.png",
      "public/android-chrome-512x512.png",
      "public/site.webmanifest",
    ];

    for (const relPath of requiredFiles) {
      const fullPath = path.join(rootDir, relPath);
      assert.ok(fs.existsSync(fullPath), `File ${relPath} must exist in public directory`);
      const stat = fs.statSync(fullPath);
      assert.ok(stat.size > 0, `File ${relPath} must not be empty`);
    }
  });

  it("34. site.webmanifest contains authentic Al-Nur brand metadata", () => {
    const manifestPath = path.join(rootDir, "public/site.webmanifest");
    const raw = fs.readFileSync(manifestPath, "utf-8");
    const manifest = JSON.parse(raw);

    assert.strictEqual(manifest.name, "Al-Nur Store");
    assert.strictEqual(manifest.short_name, "Al-Nur");
    assert.strictEqual(manifest.theme_color, "#0E382B");
    assert.strictEqual(manifest.icons.length, 2);
  });
});

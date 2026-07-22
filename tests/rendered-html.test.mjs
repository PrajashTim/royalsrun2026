import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);
const previewRoot = new URL("../app/_sites-preview/", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html", host: "localhost" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Royals Run landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Royals Run 2026 \| Run for a Cause<\/title>/i);
  assert.match(html, /Make every mile/);
  assert.match(html, /August 15, 2026/);
  assert.match(html, /Burke Lake Park/);
  assert.match(html, /10K/);
  assert.match(html, /5K/);
  assert.match(html, /1K/);
  assert.doesNotMatch(html, /codex-preview|Building your site|Your site is taking shape/i);
});

test("keeps the event details and secure registration handoff in the product", async () => {
  const [page, layout, packageJson, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /https:\/\/events\.elitefeats\.com\/26royals/);
  assert.match(page, /8:15 AM/);
  assert.match(page, /8:30 AM/);
  assert.match(page, /8:45 AM/);
  assert.match(page, /info\.royalsrun@gmail\.com/);
  assert.match(page, /RoyalsRunRegistrationIntent/);
  assert.match(page, /role="dialog"/);
  assert.match(layout, /metadataBase/);
  assert.match(layout, /og\.png/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(css, /--sun: #f6b81d/);
  assert.match(css, /\.registration-overlay/);

  await assert.rejects(access(new URL("SkeletonPreview.tsx", previewRoot)));
  await assert.rejects(access(new URL("preview.css", previewRoot)));
  await assert.rejects(access(new URL("public/_sites-preview", templateRoot)));
});

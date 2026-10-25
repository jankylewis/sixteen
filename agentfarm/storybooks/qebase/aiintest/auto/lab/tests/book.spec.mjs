import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect } from '@playwright/test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
let server;
let base;
test.beforeAll(async () => {
  server = http.createServer(async (request, response) => {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = resolve(root, '.' + path + (path.endsWith('/') ? 'index.html' : ''));
    if (!file.startsWith(root + sep)) { response.writeHead(403); response.end(); return; }
    try {
      const body = await readFile(file);
      response.setHeader('Content-Type', { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.ttf': 'font/ttf' }[extname(file)] ?? 'application/octet-stream');
      response.end(body);
    } catch { response.writeHead(404); response.end(); }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
test.afterAll(async () => { await new Promise((resolve) => { server.close(resolve); server.closeIdleConnections(); }); });

for (const width of [1280, 390]) {
  test(`reader preserves pixel styling, navigation, and keyboard disclosure at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.fonts.check('20px "Press Start 2P"'))).toBe(true);
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(35, 33, 54)');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#content')).toBeFocused();
    if (width > 700) expect(await page.evaluate(() => document.querySelector('h1').getBoundingClientRect().top >= document.querySelector('header').getBoundingClientRect().bottom)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath('home.png'), fullPage: true });
    await page.locator('article a[href="course/understand/INDEX.html"], article a[href="course/understand/index.html"]').click();
    await page.locator('article a[href="CHAPTER_01.html"]').click();
    for (let chapter = 1; chapter <= 21; chapter += 1) {
      await expect(page.locator('h1')).toContainText(String(chapter).padStart(2, '0') + ' —');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(await page.locator('pre').evaluateAll((blocks) => blocks.every((block) => block.scrollWidth <= block.clientWidth))).toBe(true);
      const summary = page.locator('summary');
      await summary.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('details')).toHaveAttribute('open', '');
      await page.keyboard.press('Enter');
      await expect(page.locator('details')).not.toHaveAttribute('open', '');
      if (chapter === 10) await page.screenshot({ path: testInfo.outputPath('chapter-10.png'), fullPage: true });
      if (chapter < 21) await page.locator('a[rel="next"]').click();
    }
    await page.locator('a[rel="prev"]').click();
    await expect(page.locator('h1')).toContainText('20 —');
    expect(errors).toEqual([]);
  });
}

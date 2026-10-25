import { test, expect } from '@playwright/test';
import { startLibrary } from '../app/server.mjs';

test('a duplicate warning also preserves exactly one stored reservation', async ({ page, request }) => {
  const app = await startLibrary();
  try {
    await page.goto(app.url);
    await page.getByLabel('Reader ID').fill('qe-browser');
    const reserve = page.getByRole('button', { name: 'Reserve The Test Garden', exact: true });
    await reserve.click();
    await expect(page.getByRole('status')).toHaveText('Reserved');
    await reserve.click();
    await expect(page.getByRole('status')).toHaveText('Duplicate reservation');
    const response = await request.get(`${app.url}/api/reservations`, { headers: { 'X-Reader': 'qe-browser' } });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual([{ id: 1, reader: 'qe-browser', book: 'book-1' }]);
    await expect(page.getByRole('button', { name: 'Reserve The Missing Moon', exact: true })).toBeDisabled();
  } finally { await app.close(); }
});

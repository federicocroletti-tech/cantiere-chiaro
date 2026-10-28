const { test, expect } = require('@playwright/test');

test('la landing page mostra il percorso e le fonti di supporto', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Cantiere Chiaro/i);
  await expect(page.getByRole('heading', { name: /Ristrutturare, con più/i })).toBeVisible();
  await expect(page.locator('#fonti')).toContainText('FONTI E VERIFICA');

  await page.getByRole('button', { name: /serve una mano\?/i }).click();
  await expect(page.locator('#sicurezza')).toBeVisible();
  await page.locator('#close-dialog').click();
  await expect(page.locator('#sicurezza')).not.toBeVisible();
});

test('la checklist aggiorna il progresso e il diario salva le note', async ({ page }) => {
  await page.goto('/');

  const firstTask = page.locator('[data-task="0"]');
  await firstTask.check();
  await expect(page.locator('#progress-value')).not.toHaveText('0');

  await page.locator('#diary-date').fill('2026-10-28');
  await page.locator('#diary-category').selectOption('decisione');
  await page.locator('#diary-title').fill('Scelta del fornitore');
  await page.locator('#diary-description').fill('Abbiamo concordato di richiedere tre preventivi e di verificare le referenze.');
  await page.locator('#diary-form button[type="submit"]').click();

  await expect(page.locator('#diary-count')).toContainText('1 nota');
  await expect(page.getByText('Scelta del fornitore')).toBeVisible();

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#export-diary').click()
  ]);
  await expect(download.suggestedFilename()).toMatch(/diario-lavori-/);
});

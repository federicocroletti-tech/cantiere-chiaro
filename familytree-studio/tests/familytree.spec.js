const { test, expect } = require('@playwright/test');

test('mostra l’albero di esempio e il profilo selezionato', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('FamilyTree Studio');
  await expect(page.getByRole('heading', { name: /La storia di famiglia/i })).toBeVisible();
  await expect(page.locator('#tree-count')).toHaveText('1 albero');
  await expect(page.locator('#people-list')).toContainText('Luca Rossi');
  await expect(page.locator('#person-detail')).toContainText('Luca Rossi');
  await expect(page.locator('#family-graph rect')).toHaveCount(5);
});

test('aggiunge una persona e permette di salvarne un backup', async ({ page }) => {
  await page.goto('/');
  await page.locator('#add-person-button').click();

  await page.locator('#person-form [name="firstName"]').fill('Elena');
  await page.locator('#person-form [name="lastName"]').fill('Rossi');
  await page.locator('#person-form [name="place"]').fill('Torino');
  await page.locator('#person-form button[type="submit"]').click();

  await expect(page.locator('#person-detail')).toContainText('Elena Rossi');
  await expect(page.locator('#people-list')).toContainText('Elena Rossi');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#export-button').click()
  ]);
  expect(download.suggestedFilename()).toMatch(/albero-famiglia-/);
});

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
  await page.locator('#person-form [name="photo"]').setInputFiles({
    name: 'elena.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>')
  });
  await page.locator('#person-form button[type="submit"]').click();

  await expect(page.locator('#person-detail')).toContainText('Elena Rossi');
  await expect(page.locator('#person-detail img.detail-photo')).toHaveAttribute('src', /^data:image\/svg\+xml;base64,/);
  await expect(page.locator('#people-list')).toContainText('Elena Rossi');

  await page.locator('[data-link-person]').click();
  await page.locator('#relation-form [name="otherPerson"]').selectOption('p1');
  await page.locator('#relation-form [name="type"]').selectOption('parentOf');
  await page.locator('#relation-form button[type="submit"]').click();
  await expect(page.locator('#family-graph .edge-line')).toHaveCount(8);

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#export-button').click()
  ]);
  expect(download.suggestedFilename()).toMatch(/albero-famiglia-/);
});

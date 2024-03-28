import { test, expect } from '@playwright/test';

test('Purchase flow', async ({ page }) => {
  await page.goto('https://roll-bits.reservamos-saas.com/');
  await page.getByPlaceholder('Buscar Origen').click();
  await page.locator('#txtorigin-desktop').press('CapsLock');
  await page.locator('#txtorigin-desktop').fill('ciudad de ');
  await page.locator('#txtorigin-desktop').press('CapsLock');
  await page.locator('#txtorigin-desktop').fill('ciudad de mexico');
  await page.getByText('Ciudad de México Auditorio').click();
  await page.locator('#txtdestination-desktop').click();
  await page.locator('#txtdestination-desktop').press('CapsLock');
  await page.locator('#txtdestination-desktop').fill('leon');
  await page.getByText('León Centro Max Hotsson Smart').click();
  await page.getByRole('row', { name: '25-Mar-24 26-Mar-24 27-Mar-24' }).getByLabel('29-Mar-').click();
  await page.getByRole('button', { name: 'search Buscar' }).click();
  await page.locator('.css-1kcqoud-D').first().click();
  await page.getByRole('button', { name: '9', exact: true }).click();
  await page.getByRole('button', { name: 'Continuar con 1 asiento' }).click();
  await page.getByPlaceholder('Nombre (s)').click();
  await page.getByPlaceholder('Nombre (s)').press('CapsLock');
  await page.getByPlaceholder('Nombre (s)').fill('Melissa');
  await page.getByPlaceholder('Apellido Paterno').click();
  await page.getByPlaceholder('Apellido Paterno').press('CapsLock');
  await page.getByPlaceholder('Apellido Paterno').fill('Ramirez');
  await page.getByPlaceholder('Correo electrónico').click();
  await page.getByPlaceholder('Correo electrónico').fill('melissa@reservamos.com');
  await page.getByRole('button', { name: 'Siguiente' }).click();
});
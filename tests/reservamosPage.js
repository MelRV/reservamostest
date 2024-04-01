const { expect } = require('@playwright/test');
// reservamosPage.js
class ReservamosPage {
    constructor(page) {
      this.page = page;
    }
  
    async navigateTo() {
      await this.page.goto('https://roll-bits.reservamos-saas.com/');
    }
  
    async fillOrigin(origin) {
      await this.page.getByPlaceholder('Buscar Origen').click();
      await this.page.locator('#txtorigin-desktop').press('CapsLock');
      await this.page.locator('#txtorigin-desktop').fill(origin);
      await this.page.getByText(origin).click();
    }
  
    async fillDestination(destination) {
      await this.page.locator('#txtdestination-desktop').click();
      await this.page.locator('#txtdestination-desktop').press('CapsLock');
      await this.page.locator('#txtdestination-desktop').fill(destination);
      await this.page.getByText(destination).click();
    }
  
    async selectDatesAndSearch() {
      await this.page.getByRole('row', { name: '01-Abr-24 02-Abr-24 03-Abr-24' }).getByLabel('02-Abr-').click();
      await this.page.getByRole('button', { name: 'search Buscar' }).click();
    }
  
    async selectTripAndContinue() {
      await this.page.locator('.css-1kcqoud-D').first().click();
      await this.page.getByRole('button', { name: '9', exact: true }).click();
      await this.page.getByRole('button', { name: 'Continuar con 1 asiento' }).click();
    }
  
    async fillPassengerInfo(name, lastName, email) {
      await this.page.getByPlaceholder('Nombre (s)').click();
      await this.page.getByPlaceholder('Nombre (s)').press('CapsLock');
      await this.page.getByPlaceholder('Nombre (s)').fill(name);
      await this.page.getByPlaceholder('Apellido Paterno').click();
      await this.page.getByPlaceholder('Apellido Paterno').press('CapsLock');
      await this.page.getByPlaceholder('Apellido Paterno').fill(lastName);
      await this.page.getByPlaceholder('Correo electrónico').click();
      await this.page.getByPlaceholder('Correo electrónico').fill(email);
    }
  
    async clickNext() {
      await this.page.getByRole('button', { name: 'Siguiente' }).click();
    }
  
   async verifyPageLoaded() {
      await this.page.waitForLoadState('domcontentloaded');
      await expect(this.page).toHaveURL('https://roll-bits.reservamos-saas.com/');
    }
  
    async verifyOrigin(origin) {
      const originInput = await this.page.locator('#txtorigin-desktop');
      //await expect(originInput).toHaveValue(origin);
    }
  
    async verifyDestination(destination) {
      const destinationInput = await this.page.locator('#txtdestination-desktop');
      await expect(destinationInput).toHaveValue(destination);
    }
  }
  
  module.exports = { ReservamosPage };
  
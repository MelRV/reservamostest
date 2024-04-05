const { expect } = require('@playwright/test');

class ReservamosPage {
    constructor(page) {
      this.page = page;
    }
  
    //Navegamos a la página 
    async navigateTo() {
      await this.page.goto('https://roll-bits.reservamos-saas.com/');
    }
  
    //Ahora agregaremos el origen
    async fillOrigin(origin) {
      await this.page.getByPlaceholder('Buscar Origen').click();
      await this.page.locator('#txtorigin-desktop').press('CapsLock');
      await this.page.locator('#txtorigin-desktop').fill(origin);
      await this.page.getByText(origin).click();
    }
  
    //Y por acá agregamos el destino 
    async fillDestination(destination) {
      await this.page.locator('#txtdestination-desktop').click();
      await this.page.locator('#txtdestination-desktop').press('CapsLock');
      await this.page.locator('#txtdestination-desktop').fill(destination);
      await this.page.getByText(destination).click();
    }
  
    //Seleccionamos la fecha de salida
    async selectDatesAndSearch() {
      await this.page.getByRole('row', { name: '08-Abr-24 09-Abr-24' }).getByLabel('12-Abr-').click();
      await this.page.getByRole('button', { name: 'search Buscar' }).click();
    }
  
    //En esta parte seleccionamos el numero del asiento que queremos
    async selectTripAndContinue() {
      await this.page.locator('.css-1kcqoud-D').first().click();
      await this.page.click('button.seat-available')
      await this.page.getByRole('button', { name: 'Continuar con 1 asiento' }).click();
    }
  
    //Agregamos los datos del pasajero como nombre,apellido y mail
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
  
   //Verificamos que la página este cargando correctamente
    async verifyPageLoaded() {
      await this.page.waitForLoadState('domcontentloaded');
      await expect(this.page).toHaveURL('https://roll-bits.reservamos-saas.com/');
    }
  
    //Verificamos que el origen coincida con el locator
    async verifyOrigin(origin) {
      const originInput = await this.page.locator('#txtorigin-desktop');
    }
  
    //Y del mismo modo con el destino
    async verifyDestination(destination) {
      const destinationInput = await this.page.locator('#txtdestination-desktop');
      await expect(destinationInput).toHaveValue(destination);
    }

    async fillCustomerInfo() {
      await this.page.waitForURL("**/checkout", {timeout: 60000});
      await expect(this.page.getByText('Usar datos del primer pasajero')).toBeVisible();
      await this.page.locator('label:has-text("Usar datos del primer pasajero")').click({ timeout: 60000, force: true });
      await this.page.getByPlaceholder('WhatsApp').click();
      await this.page.getByPlaceholder('WhatsApp').fill('5530129538');
      await this.page.frameLocator('iframe[title="Iframe del número de tarjeta asegurada"]').getByPlaceholder('5678 9012 3456').fill('2222 4000 7000 0005');
      await this.page.locator('span').filter({ hasText: '<p>Your browser does not' }).nth(1).click();
      await this.page.frameLocator('iframe[title="Iframe de la fecha de caducidad de la tarjeta asegurada"]').getByPlaceholder('MM/AA').click();
      await this.page.frameLocator('iframe[title="Iframe de la fecha de caducidad de la tarjeta asegurada"]').getByPlaceholder('MM/AA').fill('03/30');
      await this.page.frameLocator('iframe[title="Iframe del código de seguridad de la tarjeta asegurada"]').getByPlaceholder('3 dígitos').click();
      await this.page.frameLocator('iframe[title="Iframe del código de seguridad de la tarjeta asegurada"]').getByPlaceholder('3 dígitos').fill('737');
      await this.page.getByPlaceholder('Juan Pérez').click();
      await this.page.getByPlaceholder('Juan Pérez').press('CapsLock');
      await this.page.getByPlaceholder('Juan Pérez').fill('Melissa ');
      await this.page.getByPlaceholder('Juan Pérez').press('CapsLock');
      await this.page.getByPlaceholder('Juan Pérez').fill('Melissa Ramirez');
      await this.page.getByRole('button', { name: 'Finalizar compra por $367.40' }).click();
    }
    async checkPurchaseCompletion(){
      await this.page.waitForURL("**/complete", {timeout: 60000});
      await expect(this.page.locator('.complete-header-overlay')).toBeVisible();
    }
  }
  
  module.exports = { ReservamosPage };
  
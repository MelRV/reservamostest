const { test } = require('@playwright/test');
const { ReservamosPage } = require('./reservamosPage');

test('Purchase flow', async ({ page }) => {
  const reservamosPage = new ReservamosPage(page);

  await reservamosPage.navigateTo();
  //await reservamosPage.verifyPageLoaded();

  const origin = 'Ciudad de México Auditorio';
  await reservamosPage.fillOrigin(origin);
  await reservamosPage.verifyOrigin(origin);

  const destination = 'León Centro Max Hotsson Smart';
  await reservamosPage.fillDestination(destination);
  await reservamosPage.verifyDestination(destination);

  await reservamosPage.selectDatesAndSearch();
  await reservamosPage.selectTripAndContinue();

  const passengerName = 'Melissa';
  const passengerLastName = 'Ramirez';
  const passengerEmail = 'melissa@reservamos.com';
  await reservamosPage.fillPassengerInfo(passengerName, passengerLastName, passengerEmail);

  await reservamosPage.clickNext();
});

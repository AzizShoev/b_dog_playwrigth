import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { TelegramPage } from '../pages/telegram.page';

test.use({
  storageState: 'LoginAuth.json'
});

test('test2', async ({ page }) => {
  test.setTimeout(160000) 

  const tg  = new TelegramPage (page);
  //const home  = new HomePage (page);

  await page.goto('https://web.telegram.org/a/#7323068154');
  await page.waitForTimeout(3000);
///tg.play()
await page.waitForTimeout(5000);
///home.close()
await page.waitForTimeout(5000);
tg.writeMessage('/start')
await page.waitForTimeout(5000);
tg.sendMessage()
await page.waitForTimeout(5000);
tg.pressQaPanel()
await page.waitForTimeout(5000);
tg.pressRefresh()
await page.waitForTimeout(3000);
tg.pressMainMenu()
await page.waitForTimeout(3000);




  // await page.getByLabel('Message', { exact: true }).click();
  // await page.getByLabel('Open bot command keyboard').click();
  // await page.frameLocator('iframe[title="QAlaksmzxcghoul123asd Web App"]').getByRole('button', { name: 'close' }).click();

//   const availableEnergy = await homePage.getAvailableEnergy();
//   console.log('Available Energy:', availableEnergy);


//  const balance = await homePage.getBalance();
//  console.log('balance balance:', balance);


//  const getEarnPerTap = await homePage.getEarnPerTap();
//  console.log('getEarnPerTap getEarnPerTap:', getEarnPerTap);


//  const getEnergyLimit = await homePage.getEnergyLimit();
//  console.log('getEnergyLimit getEnergyLimit:', getEnergyLimit);

//  const getPawsToLevelUp = await homePage.getPawsToLevelUp();
//  console.log('getPawsToLevelUp getPawsToLevelUp:', getPawsToLevelUp);


//  const getProfitPerHour = await homePage.getProfitPerHour();
//  console.log('getProfitPerHour getProfitPerHour:', getProfitPerHour);

});

 
 
 


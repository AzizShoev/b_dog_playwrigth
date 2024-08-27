import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { TelegramPage } from '../../pages/telegram.page';
import { NavigationMenu } from '../../pages/navigation.page';
import { FriendsPage } from '../../pages/friends.page';
import { assert } from 'console';
import exp from 'constants';
import { BoostsPage } from '../../pages/boosts.page';
import { before } from 'node:test';

test.use({
    storageState: 'LoginAuth2.json'
  });
  test.beforeEach(async ({ page }) => {
    const tg  = new TelegramPage (page);
    await page.goto('https://web.telegram.org/a/#7250553721');
    await page.waitForTimeout(8000);
    await tg.checkErrorMessage();
    await refresh(page, '/start');
  })

test('Up balance', async ({ page }) => {
    test.setTimeout(160000) 

  const tg  = new TelegramPage (page);
  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);

  const id = "6809402010"
  const amount = "10000";

  await tg.pressPlay();
  await tg.pressConfirm();
  await expect(home.currentBalance).toHaveText("0");
  await nav.closeButton.click();
  await tg.topUp(id, amount);
  await page.waitForTimeout(2000);
  await checkTopUpMessage(page,"Your balance has been topped up by 10000");
  await tg.pressPlay();
  await page.waitForTimeout(3000);
  await expect(home.currentBalance).toHaveText('10,000');
  await page.waitForTimeout(1000);
});

test('Buy Multitap', async ({ page }) => {
  test.setTimeout(160000) 

  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);
  const tg  = new TelegramPage (page);
  const boost = new BoostsPage (page);

  const id = "6809402010"
  const amount = "10000";

  await tg.topUp(id, amount);
  await tg.pressPlay();
  await tg.pressConfirm();
  await expect(home.currentBalance).toContainText("10,000"); 
  await expect(home.earnPerTap).toContainText("1");
  await home.goBoost();
  await expect(boost.buyMultitapButton).toContainText('1,024');
  await expect(boost.multitapLevel).toContainText('level 1');
  await boost.buyMultitap();
  await boost.buy();
  await expect(boost.buyMultitapButton).toContainText('2,048');
  await expect(boost.multitapLevel).toContainText('level 2');
  await expect(boost.currentBalance).toHaveText("8,976");
  await nav.goHome();
  await expect(home.currentBalance).toContainText("8,976");
  await expect(home.earnPerTap).toContainText("2");
  await home.mine();
  await expect(home.currentBalance).toContainText("8,978");
});

test('Buy Energy', async ({ page }) => {
  test.setTimeout(160000) 

  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);
  const tg  = new TelegramPage (page);
  const boost = new BoostsPage (page);

  const id = "6809402010"
  const amount = "10000";

  await tg.topUp(id, amount);
  await tg.pressPlay();
  await tg.pressConfirm();
  await expect(home.currentBalance).toContainText("10,000");
  await expect(home.getAvailableEnergy()).toEqual('1000')
  await expect(home.getEnergyLimit()).toEqual("500");
  await home.goBoost();
  await expect(boost.buyEnergyButton).toContainText('1,024');
  await expect(boost.energyLevel).toContainText('level 1');
  await boost.buyMultitap();
  await boost.buy();
  await expect(boost.buyEnergyButton).toContainText('2,048');
  await expect(boost.energyLevel).toContainText('level 2');
  await expect(boost.currentBalance).toHaveText("8,976");
  await nav.goHome();
  await expect(home.currentBalance).toContainText("8,976");
  await expect(home.getAvailableEnergy()).toContain("1500")
  await expect(home.getEnergyLimit()).toContain("1500");
  await home.mine();
  await expect(home.getAvailableEnergy()).toContain("1498");
  await expect(home.getEnergyLimit()).toContain("1500");
  await expect(home.currentBalance).toContainText("7,956");
  await nav.closeApp();
  await refresh(page, '/start');
});

async function checkTopUpMessage(page: Page, message: string) {
   await expect (page.locator('(//div[contains(@class, "message-content")])[last()-2]/div/div').first()).toContainText(message);
}    
 
 async function refresh(page: Page, start: string) {
  const tg  = new TelegramPage(page);
  await tg.writeMessage(start);
  await tg.sendMessage();
  await tg.pressQaPanel();
  await tg.pressRefresh();
  await expect (page.locator('(//div[contains(@class, "message-content")])[last()]/div/div').first()).toContainText("Account was refreshed");
}
import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { TelegramPage } from '../../pages/telegram.page';
import { NavigationMenu } from '../../pages/navigation.page';
import { FriendsPage } from '../../pages/friends.page';
import { assert } from 'console';
import exp from 'constants';
import { BoostsPage } from '../../pages/boosts.page';
import { before } from 'node:test';
import { Fixtures } from '@playwright/test';
import { TestHelper } from '../../helpers/helper';

test.setTimeout(160000) 

test.use({
    storageState: 'LoginAuth2.json'
  });
  
test.beforeEach(async ({ page }) => {
    const tg  = new TelegramPage (page);
    const help = new TestHelper(page);
    await page.goto('https://web.telegram.org/a/#7250553721');
    await page.waitForTimeout(8000);
    await tg.checkErrorMessage();
    await help.refresh();
  });

test('Up balance', async ({ page }) => {
    test.setTimeout(160000) 

  const tg  = new TelegramPage (page);
  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);
  const help = new TestHelper(page);

  const id = "6809402010"
  const amount = "10000";

  await tg.pressPlay();
  await tg.pressConfirm();
  await page.waitForTimeout(3000);

  await expect(home.currentBalance).toHaveText("0");
  await nav.closeButton.click();
  await tg.topUp(id, amount);
  await page.waitForTimeout(2000);
  await help.checkPreLastTgMessage('Your balance has been topped up by 10000' );
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
  await page.waitForTimeout(3000)

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
  await page.waitForTimeout(3000)

  await expect(home.currentBalance).toContainText("10,000");
  await expect(await home.getAvailableEnergy()).toEqual(1000)
  await expect(await home.getEnergyLimit()).toEqual(1000);
  await home.goBoost();
  await expect(boost.buyEnergyButton).toContainText('1,024');
  await expect(boost.energyLevel).toContainText('level 1');
  await boost.buyEnergy();
  await boost.buy();
  await expect(boost.buyEnergyButton).toContainText('2,048');
  await expect(boost.energyLevel).toContainText('level 2');
  await expect(boost.currentBalance).toHaveText("8,976");
  await nav.goHome();
  await expect(home.currentBalance).toContainText("8,976");
  await page.waitForTimeout(5000)
  await expect(await home.getAvailableEnergy()).toBeGreaterThan(1000)
  await expect(await home.getEnergyLimit()).toEqual(1500);
  await home.mine();
  await expect(await home.getAvailableEnergy()).toBeLessThan(1500);
  await expect(await home.getEnergyLimit()).toEqual(1500);
  await expect(home.currentBalance).toContainText("8,977");
});

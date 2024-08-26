import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { TelegramPage } from '../../pages/telegram.page';
import { NavigationMenu } from '../../pages/navigation.page';
import { FriendsPage } from '../../pages/friends.page';
import { assert } from 'console';
import exp from 'constants';
import { BoostsPage } from '../../pages/boosts.page';

test.use({
    storageState: 'LoginAuth2.json'
  });

test('topUp', async ({ page }) => {
    test.setTimeout(160000) 

  const tg  = new TelegramPage (page);
  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);

  const id = "6809402010"
  const amount = "10000";

  await page.goto('https://web.telegram.org/a/#7250553721');
  await page.waitForTimeout(5000);
  await tg.checkErrrorMessage();
  await tg.pressRefresh()
  await tg.pressPlay()
  await page.waitForTimeout(3000);
  await tg.pressConfirm()
  await page.waitForTimeout(7000);
  //home.obtainReward()
  //await page.waitForTimeout(2000);
  await expect(home.currentBalance).toHaveText("0");;
  await nav.closeButton.click();
  await tg.topUp(id, amount)
  await tg.sendMessage()
  await page.waitForTimeout(2000);
  await expect (page.locator('(//div[contains(@class, "message-content")])[last()-2]/div/div').first()).toContainText("Your balance has been topped up by 10000")
  await tg.pressPlay()
  await page.waitForTimeout(3000);
  await expect(home.currentBalance).toHaveText('10,000');
  
  await home.close()
});

test('Buy Multitap', async ({ page }) => {
  test.setTimeout(160000) 

  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);
  const tg  = new TelegramPage (page);
  const boost = new BoostsPage (page);

  await page.goto('https://web.telegram.org/a/#7250553721');
  await page.waitForTimeout(5000);
  await tg.checkErrrorMessage();
  await tg.pressPlay();
  await tg.pressConfirm();
  await expect (home.currentBalance).toContainText("10,000");
  await expect(home.earnPerTap).toContainText("1");
  await home.goBoost();
  await expect(boost.buyMultitapButton).toContainText('1,024');
  await boost.buyMultitap();
  await boost.buy();
  await expect(boost.buyMultitapButton).toContainText('2,048');
  assert(boost.getMultitapLevel(), "Level 2");
  await expect(home.currentBalance).toHaveText("8,976");
  await nav.goHome();
  assert(home.getBalance(), "8,976");
  assert( home.getEarnPerTap(), "2");
  await home.mine();
  assert(home.getBalance(), "8,978");
  await nav.closeApp();
});

test('Buy Energy', async ({ page }) => {
  test.setTimeout(160000) 

  const home  = new HomePage (page);






;await assert(home.getEnergyLimit().toString(),'1500')
});
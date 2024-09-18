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
  const tg  = new TelegramPage (page);
  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);
  const help = new TestHelper(page);

  await tg.topUp('6809402010', '10000');
  await page.waitForTimeout(2000);
  await help.checkPreLastTgMessage('Your balance has been topped up by 10000' );
  await help.openApp();
  try {
    await expect(home.currentBalance).toHaveText('10,000');
  } catch (error) {
    throw new Error('Balance is not as expected');
  }
});

test('Buy Multitap', async ({ page }) => { 
  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);
  const tg  = new TelegramPage (page);
  const boost = new BoostsPage (page);
  const help = new TestHelper(page);

  await tg.topUp('6809402010', '10000');
  await help.openApp();
  await home.goBoost();
  await boost.buyMultitap();
  await boost.buy();
  await nav.goHome();
  await page.waitForTimeout(2000);
  try {
    expect(await home.getEarnPerTap()).toEqual(2);
  } catch (error) {
    throw new Error('Earn per tap is not as expected');
  }
});

test ('Use Multitap', async ({ page }) => {
  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);
  const tg  = new TelegramPage (page);
  const boost = new BoostsPage (page);
  const help = new TestHelper(page);

  await tg.topUp('6809402010', '10000');
  await help.openApp();
  await home.goBoost();
  await boost.buyMultitap();
  await boost.buy();
  await nav.goHome();
  await page.waitForTimeout(1000);
  await home.mine();
  await page.waitForTimeout(1500);
  try {
    expect(await home.getBalance()).toEqual(8978);
  } catch (error) {
    throw new Error('Balance after use multitap is not as expected');
  }
});

test('Buy Energy', async ({ page }) => {
  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);
  const tg  = new TelegramPage (page);
  const boost = new BoostsPage (page);
  const help = new TestHelper(page);

  await tg.topUp('6809402010', '10000');
  await help.openApp();
  await home.goBoost();
  await boost.buyEnergy();
  await boost.buy();
  await nav.goHome();
  await page.waitForTimeout(5000)
  try {
    expect.soft(await home.getAvailableEnergy()).toBeGreaterThan(1000)
    
  } catch (error) {
    throw new Error('Available energy is not as expected');
  }
  try {
    expect.soft(await home.getEnergyLimit()).toEqual(1500);
  } catch (error) {
    throw new Error('Energy limit is not as expected');
  }
  
});

test ('Buy multitap whit zero balance', async ({ page }) => {
  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);
  const tg  = new TelegramPage (page);
  const boost = new BoostsPage (page);
  const help = new TestHelper(page);

  await help.openApp();
  await home.goBoost();
  await boost.buyMultitap();
  try {
    expect(await boost.getLowBalanceSing()).toContain('Need 1024');
  } catch (error) {
    throw new Error('Low balance sing is not as expected');
  }
});

test ('Buy energy whit zero balance', async ({ page }) => {
  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);
  const tg  = new TelegramPage (page);
  const boost = new BoostsPage (page);
  const help = new TestHelper(page);

  await help.openApp();
  await home.goBoost();
  await boost.buyEnergy();
  try {
    expect(await boost.getLowBalanceSing()).toContain('Need 1024');
  } catch (error) {
    throw new Error('Low balance sing is not as expected');
  }
});

test ('Buy Multitap with insufficient balance', async ({ page }) => {
  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);
  const tg  = new TelegramPage (page);
  const boost = new BoostsPage (page);
  const help = new TestHelper(page);

  await tg.topUp('6809402010', '2000')
  await help.openApp();
  await home.goBoost();
  await boost.buyMultitap();
  await boost.buy();
  await page.waitForTimeout(1500)
  await boost.buyMultitap();
  try {
    expect(await boost.getLowBalanceSing()).toContain('Need 1072');
  } catch (error) {
    throw new Error('Low balance sing is not as expected');
  }
  
});

test ('Buy Energy Limit with insufficient balance', async ({ page }) => {
  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);
  const tg  = new TelegramPage (page);
  const boost = new BoostsPage (page);
  const help = new TestHelper(page);

  await tg.topUp('6809402010', '2000')
  await help.openApp();
  await home.goBoost();
  await boost.buyEnergy();
  await boost.buy();
  await page.waitForTimeout(1500)
  await boost.buyEnergy();
  try {
    expect(await boost.getLowBalanceSing()).toContain('Need 1072');
  } catch (error) {
    throw new Error('Low balance sing is not as expected');
  }
  
});

test ('Change multitap level 1 to level 2', async ({ page }) => {
  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);
  const tg  = new TelegramPage (page);
  const boost = new BoostsPage (page);
  const help = new TestHelper(page);

  await tg.topUp('6809402010', '2000')
  await help.openApp();
  await home.goBoost();
  await boost.buyMultitap();
  await boost.buy();
  await page.waitForTimeout(2000)
  try {
    expect(await boost.getMultitapLevel()).toContain('Level 2');
  } catch (error) {
    throw new Error('Level is not as expected');
  }
})

test ('Change energy level 1 to level 2', async ({ page }) => {
  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);
  const tg  = new TelegramPage (page);
  const boost = new BoostsPage (page);
  const help = new TestHelper(page);

  await tg.topUp('6809402010', '2000')
  await help.openApp();
  await home.goBoost();
  await boost.buyEnergy();
  await boost.buy();
  await page.waitForTimeout(2000)
  try {
    expect(await boost.getEnergyLevel()).toContain('Level 2');
  } catch (error) {
    throw new Error('Level is not as expected');
  }
})

test ('Change multitap price after buy', async ({ page }) => {
  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);
  const tg  = new TelegramPage (page);
  const boost = new BoostsPage (page);
  const help = new TestHelper(page);

  await tg.topUp('6809402010', '2000')
  await help.openApp();
  await home.goBoost();
  await boost.buyMultitap();
  await boost.buy();
  await page.waitForTimeout(2000)
  try {
    expect(await boost.getMultitapPrice()).toEqual(2048);
  } catch (error) {
    throw new Error('Price is not as expected');
  }
});

test ('Change energy price after buy', async ({ page }) => {
  const home  = new HomePage (page);
  const nav  = new NavigationMenu (page);
  const tg  = new TelegramPage (page);
  const boost = new BoostsPage (page);
  const help = new TestHelper(page);

  await tg.topUp('6809402010', '2000')
  await help.openApp();
  await home.goBoost();
  await boost.buyEnergy();
  await boost.buy();
  await page.waitForTimeout(2000)
  try {
    expect(await boost.getEnergyPrice()).toEqual(2048);
  } catch (error) {
    throw new Error('Price is not as expected');
  }
});
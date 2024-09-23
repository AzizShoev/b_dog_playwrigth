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
import { EarnPage } from '../../pages/earn.page';

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
  expect.soft(await help.checkPreLastTgMessage()).toMatch('Your balance has been topped up by 10000')
  expect.soft(await help.checkLastTgMessage()).toMatch('Balance topped up')
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
  await help.buyMulitap();
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
  await help.buyMulitap();
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
  await help.buyEnergy();
  await nav.goHome();
  await page.waitForTimeout(5000)
  try {
    console.log('Availible energy: ' + await home.getAvailableEnergy())
    expect.soft(await home.getAvailableEnergy()).toEqual(1021)
    
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
  const earn = new EarnPage(page);

  await help.openApp();
  await nav.goEarn();
  await earn.goBoosters();
  await boost.goBoostersTab();
  await boost.buyMultitap();
  try {
    expect.soft(await boost.getLowBalanceSing()).toContain('Need 1024');
    await expect.soft(boost.lowBalanceSing).toBeDisabled();
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
  const earn = new EarnPage(page);

  await help.openApp();
  await nav.goEarn();
  await earn.goBoosters();
  await boost.goBoostersTab();
  await boost.buyEnergy();
  try {
    expect.soft(await boost.getLowBalanceSing()).toContain('Need 1024');
    await expect.soft(boost.lowBalanceSing).toBeDisabled();
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
  await help.buyMulitap();
  await boost.buyMultitap();
  try {
    expect.soft(await boost.getLowBalanceSing()).toContain('Need 1072');
    await expect.soft(boost.lowBalanceSing).toBeDisabled();
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
  await help.buyEnergy();
  await boost.buyEnergy();
  try {
    expect.soft(await boost.getLowBalanceSing()).toContain('Need 1072');
    await expect.soft(boost.lowBalanceSing).toBeDisabled();
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
  await help.buyMulitap();
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
  await help.buyEnergy();
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
  await help.buyMulitap();
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
  await help.buyEnergy();
  try {
    expect(await boost.getEnergyPrice()).toEqual(2048);
  } catch (error) {
    throw new Error('Price is not as expected');
  }
});

test ('Use full energy daily booster ', async ({ page }) => {
  const tg  = new TelegramPage (page);
  const boost = new BoostsPage (page);
  const help = new TestHelper(page);
  const nav  = new NavigationMenu (page);
  const earn = new EarnPage (page);
  const home  = new HomePage (page);

  await tg.topUp('6809402010', '300000')
  await help.openApp();
  await help.mineTap(625)
  await nav.goEarn();
  await earn.goBoosters();
  await boost.fullEnergyGetButton.click();
  await boost.useFreeBoostButton.click();
  await nav.goBack();
  await page.waitForTimeout(1000)
  console.log('Availible energy: ' + await home.getAvailableEnergy());
  try {
    expect(await home.getAvailableEnergy()).toEqual(2500);
  } catch (error) {
    new Error('Availible energy is not as expected');
  }
});

test ('Use full energy daily booster second time', async ({ page }) => {
  const tg  = new TelegramPage (page);
  const boost = new BoostsPage (page);
  const help = new TestHelper(page);
  const nav  = new NavigationMenu (page);
  const earn = new EarnPage (page);
  const home  = new HomePage (page);

  await tg.topUp('6809402010', '300000')
  await help.openApp();
  await nav.goEarn();
  await earn.goBoosters();
  await boost.fullEnergyGetButton.click();
  await boost.useFreeBoostButton.click();
  await page.waitForTimeout(1000);
    try {
      expect.soft(await boost.fullEnergyGetButton.isDisabled()).toBeTruthy();
    } catch (error) {
      new Error('Get button is active');
    }
  await boost.fullEnergyBoost.click();
  try {
    expect.soft(await boost.useFreeBoostButton.isDisabled()).toBeTruthy();
    expect.soft(await boost.dailyTaskLvl1.locator('div:nth-child(3)')).toHaveText('0/1 full energy');
  } catch (error) {
    new Error('Use free energy button is active or first task is not as expected');
  }
  });
import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { TelegramPage } from '../../pages/telegram.page';
import { TestHelper } from '../../helpers/helper';
import { RatingPage } from '../../pages/rating.page';
import { NavigationMenu } from '../../pages/navigation.page';
import { BoostsPage } from '../../pages/boosts.page';
import { EarnPage } from '../../pages/earn.page';
import { EarnHelper } from '../../helpers/earn.helper';
import exp from 'constants';

test.use({
    storageState: 'LoginAuth2.json'
  });

  test.setTimeout(200000);

test.beforeEach(async ({ page }) => {
    const tg = new TelegramPage(page);
    const help = new TestHelper(page);
    await page.goto('https://web.telegram.org/a/#7250553721');
    await page.waitForTimeout(8000);
    await tg.checkErrorMessage();
    await help.refresh();
});

test ('Buy card', async ({ page }) => {
    const tg  = new TelegramPage (page);
    const earn = new EarnPage (page);
    const nav = new NavigationMenu (page);
    const earnHelp = new EarnHelper(page);
    const home = new HomePage (page);

    tg.topUp('6809402010', '10000');
    tg.pressPlay();
    tg.pressConfirm();
    await page.waitForTimeout(5000);
    expect(await home.getBalance()).toEqual(10000);
    await nav.goEarn();
    await (await earnHelp.checkCard(10)).click();
    expect(await earn.getCardNameModal()).toMatch('Staking');
    expect(await earn.getCurrentProfitModal()).toEqual(0);
    expect(await earn.getUpProfitModal()).toEqual(50);
    expect(await earn.getCostModal()).toEqual(await earn.getUpProfitModal()*10);
    await earn.buyCard();
    await nav.goBack();
    await page.waitForTimeout(3000);
    expect(await home.getBalance()).toEqual(10000 - (await home.getProfitPerHour()*10));
    expect(await home.getProfitPerHour()).toEqual(50);
});

test ('Upgrade card from level 1 to level 2', async ({ page }) => {
    const tg  = new TelegramPage (page);
    const earn = new EarnPage (page);
    const nav = new NavigationMenu (page);
    const earnHelp = new EarnHelper(page);
    const home = new HomePage (page);

    tg.topUp('6809402010', '10000');
    tg.pressPlay();
    tg.pressConfirm();
    await page.waitForTimeout(5000);
    expect(await home.getBalance()).toEqual(10000);
    await nav.goEarn();
    await (await earnHelp.checkCard(10)).click();
    expect(await earn.getCardNameModal()).toMatch('Staking');
    await earn.buyCard();
    expect(await earnHelp.checkCardLevel(10)).toMatch('Level 1');
    await (await earnHelp.checkCard(10)).click();
    expect(await earn.getCurrentProfitModal()).toEqual(50);
    expect(await earn.getUpProfitModal()).toEqual(53);
    expect(await earn.getCostModal()).toEqual(829);
    await earn.upgradeCard();
    await page.waitForTimeout(2000);
    expect(await earnHelp.checkCardLevel(10)).toMatch('Level 2');
    expect(await earnHelp.checkCardPrice(10)).toEqual(1379);
    await nav.goBack();
    expect(await home.getBalance()).toEqual(8671);
    expect(await home.getProfitPerHour()).toEqual(103);
});

test ('Buy card with insufficient balance', async ({ page }) => {
    const tg  = new TelegramPage (page);
    const earn = new EarnPage (page);
    const nav = new NavigationMenu (page);
    const earnHelp = new EarnHelper(page);
    const home = new HomePage (page);

    tg.topUp('6809402010', '10000');
    tg.pressPlay();
    tg.pressConfirm();
    await page.waitForTimeout(5000);
    expect(await home.getBalance()).toEqual(10000);
    await nav.goEarn();
    await (await earnHelp.checkCard(10)).click();
    expect(await earn.getCardNameModal()).toMatch('Staking');
    expect(await earn.getCurrentProfitModal()).toEqual(0);
    expect(await earn.getUpProfitModal()).toEqual(50);
    expect(await earn.getCostModal()).toEqual(await earn.getUpProfitModal()*10);
    await earn.buyCard();
    expect(await earn.getBalance()).toEqual(9500);
    expect(await earnHelp.checkCardLevel(10)).toMatch('Level 1');
    await(await earnHelp.checkCard(7)).click();
    expect(await earn.getLowBalanceSing()).toMatch('Need 500');
});

test ('Check profit per hour for 2 hour', async ({ page }) => {
    const tg  = new TelegramPage (page);
    const earn = new EarnPage (page);
    const nav = new NavigationMenu (page);
    const earnHelp = new EarnHelper(page);
    const home = new HomePage (page);
    const help = new TestHelper(page);

    await tg.topUp('6809402010', '10000');
    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    expect(await home.getBalance()).toEqual(10000);
    await nav.goEarn();
    await earn.pressWelfare();
    await (await earnHelp.checkCard(2)).click();
    expect(await earn.getCardNameModal()).toMatch('International Cooperation');
    expect(await earn.getCurrentProfitModal()).toEqual(0);
    expect(await earn.getUpProfitModal()).toEqual(200);
    expect(await earn.getCostModal()).toEqual(await earn.getUpProfitModal()*10);
    await earn.buyCard();
    await page.waitForTimeout(2000);
    expect(await earn.getBalance()).toEqual(8000);
    await nav.goBack();
    expect(await home.getBalance()).toEqual(8000);
    expect(await home.getProfitPerHour()).toEqual(200);
    await nav.closeApp();
    await help.upHour(2);
    tg.pressPlay();
    console.log('Current ballance - ' + await home.getBalance());
    expect(await home.getBalance()).toBeGreaterThanOrEqual(8400);
    expect(await home.getProfitPerHour()).toEqual(200);
});

test ('Check profit per hour for 3 hour', async ({ page }) => {
    const tg  = new TelegramPage (page);
    const earn = new EarnPage (page);
    const nav = new NavigationMenu (page);
    const earnHelp = new EarnHelper(page);
    const home = new HomePage (page);
    const help = new TestHelper(page);

    await tg.topUp('6809402010', '10000');
    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    expect(await home.getBalance()).toEqual(10000);
    await nav.goEarn();
    await (await earnHelp.checkCard(4)).click();
    expect(await earn.getCardNameModal()).toMatch('Security Expert Dog');
    expect(await earn.getCurrentProfitModal()).toEqual(0);
    expect(await earn.getUpProfitModal()).toEqual(900);
    expect(await earn.getCostModal()).toEqual(await earn.getUpProfitModal()*10);
    await earn.buyCard();
    await page.waitForTimeout(2000);
    expect(await earn.getBalance()).toEqual(1000);
    await nav.goBack();
    expect(await home.getBalance()).toEqual(1000);
    expect(await home.getProfitPerHour()).toEqual(900);
    await nav.closeApp();
    await help.upHour(3);
    tg.pressPlay();
    console.log('Current ballance - ' + await home.getBalance());
    expect(await home.getBalance()).toBeGreaterThanOrEqual(3700);
    expect(await home.getBalance()).toBeLessThanOrEqual(3750);
    expect(await home.getProfitPerHour()).toEqual(900);
});

test ('Check profit per hour for 12 hour', async ({ page }) => {
    const tg  = new TelegramPage (page);
    const earn = new EarnPage (page);
    const nav = new NavigationMenu (page);
    const earnHelp = new EarnHelper(page);
    const home = new HomePage (page);
    const help = new TestHelper(page);

    await tg.topUp('6809402010', '10000');
    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    expect(await home.getBalance()).toEqual(10000);
    await nav.goEarn();
    await (await earnHelp.checkCard(7)).click();
    expect(await earn.getCardNameModal()).toMatch('DeFi Farming');
    expect(await earn.getCurrentProfitModal()).toEqual(0);
    expect(await earn.getUpProfitModal()).toEqual(1000);
    expect(await earn.getCostModal()).toEqual(await earn.getUpProfitModal()*10);
    await earn.buyCard();
    await page.waitForTimeout(2000);
    expect(await earn.getBalance()).toEqual(0);
    await nav.goBack();
    expect(await home.getBalance()).toEqual(0);
    await expect(await home.profitPerHour).toHaveText('1K');
    await nav.closeApp();
    await help.upHour(12);
    tg.pressPlay();
    console.log('Current ballance - ' + await home.getBalance());
    expect(await home.getBalance()).toBeGreaterThanOrEqual(3000)
    expect(await home.getBalance()).toBeLessThanOrEqual(3150);
    await expect(await home.profitPerHour).toHaveText('1K');
});
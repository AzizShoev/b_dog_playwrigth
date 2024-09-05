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
import { throws } from 'assert';

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

    const cardName = await earnHelp.findCardByName('AI Trader');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(cardNumber)).click();
    expect(await earn.getCardNameModal()).toMatch('AI Trader');
    expect(await earn.getCurrentProfitModal()).toEqual(0);
    expect(await earn.getUpProfitModal()).toEqual(150);
    expect(await earn.getCostModal()).toEqual(await earn.getUpProfitModal()*10);
    await earn.buyCard();
    await nav.goBack();
    await page.waitForTimeout(3000);
    expect(await home.getBalance()).toEqual(10000 - (await home.getProfitPerHour()*10));
    expect(await home.getProfitPerHour()).toEqual(150);
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

    const cardName = await earnHelp.findCardByName('AI Trader');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(cardNumber)).click();
    expect(await earn.getCardNameModal()).toMatch('AI Trader');
    await earn.buyCard();
    expect(await earnHelp.checkCardLevel(cardNumber)).toMatch('Level 1');
    await (await earnHelp.checkCard(10)).click();
    expect(await earn.getCurrentProfitModal()).toEqual(150);
    expect(await earn.getUpProfitModal()).toEqual(160);
    expect(await earn.getCostModal()).toEqual(2486);
    await earn.upgradeCard();
    await page.waitForTimeout(2000);
    expect(await earnHelp.checkCardLevel(cardNumber)).toMatch('Level 2');
    expect(await earnHelp.checkCardPrice(cardNumber)).toEqual(4136);
    await nav.goBack();
    expect(await home.getBalance()).toEqual(6014);
    expect(await home.getProfitPerHour()).toEqual(310);
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

    const cardName = await earnHelp.findCardByName('AI Trader');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(cardNumber)).click();
    expect(await earn.getCardNameModal()).toMatch('AI Trader');
    expect(await earn.getCurrentProfitModal()).toEqual(0);
    expect(await earn.getUpProfitModal()).toEqual(150);
    expect(await earn.getCostModal()).toEqual(await earn.getUpProfitModal()*10);
    await earn.buyCard();
    await page.waitForTimeout(1500);
    expect(await earn.getBalance()).toEqual(8500);
    expect(await earnHelp.checkCardLevel(cardNumber)).toMatch('Level 1');

    const highCostCardName = await earnHelp.findCardByName('Cross Chain Bridge');
    const cardNum = highCostCardName as number
    await(await earnHelp.checkCard(cardNum)).click();
    expect(await earn.getLowBalanceSing()).toMatch('Need 1,500');
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

    const cardName = await earnHelp.findCardByName('International Cooperation');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(cardNumber)).click();
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
    await tg.pressPlay();
    await page.waitForTimeout(5000);
    await help.checkProfitByAway(400, 410);
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

    const cardName = await earnHelp.findCardByName('Baby Doge Games');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(cardNumber)).click();
    expect(await earn.getCardNameModal()).toMatch('Baby Doge Games');
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
    await tg.pressPlay();
    await page.waitForTimeout(5000);
    await help.checkProfitByAway(2700, 2750);
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

    const cardName = await earnHelp.findCardByName('Cross Chain Bridge');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(cardNumber)).click();
    expect(await earn.getCardNameModal()).toMatch('Cross Chain Bridge');
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
    await tg.pressPlay();
    await page.waitForTimeout(5000);
    await help.checkProfitByAway(3000, 3150);
    console.log('Current ballance - ' + await home.getBalance());
    expect(await home.getBalance()).toBeGreaterThanOrEqual(3000)
    expect(await home.getBalance()).toBeLessThanOrEqual(3150);
    await expect(await home.profitPerHour).toHaveText('1K');
});
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
import { throwDeprecation } from 'process';

test.use({
    storageState: 'LoginAuth2.json'
  });

test.setTimeout(300000);

test.beforeEach(async ({ page }) => {
    const tg = new TelegramPage(page);
    const help = new TestHelper(page);
    const nav = new NavigationMenu (page);

    await page.goto('https://web.telegram.org/a/#7250553721');
    await page.waitForTimeout(8000);
    await tg.checkErrorMessage();
    await help.refresh();
    await tg.topUp('6809402010', '10000');
    await help.openApp();
    await nav.goEarn();
    await page.waitForTimeout(2000);
});

const financeCards = 2;
const wellfareCards = 3;
const specialCards = 4;

test ('Buy card', async ({ page }) => {
    const earn = new EarnPage (page);
    const nav = new NavigationMenu (page);
    const earnHelp = new EarnHelper(page);
    const home = new HomePage (page);

    const cardName = await earnHelp.findCardByName(financeCards,'AI Trader');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(financeCards,cardNumber)).click();
    await earn.buyCard();
    await nav.goBack();
    await page.waitForTimeout(2000);
    try {
        expect(await home.getProfitPerHour()).toEqual(150);
    } catch (error) {
        console.error('Profit per hour check failed:', error);
        throw new Error('Profit/hour after buy card is not as expected');
    }
});

test ('Check level card after buy', async ({ page }) => {
    const earn = new EarnPage (page);
    const earnHelp = new EarnHelper(page);

    const cardName = await earnHelp.findCardByName(financeCards,'AI Trader');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(financeCards,cardNumber)).click();
    await earn.buyCard();
    await page.waitForTimeout(2000);
    try {
        const cardName = await earnHelp.findCardByName(financeCards,'AI Trader');
        const cardNumber = cardName as number
        expect(await earnHelp.checkCardLevel(financeCards,cardNumber)).toMatch('LVL 1');
    } catch (error) {
        throw new Error('Level card is not as expected');
    }
});

test ('Upgrade card from level 1 to level 2', async ({ page }) => {
    const earn = new EarnPage (page);
    const earnHelp = new EarnHelper(page);

    const cardName = await earnHelp.findCardByName(financeCards,'AI Trader');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(financeCards, cardNumber)).click();
    await earn.buyCard();
    await page.waitForTimeout(2000);
    await (await earnHelp.checkCard(financeCards, 1)).click();
    await earn.upgradeCard();
    await page.waitForTimeout(2000);
    try {
        const cardName = await earnHelp.findCardByName(financeCards,'AI Trader');
        const cardNumber = cardName as number
        expect(await earnHelp.checkCardLevel(financeCards, cardNumber)).toMatch('LVL 2');
    } catch (error) {
        throw new Error('Level card up is not as expected');
    }
});

test ('Check profit per hour after upgrade card', async ({ page }) => {
    const earn = new EarnPage (page);
    const nav = new NavigationMenu (page);
    const earnHelp = new EarnHelper(page);
    const home = new HomePage (page);

    const cardName = await earnHelp.findCardByName(financeCards, 'AI Trader');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(financeCards, cardNumber)).click();
    await earn.buyCard();
    await page.waitForTimeout(2000);
    await (await earnHelp.checkCard(financeCards, 1)).click();
    await earn.upgradeCard();
    await page.waitForTimeout(2000);
    await nav.goBack();
    await page.waitForTimeout(2000);
    try {
        expect(await home.getProfitPerHour()).toEqual(310);
    } catch (error) {
        throw new Error('Profit/hour after upgrade card is not as expected');
    }
});

test ('Buy card with insufficient balance', async ({ page }) => {
    const earn = new EarnPage (page);
    const earnHelp = new EarnHelper(page);

    const cardName = await earnHelp.findCardByName(financeCards, 'AI Trader');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(financeCards, cardNumber)).click();
    await earn.buyCard();
    await page.waitForTimeout(1500);
    const highCostCardName = await earnHelp.findCardByName(financeCards, 'Cross Chain Bridge');
    const cardNum = highCostCardName as number
    await(await earnHelp.checkCard(financeCards, cardNum)).click();
    try {
        expect(await earn.getLowBalanceSing()).toMatch('Need 1,500');
    } catch (error) {
        throw new Error('Insufficient balance message is not as expected');
    }
});

test ('Check message for 1 hour', async ({ page }) => {
    const earn = new EarnPage (page);
    const earnHelp = new EarnHelper(page);
    const nav = new NavigationMenu (page);
    const help = new TestHelper(page);
    const home = new HomePage (page);
    const tg = new TelegramPage(page);
    
    await earn.pressWelfare();

    const cardName = await earnHelp.findCardByName(wellfareCards, 'International Cooperation');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(wellfareCards, cardNumber)).click();
    await earn.buyCard();
    await page.waitForTimeout(1000);
    await nav.goBack();
    await nav.closeApp();
    await help.upHour(1);
    await tg.pressPlay();
    await page.waitForTimeout(5000);
    console.log('Expected profit in message - 200~210 | Actual profit - ', await home.getProfitByAway());
    try {
        expect(await home.getProfitByAway()).toBeGreaterThanOrEqual(200);
        expect(await home.getProfitByAway()).toBeLessThanOrEqual(210);
    } catch (error) {
        throw new Error('Profit in message is not as expected');
    }
});

test.skip ('Check message for 3 hour', async ({ page }) => {    //bug profit after 3 hours
    const earn = new EarnPage (page);
    const earnHelp = new EarnHelper(page);
    const nav = new NavigationMenu (page);
    const help = new TestHelper(page);
    const home = new HomePage (page);
    const tg = new TelegramPage(page);
    
    await earn.pressWelfare();

    const cardName = await earnHelp.findCardByName(wellfareCards, 'International Cooperation');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(wellfareCards, cardNumber)).click();
    await earn.buyCard();
    await page.waitForTimeout(1000);
    await nav.goBack();
    await nav.closeApp();
    await help.upHour(3);
    await tg.pressPlay();
    await page.waitForTimeout(5000);
    console.log('Expected profit in message - 600 | Actual profit - ' + await home.getProfitByAway());
    try {
        expect(await home.getProfitByAway()).toEqual(600);
    } catch (error) {
        throw new Error('Profit in message is not as expected');
    }
});

test.skip ('Check message for 12 hour', async ({ page }) => {   //bug profit after 12 hours
    const earn = new EarnPage (page);
    const earnHelp = new EarnHelper(page);
    const nav = new NavigationMenu (page);
    const help = new TestHelper(page);
    const home = new HomePage (page);
    const tg = new TelegramPage(page);
    
    await earn.pressWelfare();

    const cardName = await earnHelp.findCardByName(wellfareCards, 'International Cooperation');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(wellfareCards, cardNumber)).click();
    await earn.buyCard();
    await page.waitForTimeout(1000);
    await nav.goBack();
    await nav.closeApp();
    await help.upHour(12);
    await tg.pressPlay();
    await page.waitForTimeout(5000);
    console.log('Expected profit in message - 600 | Actual profit - ' + await home.getProfitByAway());
    try {
        expect(await home.getProfitByAway()).toEqual(600);
    } catch (error) {
        throw new Error('Profit in message is not as expected');
    }
});

test ('Check profit per hour for 2 hour', async ({ page }) => {
    const earn = new EarnPage (page);
    const nav = new NavigationMenu (page);
    const earnHelp = new EarnHelper(page);
    const home = new HomePage (page);
    const help = new TestHelper(page);
    const tg = new TelegramPage(page);

    await earn.pressWelfare();

    const cardName = await earnHelp.findCardByName(wellfareCards, 'International Cooperation');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(wellfareCards, cardNumber)).click();
    await earn.buyCard();
    await page.waitForTimeout(1000);
    await nav.goBack();
    await nav.closeApp();
    await help.upHour(2);
    await tg.pressPlay();
    await page.waitForTimeout(5000);
    console.log('Current ballance - ' + await home.getBalance());
    try {  
        expect(await home.getBalance()).toBeGreaterThanOrEqual(8400);
        expect(await home.getBalance()).toBeLessThanOrEqual(8450);
    } catch {
        throw new Error('The profit + balance is not as expected');
    }
});

test.skip ('Check profit per hour for 3 hour', async ({ page }) => {    //bug profit after 3 hours
    const earn = new EarnPage (page);
    const nav = new NavigationMenu (page);
    const earnHelp = new EarnHelper(page);
    const home = new HomePage (page);
    const help = new TestHelper(page);
    const tg = new TelegramPage(page);

    const cardName = await earnHelp.findCardByName(financeCards, 'Baby Doge Games');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(financeCards, cardNumber)).click();
    await earn.buyCard();
    await page.waitForTimeout(2000);
    await nav.goBack();
    await nav.closeApp();
    await help.upHour(3);
    await tg.pressPlay();
    await page.waitForTimeout(5000);
    console.log('Current ballance - ' + await home.getBalance());
    console.log('Profit in 3 hours - ' + await home.getProfitByAway());
    try {
        expect(await home.getBalance()).toBe(3700);
    } catch {
        throw new Error('The profit + balance is not as expected');
    }
});

test.skip ('Check profit per hour for 12 hour', async ({ page }) => {   //bug profit after 12 hours
    const earn = new EarnPage (page);
    const nav = new NavigationMenu (page);
    const earnHelp = new EarnHelper(page);
    const home = new HomePage (page);
    const help = new TestHelper(page);
    const tg = new TelegramPage(page);

    const cardName = await earnHelp.findCardByName(financeCards, 'Cross Chain Bridge');
    const cardNumber = cardName as number

    await (await earnHelp.checkCard(financeCards, cardNumber)).click();
    await earn.buyCard();
    await page.waitForTimeout(2000);
    await nav.goBack();
    await nav.closeApp();
    await help.upHour(12);
    await tg.pressPlay();
    await page.waitForTimeout(5000);
    console.log('Current ballance - ' + await home.getBalance());
    try {
        expect(await home.getBalance()).toBe(3000);
    } catch {
        throw new Error('The profit + balance is not as expected');
    }
});
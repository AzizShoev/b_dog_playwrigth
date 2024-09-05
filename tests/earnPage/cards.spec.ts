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

test ('Check finance cards visible', async ({ page }) => {
    const tg  = new TelegramPage (page);
    const earn = new EarnPage (page);
    const nav = new NavigationMenu (page);
    const earnHelp = new EarnHelper(page);

    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    await nav.goEarn();
    await page.waitForTimeout(2000);
    console.log('Total number of cards -> '+ await earn.card.locator('>div').count());
    const cardsFinance = await earn.card.locator('>div').count()
    
    for (let i = 1; i <= cardsFinance; i++) {
        
        expect(await earnHelp.checkCard(i)).toBeVisible();
        expect(await earnHelp.checkCard(i)).toBeEnabled();
        await page.waitForTimeout(1000);
    }
});

test ('Check wwlfare cards visible', async ({ page }) => {
    const tg  = new TelegramPage (page);
    const earn = new EarnPage (page);
    const nav = new NavigationMenu (page);
    const earnHelp = new EarnHelper(page);

    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    await nav.goEarn();
    await earn.pressWelfare();
    await page.waitForTimeout(2000);
    console.log('Total number of cards -> '+ await earn.card.locator('>div').count());
    const cardsWelfare = await earn.card.locator('>div').count()
    
    for (let i = 1; i <= cardsWelfare; i++) {
        
        expect(await earnHelp.checkCard(i)).toBeVisible();
        expect(await earnHelp.checkCard(i)).toBeEnabled();
        await page.waitForTimeout(1000);
    }
});

test ('Check finance card info', async ({ page }) => {
    const tg  = new TelegramPage (page);
    const earn = new EarnPage (page);
    const nav = new NavigationMenu (page);
    const earnHelp = new EarnHelper(page)

    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    await nav.goEarn();
    await page.waitForTimeout(2000);
    console.log('Total count of cards -> '+ await earn.card.locator('>div').count());
    const cardsFinance = await earn.card.locator('>div').count()

    for (let i = 1; i <= cardsFinance; i++) {
        const name = await (await earnHelp.checkCardName(i));
        const cardName = await earnHelp.findCardByName(name);
        const cardNumber = cardName as number
        const profit = await earnHelp.checkCardsProfit(cardNumber);
        const price = await earnHelp.checkCardPrice(cardNumber);
        if (!name || name === '' || name === ' ' || name === undefined) {
            throw new Error('Card Name is empty or undefined');
        }
        if (!profit || profit === undefined) {
            throw new Error('Card Profit is empty or undefined');
        }
        if (!price || price === undefined) {
            throw new Error('Card Price is empty or undefined');
        }
        expect(await earnHelp.checkCardName(cardNumber)).toMatch(name);
        expect(await earnHelp.checkCardsProfit(cardNumber)).toEqual(profit);
        if(!(await earnHelp.checkCardPrice(cardNumber) === await earnHelp.checkCardsProfit(cardNumber)*10)){
            console.log('Special card: -> '+ await earnHelp.checkCardName(cardNumber));
        }else{
            expect(await earnHelp.checkCardPrice(cardNumber)).toEqual(await earnHelp.checkCardsProfit(cardNumber)*10);
        }
        console.log('card: ' + cardNumber + ' -> '+ await earnHelp.checkCardName(cardNumber) + ' -> profit: ' + await earnHelp.checkCardsProfit(cardNumber) + '/h' + ' -> price: ' + await earnHelp.checkCardPrice(cardNumber));
    }
});

test ('Check welfare cards info', async ({ page }) => {
    const tg  = new TelegramPage (page);
    const earn = new EarnPage (page);
    const nav = new NavigationMenu (page);
    const earnHelp = new EarnHelper(page)

    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    await nav.goEarn();
    await earn.pressWelfare();
    await page.waitForTimeout(2000)
    console.log('Total count of cards -> '+ await earn.card.locator('>div').count());
    const cardsWelfare = await earn.card.locator('>div').count()

    for (let i = 1; i <= cardsWelfare; i++) {
        const name = await (await earnHelp.checkCardName(i));
        const cardName = await earnHelp.findCardByName(name);
        const cardNumber = cardName as number
        const profit = await earnHelp.checkCardsProfit(cardNumber);
        const price = await earnHelp.checkCardPrice(cardNumber);
        if (!name || name === '' || name === ' ' || name === undefined) {
            throw new Error('Card Name is empty or undefined');
        }
        if (!profit || profit === undefined) {
            throw new Error('Card Profit is empty or undefined');
        }
        if (!price || price === undefined) {
            throw new Error('Card Price is empty or undefined');
        }
        expect(await earnHelp.checkCardName(cardNumber)).toMatch(name);
        expect(await earnHelp.checkCardsProfit(cardNumber)).toEqual(profit);
        if(!(await earnHelp.checkCardPrice(cardNumber) === await earnHelp.checkCardsProfit(cardNumber)*10)){
            console.log('Special card: -> '+ await earnHelp.checkCardName(cardNumber));
        }else{
            expect(await earnHelp.checkCardPrice(cardNumber)).toEqual(await earnHelp.checkCardsProfit(cardNumber)*10);
        }
        console.log('card: ' + cardNumber + ' -> '+ await earnHelp.checkCardName(cardNumber) + ' -> profit: ' + await earnHelp.checkCardsProfit(cardNumber) + '/h' + ' -> price: ' + await earnHelp.checkCardPrice(cardNumber));
    }
});
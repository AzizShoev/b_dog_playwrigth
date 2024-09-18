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
import assert from 'assert';

test.use({
    storageState: 'LoginAuth2.json'
  });

  test.setTimeout(200000);

test.beforeEach(async ({ page }) => {
    const tg = new TelegramPage(page);
    const help = new TestHelper(page);
    const nav = new NavigationMenu (page);

    await page.goto('https://web.telegram.org/a/#7250553721');
    await page.waitForTimeout(8000);
    await tg.checkErrorMessage();
    await help.refresh();
    await help.openApp();
    await nav.goEarn();
});

const financeCards = 2;
const welfareCards = 3;
const specialCards = 4;

test ('Check finance cards visible', async ({ page }) => {
    const earn = new EarnPage (page);
    const earnHelp = new EarnHelper(page);

    
    await page.waitForTimeout(2000);
    console.log('Total number of cards -> '+ await earn.card.locator('>div:nth-child(2)>div>div').count());
    const cardsFinance = await earn.card.locator('>div:nth-child(2)>div>div').count()
    
    for (let i = 1; i <= cardsFinance; i++) {
        
        expect(await earnHelp.checkCard(financeCards, i)).toBeVisible();
        expect(await earnHelp.checkCard(financeCards, i)).toBeEnabled();
        await page.waitForTimeout(1000);
    }
});

test ('Check welfare cards visible', async ({ page }) => {
    const earn = new EarnPage (page);;
    const earnHelp = new EarnHelper(page);

    
    await earn.pressWelfare();
    await page.waitForTimeout(2000);
    console.log('Total number of cards -> '+ await earn.card.locator('>div:nth-child(3)>div>div').count());
    const cardsWelfare = await earn.card.locator('>div:nth-child(3)>div>div').count()
    
    for (let i = 1; i <= cardsWelfare; i++) {
        
        expect(await earnHelp.checkCard(welfareCards, i)).toBeVisible();
        expect(await earnHelp.checkCard(welfareCards, i)).toBeEnabled();
        await page.waitForTimeout(1000);
    }
});

test ('Check special cards visible', async ({ page }) => {
    const earn = new EarnPage (page);
    const earnHelp = new EarnHelper(page);

    await earn.pressSpecialCardsButton();
    await page.waitForTimeout(2000);
    console.log('Total number of cards -> '+ await earn.card.locator('>div:nth-child(4)>div>div').count());
    const cardsWelfare = await earn.card.locator('>div:nth-child(4)>div>div').count()
    
    for (let i = 1; i <= cardsWelfare; i++) {
        
        expect(await earnHelp.checkCard(specialCards, i)).toBeVisible();
        expect(await earnHelp.checkCard(specialCards, i)).toBeEnabled();
        await page.waitForTimeout(1000);
    }
});


test ('Check finance card info', async ({ page }) => {
    const earn = new EarnPage (page);
    const earnHelp = new EarnHelper(page)

    await page.waitForTimeout(2000);
    console.log('Total count of cards -> '+ await earn.card.locator('>div:nth-child(2)>div>div').count());
    const cardsFinance = await earn.card.locator('>div:nth-child(2)>div>div').count()

    for (let i = 1; i <= cardsFinance; i++) {
        const name = (await earnHelp.checkCardName(financeCards, i));
        const cardName = await earnHelp.findCardByName(financeCards, name);
        const cardNumber = cardName as number
        const profit = await earnHelp.checkCardsProfit(financeCards, cardNumber);
        const price = await earnHelp.checkCardPrice(financeCards, cardNumber);
        if (!name || name === '' || name === ' ' || name === undefined) {
            throw new Error('Card Name is empty or undefined');
        }
        if (!profit || profit === undefined) {
            throw new Error('Card Profit is empty or undefined');
        }
        if (!price || price === undefined) {
            throw new Error('Card Price is empty or undefined');
        }
        expect(await earnHelp.checkCardName(financeCards, cardNumber)).toMatch(name);
        expect(await earnHelp.checkCardsProfit(financeCards, cardNumber)).toEqual(profit);
        if(!(await earnHelp.checkCardPrice(financeCards, cardNumber) === await earnHelp.checkCardsProfit(financeCards, cardNumber)*10)){
            console.log('Special price: -> '+ await earnHelp.checkCardName(financeCards, cardNumber));
        }else{
            expect(await earnHelp.checkCardPrice(financeCards, cardNumber)).toEqual(await earnHelp.checkCardsProfit(financeCards, cardNumber)*10);
        }
        console.log('card: ' + cardNumber + ' -> '+ await earnHelp.checkCardName(financeCards, cardNumber) + ' -> profit: ' + await earnHelp.checkCardsProfit(financeCards, cardNumber) + '/h' + ' -> price: ' + await earnHelp.checkCardPrice(financeCards, cardNumber));
    }
});

test ('Check welfare cards info', async ({ page }) => {
    const earn = new EarnPage (page);
    const earnHelp = new EarnHelper(page)

    await earn.pressWelfare();
    await page.waitForTimeout(2000)
    console.log('Total count of cards -> '+ await earn.card.locator('>div:nth-child(3)>div>div').count());
    const cardsWelfare = await earn.card.locator('>div:nth-child(3)>div>div').count()

    for (let i = 1; i <= cardsWelfare; i++) {
        const name = await (await earnHelp.checkCardName(welfareCards, i));
        const cardName = await earnHelp.findCardByName(welfareCards, name);
        const cardNumber = cardName as number
        const profit = await earnHelp.checkCardsProfit(welfareCards, cardNumber);
        const price = await earnHelp.checkCardPrice(welfareCards, cardNumber);
        if (!name || name === '' || name === ' ' || name === undefined) {
            throw new Error('Card Name is empty or undefined');
        }
        if (!profit || profit === undefined) {
            throw new Error('Card Profit is empty or undefined');
        }
        if (!price || price === undefined) {
            throw new Error('Card Price is empty or undefined');
        }
        expect(await earnHelp.checkCardName(welfareCards, cardNumber)).toMatch(name);
        expect(await earnHelp.checkCardsProfit(welfareCards, cardNumber)).toEqual(profit);
        if(!(await earnHelp.checkCardPrice(welfareCards, cardNumber) === await earnHelp.checkCardsProfit(welfareCards, cardNumber)*10)){
            console.log('Special price: -> '+ await earnHelp.checkCardName(welfareCards, cardNumber));
        }else{
            expect(await earnHelp.checkCardPrice(welfareCards, cardNumber)).toEqual(await earnHelp.checkCardsProfit(welfareCards, cardNumber)*10);
        }
        console.log('card: ' + cardNumber + ' -> '+ await earnHelp.checkCardName(welfareCards, cardNumber) + ' -> profit: ' + await earnHelp.checkCardsProfit(welfareCards, cardNumber) + '/h' + ' -> price: ' + await earnHelp.checkCardPrice(welfareCards, cardNumber));
    }
});

test ('Check special cards info', async ({ page }) => {
    const earn = new EarnPage (page);
    const earnHelp = new EarnHelper(page)

    await earn.pressSpecialCardsButton();
    await page.waitForTimeout(2000)
    console.log('Total count of cards -> '+ await earn.card.locator('>div:nth-child(4)>div>div').count());
    const cardsWelfare = await earn.card.locator('>div:nth-child(4)>div>div').count()

    for (let i = 1; i <= cardsWelfare; i++) {
        const name = await (await earnHelp.checkCardName(specialCards, i));
        const cardName = await earnHelp.findCardByName(specialCards, name);
        const cardNumber = cardName as number
        const profit = await earnHelp.checkCardsProfit(specialCards, cardNumber);
        const price = await earnHelp.checkCardPrice(specialCards, cardNumber);
        if (!name || name === '' || name === ' ' || name === undefined) {
            throw new Error('Card Name is empty or undefined');
        }
        if (!profit || profit === undefined) {
            throw new Error('Card Profit is empty or undefined');
        }
        if (!price || price === undefined) {
            throw new Error('Card Price is empty or undefined');
        }
        expect(await earnHelp.checkCardName(specialCards, cardNumber)).toMatch(name);
        expect(await earnHelp.checkCardsProfit(specialCards, cardNumber)).toEqual(profit);
        if(!(await earnHelp.checkCardPrice(specialCards, cardNumber) === await earnHelp.checkCardsProfit(specialCards, cardNumber)*10)){
            console.log('Special price: -> '+ await earnHelp.checkCardName(specialCards, cardNumber));
        }else{
            expect(await earnHelp.checkCardPrice(specialCards, cardNumber)).toEqual(await earnHelp.checkCardsProfit(specialCards, cardNumber)*10);
        }
        console.log('card: ' + cardNumber + ' -> '+ await earnHelp.checkCardName(specialCards, cardNumber) + ' -> profit: ' + await earnHelp.checkCardsProfit(specialCards, cardNumber) + '/h' + ' -> price: ' + await earnHelp.checkCardPrice(specialCards, cardNumber));
    }
});

test ('Check finance card modal info', async ({ page }) => {
    const earn = new EarnPage (page);
    const earnHelp = new EarnHelper(page)

    const cardName = await earnHelp.findCardByName(financeCards, 'NFT Marketplace');
    const cardNumber = cardName as number
    await (await earnHelp.checkCard(financeCards, cardNumber)).click();
    try{
        expect.soft(await earn.getCardNameModal()).toMatch('NFT Marketplace');
    }catch(error){
        throw new Error('Card name modal error');
    }
    try{
        expect.soft(await earn.getCurrentProfitModal()).toEqual(0);
    }catch(error){
        throw new Error('Card current profit modal error');
    }
    try{
        expect.soft(await earn.getUpProfitModal()).toEqual(35);
    }catch(error){
        throw new Error('Card up profit modal error');
    }
    try{
        expect.soft(await earn.getCostModal()).toEqual(350);
    }catch(error){
        throw new Error('Card cost modal error');
    }
});

test ('Sorting cards by level', async ({ page }) => {
    const earn = new EarnPage (page);
    const earnHelp = new EarnHelper(page)
    const tg = new TelegramPage(page);
    const nav = new NavigationMenu(page);

    await nav.goBack();
    await nav.closeApp();
    await tg.topUp('6809402010', '100000');
    await tg.pressPlay();
    await nav.goEarn();
    const cardName = await earnHelp.findCardByName(financeCards,'Crypto Launchpad');
    const cardNumber = cardName as number
    await (await earnHelp.checkCard(financeCards, cardNumber)).click();
    await earn.buyCard();
    await page.waitForTimeout(2000);
    await (await earnHelp.checkCard(financeCards, 1)).click();
    await earn.upgradeCard();
    await page.waitForTimeout(2000);
    
    const cardName2 = await earnHelp.findCardByName(financeCards,'Baby Doge Games');
    const cardNumber2 = cardName2 as number
    await (await earnHelp.checkCard(financeCards, cardNumber2)).click();
    await earn.buyCard();
    await page.waitForTimeout(2000);
    expect.soft(await earnHelp.checkCardName(financeCards, 1)).toMatch('Crypto Launchpad');
    expect.soft(await earnHelp.checkCardLevel(financeCards, 1)).toMatch('LVL 2');
    expect.soft(await earnHelp.checkCardName(financeCards, 2)).toMatch('Baby Doge Games');
    expect.soft(await earnHelp.checkCardLevel(financeCards, 2)).toMatch('LVL 1');
})
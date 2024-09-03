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
    expect(await earnHelp.checkCard(1)).toBeVisible();
    console.log('card 1 -> '+ await earnHelp.checkCardName(1));
    expect(await earnHelp.checkCard(2)).toBeVisible();
    console.log('card 2 -> '+ await earnHelp.checkCardName(2));
    expect(await earnHelp.checkCard(3)).toBeVisible();
    console.log('card 3 -> '+ await earnHelp.checkCardName(3));
    await (await earnHelp.checkCard(6)).scrollIntoViewIfNeeded();
    expect(await earnHelp.checkCard(4)).toBeVisible();
    console.log('card 4 -> '+ await earnHelp.checkCardName(4));
    expect(await earnHelp.checkCard(5)).toBeVisible();
    console.log('card 5 -> '+ await earnHelp.checkCardName(5));
    expect(await earnHelp.checkCard(6)).toBeVisible();
    console.log('card 6 -> '+ await earnHelp.checkCardName(6));
    await (await earnHelp.checkCard(10)).scrollIntoViewIfNeeded();
    expect(await earnHelp.checkCard(7)).toBeVisible();
    console.log('card 7 -> '+ await earnHelp.checkCardName(7));
    expect(await earnHelp.checkCard(8)).toBeVisible();
    console.log('card 8 -> '+ await earnHelp.checkCardName(8));
    expect(await earnHelp.checkCard(9)).toBeVisible();
    console.log('card 9 -> '+ await earnHelp.checkCardName(9));
    expect(await earnHelp.checkCard(10)).toBeVisible();
    console.log('card 10-> '+ await earnHelp.checkCardName(10));
    await (await earnHelp.checkCard(12)).scrollIntoViewIfNeeded();
    expect(await earnHelp.checkCard(11)).toBeVisible();
    console.log('card 11 -> '+ await earnHelp.checkCardName(11));
    expect(await earnHelp.checkCard(12)).toBeVisible();
    console.log('card 12 -> '+ await earnHelp.checkCardName(12));
    expect(await earnHelp.checkCard(13)).toBeVisible();
    console.log('card 13 -> '+ await earnHelp.checkCardName(13));
    // expect(await earnHelp.checkCard(14)).toBeVisible();
    // console.log('card 13 -> '+ await earnHelp.checkCardName(14))
    // await (await earnHelp.checkCard(17)).scrollIntoViewIfNeeded();;
    // expect(await earnHelp.checkCard(15)).toBeVisible();
    // console.log('card 13 -> '+ await earnHelp.checkCardName(15));
    // expect(await earnHelp.checkCard(16)).toBeVisible();
    // console.log('card 13 -> '+ await earnHelp.checkCardName(16));
    // expect(await earnHelp.checkCard(17)).toBeVisible();
    // console.log('card 13 -> '+ await earnHelp.checkCardName(17));
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
    expect(await earnHelp.checkCard(1)).toBeVisible();
    console.log('card 1 -> '+ await earnHelp.checkCardName(1))
    expect(await earnHelp.checkCard(2)).toBeVisible();
    console.log('card 2 -> '+ await earnHelp.checkCardName(2))
    expect(await earnHelp.checkCard(3)).toBeVisible();
    console.log('card 3 -> '+ await earnHelp.checkCardName(3))
    await (await earnHelp.checkCard(6)).scrollIntoViewIfNeeded();
    expect(await earnHelp.checkCard(4)).toBeVisible();
    console.log('card 4 -> '+ await earnHelp.checkCardName(4))
    expect(await earnHelp.checkCard(5)).toBeVisible();
    console.log('card 5 -> '+ await earnHelp.checkCardName(5))
    expect(await earnHelp.checkCard(6)).toBeVisible();
    console.log('card 6 -> '+ await earnHelp.checkCardName(6))
    await (await earnHelp.checkCard(8)).scrollIntoViewIfNeeded();
    expect(await earnHelp.checkCard(7)).toBeVisible();
    console.log('card 7 -> '+ await earnHelp.checkCardName(7))
    expect(await earnHelp.checkCard(8)).toBeVisible();
    console.log('card 8 -> '+ await earnHelp.checkCardName(8))
    // expect(await earnHelp.checkCard(9)).toBeVisible();
    // console.log('card 8 -> '+ await earnHelp.checkCardName(9))
    // expect(await earnHelp.checkCard(10)).toBeVisible();
    // console.log('card 8 -> '+ await earnHelp.checkCardName(10))
    // expect(await earnHelp.checkCard(11)).toBeVisible();
    // console.log('card 8 -> '+ await earnHelp.checkCardName(11))
    // expect(await earnHelp.checkCard(12)).toBeVisible();
    // console.log('card 8 -> '+ await earnHelp.checkCardName(12))
    // expect(await earnHelp.checkCard(13)).toBeVisible();
    // console.log('card 8 -> '+ await earnHelp.checkCardName(13))
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

    expect(await earnHelp.checkCardName(1)).toMatch('Crypto Risk Management 4');
    console.log('card 1 name -> '+ await earnHelp.checkCardName(1))
    expect(await earnHelp.checkCardsProfit(1)).toEqual(2500);
    console.log('card 1 profit -> ' + '+' + await earnHelp.checkCardsProfit(1)+'/h')
    expect(await earnHelp.checkCardPrice(1)).toEqual(await earnHelp.checkCardsProfit(1)*10);
    console.log('card 1 price -> '+ await earnHelp.checkCardPrice(1));
    -
    expect(await earnHelp.checkCardName(2)).toMatch('Crypto Risk Management 3');
    console.log('card 2 name -> '+ await earnHelp.checkCardName(2))
    expect(await earnHelp.checkCardsProfit(2)).toEqual(2500);
    console.log('card 2 profit -> ' + '+' + await earnHelp.checkCardsProfit(2)+'/h')
    expect(await earnHelp.checkCardPrice(2)).toEqual(await earnHelp.checkCardsProfit(2)*10);
    console.log('card 2 price -> '+ await earnHelp.checkCardPrice(2));

    expect(await earnHelp.checkCardName(3)).toMatch('Crypto Risk Management');
    console.log('card 3 name -> '+ await earnHelp.checkCardName(3))
    expect(await earnHelp.checkCardsProfit(3)).toEqual(2500);
    console.log('card 3 profit -> ' + '+' + await earnHelp.checkCardsProfit(3)+'/h')
    expect(await earnHelp.checkCardPrice(3)).toEqual(await earnHelp.checkCardsProfit(3)*10);
    console.log('card 3 price -> '+ await earnHelp.checkCardPrice(3))

    expect(await earnHelp.checkCardName(4)).toMatch('Security Expert Dog');
    console.log('card 4 name -> '+ await earnHelp.checkCardName(4))
    expect(await earnHelp.checkCardsProfit(4)).toEqual(900);
    console.log('card 4 profit -> ' + '+' + await earnHelp.checkCardsProfit(4)+'/h')
    expect(await earnHelp.checkCardPrice(4)).toEqual(await earnHelp.checkCardsProfit(4)*10);
    console.log('card 4 price -> '+ await earnHelp.checkCardPrice(4))

    expect(await earnHelp.checkCardName(5)).toMatch('Market Analytics');
    console.log('card 5 name -> '+ await earnHelp.checkCardName(5))
    expect(await earnHelp.checkCardsProfit(5)).toEqual(900);
    console.log('card 5 profit -> ' + '+' + await earnHelp.checkCardsProfit(5)+'/h')
    expect(await earnHelp.checkCardPrice(5)).toEqual(await earnHelp.checkCardsProfit(5)*10);
    console.log('card 5 price -> '+ await earnHelp.checkCardPrice(5))

    expect(await earnHelp.checkCardName(6)).toMatch('AI Trader');
    console.log('card 6 name -> '+ await earnHelp.checkCardName(6))
    expect(await earnHelp.checkCardsProfit(6)).toEqual(150);
    console.log('card 6 profit -> ' + '+' + await earnHelp.checkCardsProfit(6)+'/h')
    expect(await earnHelp.checkCardPrice(6)).toEqual(await earnHelp.checkCardsProfit(6)*10);
    console.log('card 6 price -> '+ await earnHelp.checkCardPrice(6))

    expect(await earnHelp.checkCardName(7)).toMatch('DeFi Farming');
    console.log('card 7 name -> '+ await earnHelp.checkCardName(7))
    expect(await earnHelp.checkCardsProfit(7)).toEqual(1000);
    console.log('card 7 profit -> '+ await earnHelp.checkCardsProfit(7))
    expect(await earnHelp.checkCardPrice(7)).toEqual(await earnHelp.checkCardsProfit(7)*10);
    console.log('card 7 price -> '+ await earnHelp.checkCardPrice(7))

    expect(await earnHelp.checkCardName(8)).toMatch('NFT Marketplace');
    console.log('card 8 name -> '+ await earnHelp.checkCardName(8))
    expect(await earnHelp.checkCardsProfit(8)).toEqual(35);
    console.log('card 8 profit -> ' + '+' + await earnHelp.checkCardsProfit(8)+'/h')
    expect(await earnHelp.checkCardPrice(8)).toEqual(await earnHelp.checkCardsProfit(8)*10);
    console.log('card 8 price -> '+ await earnHelp.checkCardPrice(8))

    expect(await earnHelp.checkCardName(9)).toMatch('NFT Collection');
    console.log('card 9 name -> '+ await earnHelp.checkCardName(9))
    expect(await earnHelp.checkCardsProfit(9)).toEqual(35);
    console.log('card 9 profit -> ' + '+' + await earnHelp.checkCardsProfit(9)+'/h')
    expect(await earnHelp.checkCardPrice(9)).toEqual(await earnHelp.checkCardsProfit(9)*10);
    console.log('card 9 price -> '+ await earnHelp.checkCardPrice(9))

    expect(await earnHelp.checkCardName(10)).toMatch('Staking');
    console.log('card 10 name -> '+ await earnHelp.checkCardName(10))
    expect(await earnHelp.checkCardsProfit(10)).toEqual(50);
    console.log('card 10 profit -> ' + '+' + await earnHelp.checkCardsProfit(10)+'/h')
    expect(await earnHelp.checkCardPrice(10)).toEqual(await earnHelp.checkCardsProfit(10)*10);
    console.log('card 10 price -> '+ await earnHelp.checkCardPrice(10))

    expect(await earnHelp.checkCardName(11)).toMatch('Swap');
    console.log('card 11 name -> '+ await earnHelp.checkCardName(11))
    expect(await earnHelp.checkCardsProfit(11)).toEqual(50);
    console.log('card 11 profit -> ' + '+' + await earnHelp.checkCardsProfit(11)+'/h')
    expect(await earnHelp.checkCardPrice(11)).toEqual(await earnHelp.checkCardsProfit(11)*10);
    console.log('card 11 price -> '+ await earnHelp.checkCardPrice(11))

    expect(await earnHelp.checkCardName(12)).toMatch('Budget Planning');
    console.log('card 12 name -> '+ await earnHelp.checkCardName(12))
    expect(await earnHelp.checkCardsProfit(12)).toEqual(80);
    console.log('card 12 profit -> ' + '+' + await earnHelp.checkCardsProfit(12)+'/h')
    expect(await earnHelp.checkCardPrice(12)).toEqual(await earnHelp.checkCardsProfit(12)*10);
    console.log('card 12 price -> '+ await earnHelp.checkCardPrice(12))

    expect(await earnHelp.checkCardName(13)).toMatch('Crypto Grants');
    console.log('card 13 name -> '+ await earnHelp.checkCardName(13))
    expect(await earnHelp.checkCardsProfit(13)).toEqual(50);
    console.log('card 13 profit -> ' + '+' + await earnHelp.checkCardsProfit(13)+'/h')
    expect(await earnHelp.checkCardPrice(13)).toEqual(await earnHelp.checkCardsProfit(13)*10);
    console.log('card 13 price -> '+ await earnHelp.checkCardPrice(13))

    // expect(await earnHelp.checkCardName(14)).toMatch('Stalkings');
    // console.log('card 13 name -> '+ await earnHelp.checkCardName(14))
    // expect(await earnHelp.checkCardsProfit(14)).toEqual(50);
    // console.log('card 13 profit -> ' + '+' + await earnHelp.checkCardsProfit(13)+'/h')
    // expect(await earnHelp.checkCardPrice(14)).toEqual(await earnHelp.checkCardsProfit(14)*10);
    // console.log('card 13 price -> '+ await earnHelp.checkCardPrice(14))

    // expect(await earnHelp.checkCardName(15)).toMatch('Swap');
    // console.log('card 13 name -> '+ await earnHelp.checkCardName(15))
    // expect(await earnHelp.checkCardsProfit(15)).toEqual(50);
    // console.log('card 13 profit -> ' + '+' + await earnHelp.checkCardsProfit(15)+'/h')
    // expect(await earnHelp.checkCardPrice(15)).toEqual(await earnHelp.checkCardsProfit(15)*10);
    // console.log('card 13 price -> '+ await earnHelp.checkCardPrice(15))

    // expect(await earnHelp.checkCardName(16)).toMatch('Budget Planning');
    // console.log('card 13 name -> '+ await earnHelp.checkCardName(16))
    // expect(await earnHelp.checkCardsProfit(16)).toEqual(80);
    // console.log('card 13 profit -> ' + '+' + await earnHelp.checkCardsProfit(16)+'/h')
    // expect(await earnHelp.checkCardPrice(16)).toEqual(await earnHelp.checkCardsProfit(16)*10);
    // console.log('card 13 price -> '+ await earnHelp.checkCardPrice(16))

    // expect(await earnHelp.checkCardName(17)).toMatch('Crypto Grants');
    // console.log('card 13 name -> '+ await earnHelp.checkCardName(17))
    // expect(await earnHelp.checkCardsProfit(17)).toEqual(50);
    // console.log('card 13 profit -> ' + '+' + await earnHelp.checkCardsProfit(17)+'/h')
    // expect(await earnHelp.checkCardPrice(17)).toEqual(await earnHelp.checkCardsProfit(17)*10);
    // console.log('card 13 price -> '+ await earnHelp.checkCardPrice(17))
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

    expect(await earnHelp.checkCardName(1)).toMatch('Animal Rehabilitation');
    console.log('card 1 name -> '+ await earnHelp.checkCardName(1))
    expect(await earnHelp.checkCardsProfit(1)).toEqual(250);
    console.log('card 1 profit -> ' + '+' + await earnHelp.checkCardsProfit(1)+'/h')
    expect(await earnHelp.checkCardPrice(1)).toEqual(await earnHelp.checkCardsProfit(1)*10);
    console.log('card 1 price -> '+ await earnHelp.checkCardPrice(1));
    -
    expect(await earnHelp.checkCardName(2)).toMatch('International Cooperation');
    console.log('card 2 name -> '+ await earnHelp.checkCardName(2))
    expect(await earnHelp.checkCardsProfit(2)).toEqual(200);
    console.log('card 2 profit -> ' + '+' + await earnHelp.checkCardsProfit(2)+'/h')
    expect(await earnHelp.checkCardPrice(2)).toEqual(await earnHelp.checkCardsProfit(2)*10);
    console.log('card 2 price -> '+ await earnHelp.checkCardPrice(2));

    expect(await earnHelp.checkCardName(3)).toMatch('Rescue Programs');
    console.log('card 3 name -> '+ await earnHelp.checkCardName(3))
    expect(await earnHelp.checkCardsProfit(3)).toEqual(100);
    console.log('card 3 profit -> ' + '+' + await earnHelp.checkCardsProfit(3)+'/h')
    expect(await earnHelp.checkCardPrice(3)).toEqual(await earnHelp.checkCardsProfit(3)*10);
    console.log('card 3 price -> '+ await earnHelp.checkCardPrice(3))

    expect(await earnHelp.checkCardName(4)).toMatch('Anti-Poaching');
    console.log('card 4 name -> '+ await earnHelp.checkCardName(4))
    expect(await earnHelp.checkCardsProfit(4)).toEqual(100);
    console.log('card 4 profit -> ' + '+' + await earnHelp.checkCardsProfit(4)+'/h')
    expect(await earnHelp.checkCardPrice(4)).toEqual(await earnHelp.checkCardsProfit(4)*10);
    console.log('card 4 price -> '+ await earnHelp.checkCardPrice(4))

    expect(await earnHelp.checkCardName(5)).toMatch('Marine Animal Protection');
    console.log('card 5 name -> '+ await earnHelp.checkCardName(5))
    expect(await earnHelp.checkCardsProfit(5)).toEqual(70);
    console.log('card 5 profit -> ' + '+' + await earnHelp.checkCardsProfit(5)+'/h')
    expect(await earnHelp.checkCardPrice(5)).toEqual(await earnHelp.checkCardsProfit(5)*10);
    console.log('card 5 price -> '+ await earnHelp.checkCardPrice(5))

    expect(await earnHelp.checkCardName(6)).toMatch('Water Resource Protection');
    console.log('card 6 name -> '+ await earnHelp.checkCardName(6))
    expect(await earnHelp.checkCardsProfit(6)).toEqual(70);
    console.log('card 6 profit -> ' + '+' + await earnHelp.checkCardsProfit(6)+'/h')
    expect(await earnHelp.checkCardPrice(6)).toEqual(await earnHelp.checkCardsProfit(6)*10);
    console.log('card 6 price -> '+ await earnHelp.checkCardPrice(6))

    expect(await earnHelp.checkCardName(7)).toMatch('Wildlife Protection');
    console.log('card 7 name -> '+ await earnHelp.checkCardName(7))
    expect(await earnHelp.checkCardsProfit(7)).toEqual(70);
    console.log('card 7 profit -> '+ await earnHelp.checkCardsProfit(7))
    expect(await earnHelp.checkCardPrice(7)).toEqual(await earnHelp.checkCardsProfit(7)*10);
    console.log('card 7 price -> '+ await earnHelp.checkCardPrice(7))

    expect(await earnHelp.checkCardName(8)).toMatch('Forest Protection');
    console.log('card 8 name -> '+ await earnHelp.checkCardName(8))
    expect(await earnHelp.checkCardsProfit(8)).toEqual(70);
    console.log('card 8 profit -> ' + '+' + await earnHelp.checkCardsProfit(8)+'/h')
    expect(await earnHelp.checkCardPrice(8)).toEqual(await earnHelp.checkCardsProfit(8)*10);
    console.log('card 8 price -> '+ await earnHelp.checkCardPrice(8))

    // expect(await earnHelp.checkCardName(9)).toMatch('Anti- Poaching');
    // console.log('card 8 name -> '+ await earnHelp.checkCardName(9))
    // expect(await earnHelp.checkCardsProfit(9)).toEqual(100);
    // console.log('card 8 profit -> ' + '+' + await earnHelp.checkCardsProfit(9)+'/h')
    // expect(await earnHelp.checkCardPrice(9)).toEqual(await earnHelp.checkCardsProfit(9)*10);
    // console.log('card 8 price -> '+ await earnHelp.checkCardPrice(9))

    // expect(await earnHelp.checkCardName(10)).toMatch('RMarine Animal Protection');
    // console.log('card 8 name -> '+ await earnHelp.checkCardName(10))
    // expect(await earnHelp.checkCardsProfit(10)).toEqual(70);
    // console.log('card 8 profit -> ' + '+' + await earnHelp.checkCardsProfit(10)+'/h')
    // expect(await earnHelp.checkCardPrice(10)).toEqual(await earnHelp.checkCardsProfit(10)*10);
    // console.log('card 8 price -> '+ await earnHelp.checkCardPrice(10))

    // expect(await earnHelp.checkCardName(11)).toMatch('Water Resource Protection');
    // console.log('card 8 name -> '+ await earnHelp.checkCardName(11))
    // expect(await earnHelp.checkCardsProfit(11)).toEqual(70);
    // console.log('card 8 profit -> ' + '+' + await earnHelp.checkCardsProfit(11)+'/h')
    // expect(await earnHelp.checkCardPrice(11)).toEqual(await earnHelp.checkCardsProfit(11)*10);
    // console.log('card 8 price -> '+ await earnHelp.checkCardPrice(11))

    // expect(await earnHelp.checkCardName(12)).toMatch('Wildlife Protection');
    // console.log('card 8 name -> '+ await earnHelp.checkCardName(12))
    // expect(await earnHelp.checkCardsProfit(12)).toEqual(70);
    // console.log('card 8 profit -> ' + '+' + await earnHelp.checkCardsProfit(12)+'/h')
    // expect(await earnHelp.checkCardPrice(12)).toEqual(await earnHelp.checkCardsProfit(12)*10);
    // console.log('card 8 price -> '+ await earnHelp.checkCardPrice(12))

    // expect(await earnHelp.checkCardName(13)).toMatch('Forest Protection');
    // console.log('card 8 name -> '+ await earnHelp.checkCardName(13))
    // expect(await earnHelp.checkCardsProfit(13)).toEqual(70);
    // console.log('card 8 profit -> ' + '+' + await earnHelp.checkCardsProfit(13)+'/h')
    // expect(await earnHelp.checkCardPrice(13)).toEqual(await earnHelp.checkCardsProfit(13)*10);
    // console.log('card 8 price -> '+ await earnHelp.checkCardPrice(13))
});
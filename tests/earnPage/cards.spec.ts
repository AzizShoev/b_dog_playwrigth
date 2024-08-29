import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { TelegramPage } from '../../pages/telegram.page';
import { TestHelper } from '../../helpers/helper';
import { LeaderboardPage } from '../../pages/leaderboard.page';
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
    //await help.refresh();
});

test ('Check finance cards visible', async ({ page }) => {
    const home  = new HomePage (page);
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
});

test ('Check wwlfare cards visible', async ({ page }) => {
    const home  = new HomePage (page);
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
});
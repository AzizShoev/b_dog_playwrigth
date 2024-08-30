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
    await (await earnHelp.checkCard(6)).click();
    expect(await earn.getCardNameModal()).toMatch('Crypto Launchpad');
    expect(await earn.getCurrentProfitModal()).toEqual(0);
    expect(await earn.getUpProfitModal()).toEqual(700);
    expect(await earn.getCostModal()).toEqual(await earn.getUpProfitModal()*10);
    await earn.buyCard();
    await nav.goBack();
    expect(await home.getBalance()).toEqual(10000 - (await home.getProfitPerHour()*10));
    expect(await home.getProfitPerHour()).toEqual(700);
});
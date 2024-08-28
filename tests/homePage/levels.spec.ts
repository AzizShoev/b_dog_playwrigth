import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { TelegramPage } from '../../pages/telegram.page';
import { TestHelper } from '../../helpers/helper';
import { LeaderboardPage } from '../../pages/leaderboard.page';
import { NavigationMenu } from '../../pages/navigation.page';
import { BoostsPage } from '../../pages/boosts.page';

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

test ('Check default level', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const board = new LeaderboardPage (page);
    
    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(10000);
    console.log('current level:', await home.getCurrentLevel());
    console.log('max level:', await home.getMaxLevel());
    expect(await home.getCurrentLevel()).toBe(1);
    expect(await home.getMaxLevel()).toBe(10);
    await home.goBLeaderBoard();
    await expect (board.levelNameLink).toHaveText('Puppy Doge');
});

test ('Up to level 3', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const help = new TestHelper(page);
    const board = new LeaderboardPage (page);
    
    await help.upLevel(2);
    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    expect(await home.getCurrentLevel()).toBe(3);
    expect(await home.getMaxLevel()).toBe(10);
    await home.goBLeaderBoard();
    await expect (board.levelNameLink).toHaveText('Bark Doge');
});

test ('Up to max level', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const help = new TestHelper(page);
    const board = new LeaderboardPage (page);
    
    await help.upLevel(9);
    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    expect(await home.getCurrentLevel()).toBe(10);
    expect(await home.getMaxLevel()).toBe(10);
    await home.goBLeaderBoard();
    await expect (board.levelNameLink).toHaveText('Supreme Doge');
});

test ('Level not decrease when buying ', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const help = new TestHelper(page);
    const board = new LeaderboardPage (page);
    const nav  = new NavigationMenu (page);
    const boost = new BoostsPage (page);

    await tg.topUp('6809402010', '500000');
    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    await expect(await home.currentBalance).toContainText("500,000")
    await expect(await home.earnPerTap).toContainText("5");
    await expect(await home.pawsToLevelUp).toContainText("500K")
    await expect(await home.getAvailableEnergy()).toEqual(3000)
    await expect(await home.getEnergyLimit()).toEqual(3000)
    await expect(await home.getCurrentLevel()).toEqual(5);
    await expect(await home.getMaxLevel()).toEqual(10);
    await home.goBLeaderBoard();
    await expect (board.levelNameLink).toHaveText('Woof Doge');
    await nav.goBack();
    await home.goBoost();
    await boost.buyMultitap();
    await boost.buy();
    await nav.goBack();
    await expect(await home.currentBalance).toContainText("498,976")
    await expect(home.earnPerTap).toContainText('6');
    await expect(await home.getCurrentLevel()).toEqual(5);
    await expect(home.pawsToLevelUp).toContainText("501K")
    await expect(await home.getAvailableEnergy()).toEqual(3000)
    await expect(await home.getEnergyLimit()).toEqual(3000)
});

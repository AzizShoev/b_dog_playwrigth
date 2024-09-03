import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { TelegramPage } from '../../pages/telegram.page';
import { TestHelper } from '../../helpers/helper';
import { RatingPage } from '../../pages/rating.page';
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
    const board = new RatingPage (page);
    
    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    console.log('Lavel name:', await home.getLevelName());
    console.log('current level:', await home.getCurrentLevel());
    console.log('max level:', await home.getMaxLevel());
    expect(await home.getLevelName()).toMatch('Puppy Doge');
    expect(await home.getCurrentLevel()).toEqual(1);
    expect(await home.getMaxLevel()).toEqual(10);
    await home.goRating();
    await expect (board.levelNameLink).toHaveText('Puppy Doge');
});

test ('Up to level 3', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const help = new TestHelper(page);
    const board = new RatingPage (page);
    
    await help.upLevel(2);
    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    expect(await home.getLevelName()).toMatch('Robot Doge');
    expect(await home.getCurrentLevel()).toEqual(3);
    expect(await home.getMaxLevel()).toEqual(10);
    await home.goRating();
    await expect (board.levelNameLink).toHaveText('Robot Doge');
});

test ('Up to max level', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const help = new TestHelper(page);
    const board = new RatingPage (page);
    
    await help.upLevel(9);
    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    expect(await home.getLevelName()).toMatch('Supreme Doge');
    expect(await home.getCurrentLevel()).toEqual(10);
    expect(await home.getMaxLevel()).toEqual(10);
    await home.goRating();
    await expect (board.levelNameLink).toHaveText('Supreme Doge');
});

test ('Up level from 1 to 2', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const help = new TestHelper(page);
    const board = new RatingPage (page);
    const nav  = new NavigationMenu (page);
    const boost = new BoostsPage (page);

    await tg.topUp('6809402010', '24999')
    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    expect(await home.currentBalance).toContainText("24,999")
    expect(await home.earnPerTap).toContainText("1");
    expect(await home.pawsToLevelUp).toContainText("1")
    expect(await home.getAvailableEnergy()).toEqual(1000)
    expect(await home.getEnergyLimit()).toEqual(1000)
    expect(await home.getLevelName()).toMatch('Puppy Doge');
    expect(await home.getCurrentLevel()).toEqual(1);
    expect(await home.getMaxLevel()).toEqual(10);
    await home.mine();
    await page.waitForTimeout(2000)
    expect(await home.currentBalance).toContainText("25,000")
    expect(await home.earnPerTap).toContainText("2");
    expect(await home.pawsToLevelUp).toContainText("25K")
    expect(await home.getAvailableEnergy()).toEqual(1500)
    expect(await home.getEnergyLimit()).toEqual(1500)
    expect(await home.getCurrentLevel()).toEqual(2);
    expect(await home.getMaxLevel()).toEqual(10);
    await home.goRating();
    await expect (board.levelNameLink).toHaveText('Samurai Doge');
});

test ('Up level from 9 to 10', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const help = new TestHelper(page);
    const board = new RatingPage (page);
    const nav  = new NavigationMenu (page);
    const boost = new BoostsPage (page);

    await tg.topUp('6809402010', '999999999')
    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    expect(await home.currentBalance).toContainText("999,999,999")
    expect(await home.earnPerTap).toContainText("9");
    expect(await home.pawsToLevelUp).toContainText("1")
    expect(await home.getAvailableEnergy()).toEqual(5000)
    expect(await home.getEnergyLimit()).toEqual(5000)
    expect(await home.getLevelName()).toMatch('Royal Doge');
    expect(await home.getCurrentLevel()).toEqual(9);
    expect(await home.getMaxLevel()).toEqual(10);
    await home.mine();
    await page.waitForTimeout(7000)
    expect(await home.currentBalance).toContainText("1,000,000,008")
    expect(await home.earnPerTap).toContainText("10");
    expect(await home.pawsToLevelUp).toContainText("0")
    expect(await home.getAvailableEnergy()).toEqual(5500)
    expect(await home.getEnergyLimit()).toEqual(5500)
    expect(await home.getLevelName()).toMatch('Supreme Doge');
    expect(await home.getCurrentLevel()).toEqual(10);
    expect(await home.getMaxLevel()).toEqual(10);
    await home.goRating();
    await expect (board.levelNameLink).toHaveText('Supreme Doge');
});

test ('Level not decrease when buying', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const help = new TestHelper(page);
    const board = new RatingPage (page);
    const nav  = new NavigationMenu (page);
    const boost = new BoostsPage (page);
    
    await tg.topUp('6809402010', '300000');
    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    expect(await home.currentBalance).toContainText("300,000")
    expect(await home.earnPerTap).toContainText("4");
    expect(await home.pawsToLevelUp).toContainText("200K")
    expect(await home.getAvailableEnergy()).toEqual(2500)
    expect(await home.getEnergyLimit()).toEqual(2500)
    expect(await home.getLevelName()).toMatch('Sporty Doge');
    expect(await home.getCurrentLevel()).toEqual(4);
    expect(await home.getMaxLevel()).toEqual(10);
    await home.goRating();
    await expect (board.levelNameLink).toHaveText('Sporty Doge');
    await nav.goBack();
    await help.buyMulitap();
    await nav.goBack();
    await expect(home.currentBalance).toContainText("298,976")
    await expect(home.earnPerTap).toContainText('5');
    expect(await home.getLevelName()).toMatch('Sporty Doge');
    expect(await home.getCurrentLevel()).toEqual(4);
    await expect(home.pawsToLevelUp).toContainText("201K")
    expect(await home.getAvailableEnergy()).toEqual(2500)
    expect(await home.getEnergyLimit()).toEqual(2500)
});

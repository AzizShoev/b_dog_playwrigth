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
    const help = new TestHelper(page);

    await help.openApp();
    console.log('Lavel name:', await home.getLevelName());
    console.log('current level:', await home.getCurrentLevel());
    console.log('max level:', await home.getMaxLevel());
    try {
        expect.soft(await home.getLevelName()).toMatch('Puppy Doge');
    } catch (error) {
        throw new Error('Level name is not as expected');
    }
    try {
        expect.soft(await home.getCurrentLevel()).toEqual(1);
    } catch (error) {
        throw new Error('Current level is not as expected');
    }
    try {
        expect.soft(await home.getMaxLevel()).toEqual(10);
    } catch (error) {
        throw new Error('Max level is not as expected');
    }
});

test ('Up to level 3', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const help = new TestHelper(page);
    const board = new RatingPage (page);
    
    await help.upLevel(2);
    await help.openApp();
    try {
        expect.soft(await home.getLevelName()).toMatch('Robot Doge');
    } catch (error) {
        throw new Error('Level name is not as expected');
    }
    try {
        expect.soft(await home.getCurrentLevel()).toEqual(3);
    } catch (error) {
        throw new Error('Current level is not as expected');
    }
});

test ('Up to max level', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const help = new TestHelper(page);
    const board = new RatingPage (page);
    
    await help.upLevel(9);
    await help.openApp();
    try {
        expect.soft(await home.getLevelName()).toMatch('Supreme Doge');
    } catch (error) {
        throw new Error('Level name is not as expected');
    }
    try {
        expect.soft(await home.getCurrentLevel()).toEqual(10);
    } catch (error) {
        throw new Error("Current level is not as expected");
    }
});

test ('Up level from 1 to 2', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const board = new RatingPage (page);
    const help = new TestHelper(page);

    await tg.topUp('6809402010', '24999')
    await help.openApp();
    await home.mine();
    await page.waitForTimeout(2000)
    try {
        expect.soft(await home.getLevelName()).toMatch('Samurai Doge');
    } catch (error) {
        console.log(error);
        throw new Error('Level name is not as expected');
    }
    try {
        expect.soft(await home.getCurrentLevel()).toEqual(2);
    } catch (error) {
        console.log(error);
        throw new Error("Current level is not as expected");
        
    }
});

test ('Up level from 2 to 3', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const board = new RatingPage (page);
    const help = new TestHelper(page);

    await tg.topUp('6809402010', '49998')
    await help.openApp();
    await home.mine();
    await page.waitForTimeout(2000)
    try {
        expect.soft(await home.getLevelName()).toMatch('Robot Doge');
    } catch (error) {
        throw new Error('Level name is not as expected');
    }
    try {
        expect.soft(await home.getCurrentLevel()).toEqual(3);
    } catch (error) {
        throw new Error("Current level is not as expected");
    }
});

test ('Up level from 3 to 4', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const board = new RatingPage (page);
    const help = new TestHelper(page);

    await tg.topUp('6809402010', '299997')
    await help.openApp();
    await home.mine();
    await page.waitForTimeout(2000)
    try {
        expect.soft(await home.getLevelName()).toMatch('Sporty Doge');
    } catch (error) {
        throw new Error('Level name is not as expected');
    }
    try {
        expect.soft(await home.getCurrentLevel()).toEqual(4);
    } catch (error) {
        throw new Error("Current level is not as expected");
    }
});

test ('Up level from 4 to 5', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const board = new RatingPage (page);
    const help = new TestHelper(page);

    await tg.topUp('6809402010', '499996')
    await help.openApp();
    await home.mine();
    await page.waitForTimeout(2000)
    try {
        expect.soft(await home.getLevelName()).toMatch('Pirate Doge');
    } catch (error) {
        throw new Error('Level name is not as expected');
    }
    try {
        expect.soft(await home.getCurrentLevel()).toEqual(5);
    } catch (error) {
        throw new Error("Current level is not as expected");
    }
});

test ('Up level from 5 to 6', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const board = new RatingPage (page);
    const help = new TestHelper(page);

    await tg.topUp('6809402010', '999995')
    await help.openApp();
    await home.mine();
    await page.waitForTimeout(2000)
    try {
        expect.soft(await home.getLevelName()).toMatch('Space Doge');
    } catch (error) {
        throw new Error('Level name is not as expected');
    }
    try {
        expect.soft(await home.getCurrentLevel()).toEqual(6);
    } catch (error) {
        throw new Error("Current level is not as expected");
    }
});

test ('Up level from 6 to 7', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const board = new RatingPage (page);
    const help = new TestHelper(page);

    await tg.topUp('6809402010', '9999994')
    await help.openApp();
    await home.mine();
    await page.waitForTimeout(2000)
    try {
        expect.soft(await home.getLevelName()).toMatch('Duke Doge');
    } catch (error) {
        throw new Error('Level name is not as expected');
    }
    try {
        expect.soft(await home.getCurrentLevel()).toEqual(7);
    } catch (error) {
        throw new Error("Current level is not as expected");
    }
});

test ('Up level from 7 to 8', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const board = new RatingPage (page);
    const help = new TestHelper(page);

    await tg.topUp('6809402010', '99999993')
    await help.openApp();
    await home.mine();
    await page.waitForTimeout(2000)
    try {
        expect.soft(await home.getLevelName()).toMatch('Alpha Doge');
    } catch (error) {
        throw new Error('Level name is not as expected');
    }
    try {
        expect.soft(await home.getCurrentLevel()).toEqual(8);
    } catch (error) {
        throw new Error("Current level is not as expected");
    }
});

test ('Up level from 8 to 9', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const board = new RatingPage (page);    
    const help = new TestHelper(page);

    await tg.topUp('6809402010', '499999992')
    await help.openApp();
    await home.mine();
    await page.waitForTimeout(2000)
    try {
        expect.soft(await home.getLevelName()).toMatch('Royal Doge');
    } catch (error) {
        throw new Error('Level name is not as expected');
    }
    try {
        expect.soft(await home.getCurrentLevel()).toEqual(9);
    } catch (error) {
        throw new Error("Current level is not as expected");
    }
});

test ('Up level from 9 to 10', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const help = new TestHelper(page);
    const board = new RatingPage (page);
    const nav  = new NavigationMenu (page);
    const boost = new BoostsPage (page);

    await tg.topUp('6809402010', '999999991')
    await help.openApp();
    await home.mine();
    await page.waitForTimeout(7000)
    try {
        expect.soft(await home.getLevelName()).toMatch('Supreme Doge');
    } catch (error) {
    throw new Error('Level name is not as expected');}
    try {
        expect.soft(await home.getCurrentLevel()).toEqual(10);
    } catch (error) {  
    throw new Error("Current level is not as expected");}
});

test ('Level not decrease when buying', async ({ page }) => {
    const home  = new HomePage (page);
    const tg  = new TelegramPage (page);
    const help = new TestHelper(page);
    const board = new RatingPage (page);
    const nav  = new NavigationMenu (page);
    const boost = new BoostsPage (page);
    
    await tg.topUp('6809402010', '300000');
    await help.openApp();
    await help.buyMulitap();
    await nav.goBack();
    try {
        expect.soft(await home.getLevelName()).toMatch('Sporty Doge');
    } catch (error) {
    throw new Error('Level name is not as expected');}
    try {
        expect.soft(await home.getCurrentLevel()).toEqual(4);
    } catch (error) {  
    throw new Error("Current level is not as expected");}
});

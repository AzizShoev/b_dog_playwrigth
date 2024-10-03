import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { TestHelper } from '../../helpers/helper';
import { TelegramPage } from '../../pages/telegram.page';
import { NavigationMenu } from '../../pages/navigation.page';
import { FriendsPage } from '../../pages/friends.page';
import { EarnPage } from '../../pages/earn.page';
import { TasksPage } from '../../pages/tasks.page';
import { RatingPage } from '../../pages/rating.page';
import { SettingsPage } from '../../pages/settings.page';
import { assert } from 'console';
import { beforeEach } from 'node:test';
import { Fixtures } from '@playwright/test';
import exp from 'constants';

test.use({
    storageState: 'LoginAuth2.json'
  });

  test.setTimeout(200000);

  
  test.beforeEach(async ({ page }) => {
    const tg  = new TelegramPage (page);
    const help = new TestHelper(page);
    await page.goto('https://web.telegram.org/a/#7250553721');
    await page.waitForTimeout(8000);
    await tg.checkErrorMessage();
    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
    await help.checkProfitMessage();
  })
  
  test('Visible page elements after refresh', async ({ page }) => {
    const tg = new TelegramPage (page);
    const home  = new HomePage (page);
    const nav  = new NavigationMenu (page);
    const help = new TestHelper(page);

  await expect(home.currentBalance).toBeVisible();  
  await expect(home.earnPerTap).toBeVisible();
  await expect(home.profitPerHour).toBeVisible();
  await expect(home.pawsToLevelUp).toBeVisible();
  await expect(home.energy).toBeVisible();
  await expect(nav.homeButton).toBeVisible();
  await expect(nav.homeButton).toBeEnabled();
  await expect(nav.earnButton).toBeVisible();
  await expect(nav.earnButton).toBeEnabled();
  await expect(nav.friendsButton).toBeVisible();
  await expect(nav.friendsButton).toBeEnabled();
  await expect(nav.tasksButton).toBeVisible();
  await expect(nav.tasksButton).toBeEnabled();
  await expect(home.ratingButton).toBeVisible();
  await expect(home.ratingButton).toBeEnabled();
  await expect(nav.settingsButton).toBeVisible();
  await expect(nav.settingsButton).toBeEnabled();
  await expect(home.ranks).toBeVisible();
  await expect(home.ranks).toBeEnabled();
  await nav.reloadApp();
  await help.checkProfitMessage();
  await expect(home.currentBalance).toBeVisible();  
  await expect(home.earnPerTap).toBeVisible();
  await expect(home.profitPerHour).toBeVisible();
  await expect(home.pawsToLevelUp).toBeVisible();
  await expect(home.energy).toBeVisible();
  await expect(nav.homeButton).toBeVisible();
  await expect(nav.homeButton).toBeEnabled();
  await expect(nav.earnButton).toBeVisible();
  await expect(nav.earnButton).toBeEnabled();
  await expect(nav.friendsButton).toBeVisible();
  await expect(nav.friendsButton).toBeEnabled();
  await expect(nav.tasksButton).toBeVisible();
  await expect(nav.tasksButton).toBeEnabled();
  await expect(home.ratingButton).toBeVisible();
  await expect(home.ratingButton).toBeEnabled();
  await expect(nav.settingsButton).toBeVisible();
  await expect(nav.settingsButton).toBeEnabled();
  await expect(home.ranks).toBeVisible();
  await expect(home.ranks).toBeEnabled();
});

test ('Go to Earn', async ({ page }) => {
    const nav  = new NavigationMenu (page);
    const earn = new EarnPage (page);

    await nav.goEarn();
    await page.waitForTimeout(2000);
    await expect(earn.welfareButton).toBeVisible();
    await expect(earn.welfareButton).toBeEnabled();
    await expect(earn.financeButton).toBeVisible();
    await expect(earn.financeButton).toBeEnabled();
    await expect(earn.specialCardsButton).toBeVisible();
    await expect(earn.specialCardsButton).toBeEnabled();
    await expect(earn.boostersButton).toBeVisible();
    await expect(earn.boostersButton).toBeEnabled();
});

test ('Go to Friends', async ({ page }) => {
    const friends  = new FriendsPage (page);
    const nav  = new NavigationMenu (page);

    await nav.goFriends();
    
    await expect(friends.inviteButton).toBeVisible();
    await expect(friends.inviteButton).toBeEnabled();
    await expect(friends.copyButton).toBeVisible();
    await expect(friends.copyButton).toBeEnabled();
    await expect(friends.bonusesButton).toBeVisible();
    await expect(friends.bonusesButton).toBeEnabled();
    await friends.pressFriendsButton();
    await expect(friends.refresheButton).toBeVisible();
    await expect(friends.refresheButton).toBeEnabled();
    await expect(friends.friendsButton).toBeVisible();
    await expect(friends.friendsButton).toBeEnabled();
});

test ('Go to Tasks', async ({ page }) => {
    const tasks  = new TasksPage (page);
    const nav  = new NavigationMenu (page);

    await nav.goTasks();
    await expect(tasks.tasksTabButton).toBeVisible();
    await expect(tasks.tasksTabButton).toBeEnabled();
    await expect(tasks.completedTabButton).toBeVisible();
    await expect(tasks.completedTabButton).toBeEnabled();
    // console.log('Total task count in task list -> '+ await tasks.tasks.count()); 
    // const tasksCount = await tasks.tasks.count();
    
    // for (let i = 0; i <= tasksCount-1; i++) {
    //     await expect(tasks.tasks.nth(i)).toBeVisible();
    //     await expect(tasks.tasks.nth(i)).toBeEnabled();
    //     console.log('Task '+ (i+1) +' name -> '+ await tasks.tasks.nth(i).locator(' h4').innerText());
    //     console.log('Task '+ (i+1) +' reward -> '+ parseInt((await tasks.tasks.nth(i).locator(' p').innerText()).replace(/[^\d.-]/g, '')));
    // }
});

test ('Go to Rating', async ({ page }) => {
    const nav  = new NavigationMenu (page);
    const home  = new HomePage (page);
    const lead = new RatingPage (page);

    await home.goRating();
    await expect(lead.levelNameLink).toBeVisible();
    await expect(lead.totalPAWS).toBeVisible();
    await expect(lead.totalPAWS).toBeEnabled();
    await expect(lead.hourlyPAWS).toBeVisible();
    await expect(lead.hourlyPAWS).toBeEnabled();
    await expect(lead.totalFriends).toBeVisible();
    await expect(lead.totalFriends).toBeEnabled();
    await expect(lead.leftAngleButton).toBeVisible();
    await expect(lead.leftAngleButton).toBeEnabled();
    await expect(lead.rightAngleButton).toBeVisible();
    await expect(lead.rightAngleButton).toBeEnabled();
});

test ('Go to Settings', async ({ page }) => {
    const nav  = new NavigationMenu (page);
    const set = new SettingsPage (page);
    await nav.goSettings();
    await expect(set.selectLanguageList).toBeVisible();
    await expect(set.selectLanguageList).toBeEnabled();
    await expect(set.contactEmail).toBeVisible();
    await expect(set.contactEmail).toBeEnabled();
    await expect(set.copyButton).toBeVisible();
    await expect(set.copyButton).toBeEnabled();
});
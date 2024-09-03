import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
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

test.use({
    storageState: 'LoginAuth2.json'
  });

  test.setTimeout(200000);

  
  test.beforeEach(async ({ page }) => {
    const tg  = new TelegramPage (page);
    await page.goto('https://web.telegram.org/a/#7250553721');
    await page.waitForTimeout(8000);
    await tg.checkErrorMessage();
    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(5000);
  })
  
  test('Visible page elements after refresh', async ({ page }) => {
    const tg = new TelegramPage (page);
    const home  = new HomePage (page);
    const nav  = new NavigationMenu (page);
    const friends  = new FriendsPage (page);

  await expect(home.ranks).toBeVisible();
  await expect(home.earnPerTap).toBeVisible();
  await expect(home.profitPerHour).toBeVisible();
  await expect(home.pawsToLevelUp).toBeVisible();
  await expect(nav.homeButton).toBeVisible();
  await expect(nav.earnButton).toBeVisible();
  await expect(nav.friendsButton).toBeVisible();
  await expect(nav.tasksButton).toBeVisible();
  await expect(home.ratingButton).toBeVisible();
  await expect(nav.settingsButton).toBeVisible();
  await nav.reloadApp();
  await page.waitForTimeout(1000);
  await expect(home.earnPerTap).toBeVisible();
  await expect(home.profitPerHour).toBeVisible();
  await expect(home.pawsToLevelUp).toBeVisible();
  await expect(nav.homeButton).toBeVisible();
  await expect(nav.earnButton).toBeVisible();
  await expect(nav.friendsButton).toBeVisible();
  await expect(nav.tasksButton).toBeVisible();
  await expect(home.ratingButton).toBeVisible();
  await expect(nav.settingsButton).toBeVisible();
});

test ('Go to Earn', async ({ page }) => {
    const nav  = new NavigationMenu (page);
    const earn = new EarnPage (page);

    await nav.earnButton.click();
    await page.waitForTimeout(2000);
    await expect(earn.welfareButton).toBeVisible();
    await expect(earn.financeButton).toBeVisible();
    await expect(earn.specialCardsButton).toBeVisible();
});

test ('Go to Friends', async ({ page }) => {
    const friends  = new FriendsPage (page);
    const nav  = new NavigationMenu (page);

    await nav.goFriends();
    
    await expect(friends.inviteButton).toBeVisible();
    await expect(friends.copyButton).toBeVisible();
    await expect(friends.bonusesButton).toBeVisible();
    await expect(friends.refresheButton).toBeVisible();
    await expect(friends.friendsButton).toBeVisible();
});

test ('Go to Tasks', async ({ page }) => {
    const tasks  = new TasksPage (page);
    const nav  = new NavigationMenu (page);

    await nav.goTasks();
    await expect(tasks.countTasks).toBeVisible()
    await expect(tasks.dailyRewardButton).toBeVisible();
    await expect(tasks.shareTgStoriesButton).toBeVisible();
    await expect(tasks.shareBdStorysButton).toBeVisible();
    await expect(tasks.supportBdSharingTgStory).toBeVisible();
    await expect(tasks.followXAccountButton).toBeVisible();
    await expect(tasks.subscribeYouTubeButton).toBeVisible();
    await expect(tasks.readNewsButton).toBeVisible();             0
});

test ('Go to Rating', async ({ page }) => {
    const nav  = new NavigationMenu (page);
    const home  = new HomePage (page);
    const lead = new RatingPage (page);

    await home.goRating();
    await expect(lead.levelNameLink).toHaveText('Puppy Doge');
    await expect(lead.totalPAWS).toBeVisible();
    await expect(lead.hourlyPAWS).toBeVisible();
    await expect(lead.totalFriends).toBeVisible();
    await expect(lead.leftAngleButton).toBeVisible();
    await expect(lead.rightAngleButton).toBeVisible();
});

test ('Go to Settings', async ({ page }) => {
    const nav  = new NavigationMenu (page);
    const set = new SettingsPage (page);
    await nav.goSettings();
    await expect(set.selectLanguageList).toBeVisible();
    await expect(set.contactEmail).toBeVisible();
    await expect(set.copyButton).toBeVisible();
});
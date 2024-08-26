import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { TelegramPage } from '../../pages/telegram.page';
import { NavigationMenu } from '../../pages/navigation.page';
import { FriendsPage } from '../../pages/friends.page';
import { EarnPage } from '../../pages/earn.page';
import { TasksPage } from '../../pages/tasks.page';
import { LeaderboardPage } from '../../pages/leaderboard.page';
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
    await tg.checkErrrorMessage();
    await tg.pressPlay();
    await tg.pressConfirm();
    await page.waitForTimeout(2000);
  })

  test.afterEach(async ({ page, browser }) => {
    const nav  = new NavigationMenu (page);
   if(!(await nav.closeButton.isVisible())) {
       await nav.goBack();
       await nav.closeApp();
   }else{
    await nav.closeApp();
}
  });
  
  test('Visible page elements after refresh', async ({ page }) => {
    const tg = new TelegramPage (page);
    const home  = new HomePage (page);
    const nav  = new NavigationMenu (page);
    const friends  = new FriendsPage (page);

  await expect(page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('banner').getByRole('img', { name: 'logo' })).toBeVisible();
  await expect(home.earnPerTap).toBeVisible();
  await expect(home.profitPerHour).toBeVisible();
  await expect(home.pawsToLevelUp).toBeVisible();
  await expect(nav.homeButton).toBeVisible();
  await expect(nav.earnButton).toBeVisible();
  await expect(nav.friendsButton).toBeVisible();
  await expect(nav.tasksButton).toBeVisible();
  await expect(home.leaderBoardButton).toBeVisible();
  await expect(nav.settingsButton).toBeVisible();
  await page.locator('#portals').getByLabel('More actions').click();
  await page.getByRole('menuitem', { name: ' Reload Page' }).click();
  await page.waitForTimeout(1000);
  await expect(page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('banner').getByRole('img', { name: 'logo' })).toBeVisible();
  await expect(home.earnPerTap).toBeVisible();
  await expect(home.profitPerHour).toBeVisible();
  await expect(home.pawsToLevelUp).toBeVisible();
  await expect(nav.homeButton).toBeVisible();
  await expect(nav.earnButton).toBeVisible();
  await expect(nav.friendsButton).toBeVisible();
  await expect(nav.tasksButton).toBeVisible();
  await expect(home.leaderBoardButton).toBeVisible();
  await expect(nav.settingsButton).toBeVisible();
});

test ('Go to Earn', async ({ page }) => {
    const nav  = new NavigationMenu (page);
    const earn = new EarnPage (page);

    await nav.earnButton.click();
    expect(earn.welfareButton.isVisible());
    expect(earn.financeButton.isVisible());
    expect(earn.specialCardsButton.isVisible());
});

test ('Go to Friends', async ({ page }) => {
    const friends  = new FriendsPage (page);
    const nav  = new NavigationMenu (page);

    await nav.goFriends();
    expect(friends.inviteButton.isVisible());
    expect(friends.copyButton.isVisible());
    expect(friends.bonusesButton.isVisible());
    expect(friends.refresheButton.isVisible());
    expect(friends.friendsButton.isVisible());
});

test ('Go to Tasks', async ({ page }) => {
    const tasks  = new TasksPage (page);
    const nav  = new NavigationMenu (page);

    await nav.goTasks();
    expect(tasks.countTasks.isVisible())
    expect(tasks.dailyRewardButton.isVisible());
    expect(tasks.shareTgStoriesButton.isVisible());
    expect(tasks.shareBdStorysButton.isVisible());
    expect(tasks.supportBdSharingTgStory.isVisible());
    expect(tasks.followXAccountButton.isVisible());
    expect(tasks.subscribeYouTubeButton.isVisible());
    expect(tasks.readNewsButton.isVisible());             0
});

test ('Go to Leaderboard', async ({ page }) => {
    const nav  = new NavigationMenu (page);
    const home  = new HomePage (page);
    const lead = new LeaderboardPage (page);

    await home.leaderBoardButton.click();
    expect(lead.levelNameLink.locator('h1').getByText('Puppy Doge')).toBeVisible();
    expect(lead.totalPAWS).toBeVisible();
    expect(lead.totalFriends).toBeVisible();
    expect(lead.leftAngleButton).toBeVisible();
    expect(lead.rightAngleButton).toBeVisible();
});

test ('Go to Settings', async ({ page }) => {
    const nav  = new NavigationMenu (page);
    const set = new SettingsPage (page);
    await nav.goSettings();
    expect(set.selectLanguageList).toBeVisible();
    expect(set.contactEmail).toBeVisible();
    expect(set.copyButton).toBeVisible();
});
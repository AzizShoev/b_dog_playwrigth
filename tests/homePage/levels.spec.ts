import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { TelegramPage } from '../../pages/telegram.page';
import { NavigationMenu } from '../../pages/navigation.page';
import { FriendsPage } from '../../pages/friends.page';
import { EarnPage } from '../../pages/earn.page';
import { TasksPage } from '../../pages/tasks.page';
import { LeaderboardPage } from '../../pages/leaderboard.page';
import { SettingsPage } from '../../pages/settings.page';
import { TestHelper } from '../../helpers/helper';
import { assert } from 'console';
import { beforeEach } from 'node:test';
import { Fixtures } from '@playwright/test';

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
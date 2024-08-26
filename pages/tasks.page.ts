import { Page } from '@playwright/test';

export class TasksPage {
  constructor(private page: Page) {}

    public countTasks = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('heading', { name: 'tasks' });

//Daily Reward list

    public dailyReward = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('div').filter({ hasText: 'Daily rewards+' }).nth(2);
 
    public dailyRewardButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('button').first();

//Task list

    public shareTgStories = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('div').filter({ hasText: /^Share in Telegram stories\+300,000$/ }).first();

    public shareBdStorys = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('div').filter({ hasText: /^Share BabyDoge’s birth story\+300,000$/ }).first();

    public supportBdSharingTgStory = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('div').filter({ hasText: /^Support BabyDoge by sharing Telegram story\+300,000$/ }).first();

    public followXAccount = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('div').filter({ hasText: /^Follow Our X Account\+5,000$/ }).first();

    public subscribeYouTube = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('div').filter({ hasText: /^Subscribe to Our YouTube Channel\+5,000$/ }).first();

    public readNews = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('div').filter({ hasText: /^Read Our News\+5,000$/ }).first();

//Task list buttons

    public shareTgStoriesButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('div').filter({ hasText: /^Share in Telegram stories\+300,000$/ }).first().locator('button');

    public shareBdStorysButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('div').filter({ hasText: /^Share BabyDoge’s birth story\+300,000$/ }).first().locator('button');

    public supportBdSharingTgStoryButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('div').filter({ hasText: /^Support BabyDoge by sharing Telegram story\+300,000$/ }).first().locator('button');

    public followXAccountButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('div').filter({ hasText: /^Follow Our X Account\+5,000$/ }).first().locator('button');

    public subscribeYouTubeButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('div').filter({ hasText: /^Subscribe to Our YouTube Channel\+5,000$/ }).first().locator('button');

    public readNewsButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('div').filter({ hasText: /^Read Our News\+5,000$/ }).first().locator('button');

//Modal window buttons

    public comebackTomorrowButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'Comeback tomorrow' });

    public shareButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'Share' });

    public joinButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'Join' });

    public closeModalButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'close' });

//Clicks

async pressTgStorys() {
  await this.shareTgStoriesButton.click();
}

async pressBdStorys() {
  await this.shareBdStorysButton.click();
}

async pressSupportBdSharingTgStory() {
  await this.supportBdSharingTgStoryButton.click();
}

async pressXAccount() {
  await this.followXAccountButton.click();
}

async pressYouTubeSubscribe() {
  await this.subscribeYouTubeButton.click();
}

async pressNews() {
  await this.readNewsButton.click();
}
async pressComebackTomorrow() {
  await this.comebackTomorrowButton.click();
}  

async pressShare() {
  await this.shareButton.click();
}

async pressJoin() {
  await this.joinButton.click();
}

async CloseModal() {
  await this.closeModalButton.click();
}
}
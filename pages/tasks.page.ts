import { Page } from '@playwright/test';

export class TasksPage {
  constructor(private page: Page) {}

    public currentBalance = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section h2')

    public tabsPanel = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('section >div:nth-child(2)')
    
    public tasksTabButton = this.tabsPanel.locator(' [value="tasks"]')
    
    public completedTabButton = this.tabsPanel.locator(' [value="completed"]')
//Daily Reward list

    public dailyReward = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('section >div:nth-child(3) >div:nth-child(2)');
 
    public dailyRewardButton = this.dailyReward.locator(' button');

    //Daily story share

    public dailyStoryTask = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('section >div:nth-child(3) >div:nth-child(3)');
    
    public dailyStoryTaskButton = this.dailyStoryTask.locator(' button');

    //Task list

    public taskList = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('section >div:nth-child(3) >div:nth-child(5) ');
    
    public tasks= this.taskList.locator(' >div >div'); //for test use nth()
    
    // public shareBabyDogeSong = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(1)');
    // public shareBabyDogeSongButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(1) button');

    // public laborDayUsa = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(2)');
    // public laborDayUsaButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(2) button');

    // public joinCoinNewsTelegram = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(3)');
    // public joinCoinNewsTelegramButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(3) button');

    // public subscribeBabyDogeKids = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(4)');
    // public subscribeBabyDogeKidsButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(4) button');

    // public joinTelegram = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(5)');
    // public joinTelegramButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(5) button');

    // public subscribeYoutube = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(6)');
    // public subscribeYoutubeButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(6) button');

    // public followX = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(7)');
    // public followXButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(7) button');

    // public singBinancePetition = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(8)');
    // public singBinancePetitionButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(8) button');

    // public watchBabyDogeKids = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(9)');
    // public watchBabyDogeKidsButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('main section >div:nth-of-type(5) >div> div:nth-child(9) button');

//Modal window buttons

    public comebackTomorrowButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'Comeback tomorrow' });

    public collectButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'Collect' });

    public shareButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div div div div>button:nth-child(4)');

    public goButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div div div div>button:nth-child(4)');

    public closeModalButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div div div div>button:nth-child(1)');

    public checkButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div div div div>button:nth-child(6)');

//Clicks

// async goShareBabyDogeSong() {
//   await this.shareBabyDogeSong.click();
// }

// async goLaborDay() {
//   await this.laborDayUsaButton.click();
// }

// async goJoinCoinNewsTelegram() {
//   await this.joinCoinNewsTelegramButton.click();
// }

// async goSubscribeBabyDogeKids() {
//   await this.subscribeBabyDogeKidsButton.click();
// }

// async goJoinTelegram() {
//   await this.joinTelegramButton.click();
// }

// async goSubscribeYoutube() {
//   await this.subscribeYoutubeButton.click();
// }
// async goFollowX() {
//   await this.followXButton.click();
// }  

// async goSingBinancePetition() {
//   await this.singBinancePetitionButton.click();
// }

// async goWatchBabyDogeKids() {
//   await this.watchBabyDogeKidsButton.click();
// }

async CloseModal() {
  await this.closeModalButton.click();
}

async pessGoModal() {
  await this.goButton.click();
}

async pressShareModal() {
  await this.shareButton.click();
}

async pressCheckModal() {
  await this.checkButton.click();
}
}
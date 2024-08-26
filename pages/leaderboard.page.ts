import { Page } from '@playwright/test';

export class LeaderboardPage {
    constructor(private page: Page) {}

    public levelNameLink = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('link', { name: 'Puppy Doge tooltip' })
    
    public totalPAWS = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByText('Total PAWS')
    
    public totalFriends = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByText('Total Friends')

    public leftAngleButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('img', { name: 'angle' }).first()

    public rightAngleButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('img', { name: 'angle' }).nth(1)




    async pressLevelNameLink() {
        await this.levelNameLink.click();
      }

      async pressTotalPAWS() {
        await this.totalPAWS.click();
      }

      async pressTotalFriends() {
        await this.totalFriends.click();
      }

      async pressLeftAngleButton() {
        await this.leftAngleButton.click();
      }

      async pressRightAngleButton() {
        await this.rightAngleButton.click();
      }
}
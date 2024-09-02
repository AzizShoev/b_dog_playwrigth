import { Page } from '@playwright/test';

export class FriendsPage {
  constructor(private page: Page) {}
 

 public refresheButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByAltText('refresh')
  
 public bonusesButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('label[for="bonuses"]')
 
 public friendsButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('label[for="friends"]')
 
 public inviteButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('section > div:nth-child(3) > button:nth-child(1)')
 
 public copyButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('section > div:nth-child(3) > button:nth-child(2)')
 


 

 async pressRefreshButton() {
    await this.refresheButton.click();
  }

  async pressBonusesButton() {
    await this.bonusesButton.click();
  }


 async pressFriendsButton() {
  await this.friendsButton.click();
}
async pressInviteButton() {
    await this.inviteButton.click();
  }

  async pressCopyButton() {
    await this.copyButton.click();
  }
 


}
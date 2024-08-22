import { Page } from '@playwright/test';

export class FriendsPage {
  constructor(private page: Page) {}
 

 public refresheButton =  this.page.frameLocator('iframe[title="QAlaksmzxcghoul123asd Web App"]').getByRole('img', { name: 'refresh' })
  
 public bonusesButton =  this.page.frameLocator('iframe[title="QAlaksmzxcghoul123asd Web App"]').getByText('Bonuses')
 
 public friendsButton =  this.page.frameLocator('iframe[title="QAlaksmzxcghoul123asd Web App"]').getByRole('main').getByText('Friends', { exact: true })
 
 public inviteButton =  this.page.frameLocator('iframe[title="QAlaksmzxcghoul123asd Web App"]').getByRole('button', { name: 'Invite a friend', exact: true })
 
 public copyButton =  this.page.frameLocator('iframe[title="QAlaksmzxcghoul123asd Web App"]').getByRole('button').nth(3)
 


 

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
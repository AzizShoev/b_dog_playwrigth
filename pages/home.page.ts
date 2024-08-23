import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}
 

 public mineButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('img', { name: 'doge' })
 
 public boostButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'Boost' })
 
 public earnPerTap = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByText('Earn per tap').locator('xpath=ancestor::div[1]/following-sibling::div//p');
 
 public profitPerHour =this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByText('Profit per hour').locator('xpath=ancestor::div[1]/following-sibling::div//p');
 
 public pawsToLevelUp = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByText('PAWS to level up').locator('xpath=ancestor::div[1]/following-sibling::div//p');
 
 public energy =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').first().locator('div').filter({ hasText: /^\d+\/\d+$/ }).first().innerText();
 
 public leaderBoardButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('link', { name: 'Go to Leaderboard' })
 
 public claimRewardButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'Сlaim your reward' })
 
 public currentBalance =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('heading', { name: /^[0-9,]+$/ })
 
 public closeButton =  this.page.locator("div[class='modal-header'] button[title='Close']")
 
public closeRewardButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'close' })
 
 
 
 
 

 
 

 async closeReward() {
  
  if (await this.claimRewardButton.isVisible) 
  await this.closeRewardButton.click();
else{console.log('reward window is not disaplyed')}
}
 async close() {
  await this.closeButton.click();
}

  async mine() {
    await this.mineButton.click();
  }

  async goBoost() {
    await this.boostButton.click();
  }

  async goBLeaderBoard() {
    await this.leaderBoardButton.click();
  }
 
  async obtainReward() {
    if (await this.claimRewardButton.isVisible) 
      console.log('reward window is  disaplyed');
   

    else{console.log('reward window is not disaplyed')}
  }

  async getBalance() {
    return await this.currentBalance.innerText()
  }
  async getEarnPerTap() {
    return await this.earnPerTap.innerText()
  }

  async getAvailableEnergy() {
    const availableEnergy = (await this.energy).split('/')[0];
     return availableEnergy
  }

  async getEnergyLimit() {
    const energyLimit = (await this.energy).split('/')[1];
     return energyLimit
  }

  async getPawsToLevelUp() {
    return await this.pawsToLevelUp.innerText()
  }
  async getProfitPerHour() {
    return await this.profitPerHour.innerText()
  }


}
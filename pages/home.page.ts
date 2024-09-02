import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}
 

 public mineButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('img', { name: 'doge' })
 
 public boostButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'Boost' })
 
 public earnPerTap = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByText('Earn per tap').locator('xpath=ancestor::div[1]/following-sibling::div//p');
 
 public profitPerHour =this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByText('Profit per hour').locator('xpath=ancestor::div[1]/following-sibling::div//p');
 
 public pawsToLevelUp = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByText('PAWS to level up').locator('xpath=ancestor::div[1]/following-sibling::div//p');
 
 //public energy =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').first().locator('div').filter({ hasText: /^\d+\/\d+$/ }).first();
 
 public energy = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app main section > div:nth-child(3) p').first()
 
 public ranks =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app header a[href="/ranks"]')
 
 public levels = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app section div div p span').first()

 public claimRewardButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'Сlaim your reward' })
 
 public currentBalance =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('heading', { name: /^[0-9,]+$/ })

 //public currentBalance =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app main h2')
 
 public closeButton =  this.page.locator("div[class='modal-header'] button[title='Close']")

 public closeRewardButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'close' })
 
 public ratingButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'Rating' })
 
 
 

 
 

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

  async goRanks() {
    await this.ranks.click();
  }

  async goRating() {
    await this.ratingButton.click();
  }
 
  async obtainReward() {
    if (await this.claimRewardButton.isVisible) 
      console.log('reward window is  disaplyed');
   

    else{console.log('reward window is not disaplyed')}
  }

  async getBalance() {
    return parseInt((await this.currentBalance.innerText()).replace(/,/g, ''));
  }
  async getEarnPerTap() {
    return parseInt(await this.earnPerTap.innerText())
  }

  public async getEnergyText() {
    return await this.energy.innerText();
  }

  async getAvailableEnergy() {
    const energyText = await this.getEnergyText();
    const [availableEnergy, energyLimit] = energyText.split('/');
     return parseInt(availableEnergy);
  }

  async getEnergyLimit() {
    const energyText = await this.getEnergyText();
    const [availableEnergy, energyLimit] = energyText.split('/');
     return parseInt(energyLimit);
  }

  async getPawsToLevelUp() {
    return await this.pawsToLevelUp.innerText()
  }
  async getProfitPerHour() {
    return parseInt((await this.profitPerHour.innerText()).replace(/\D/g, ''))
  }

  async getLevelText() {
    return await this.levels.innerText()
}

  async getCurrentLevel() {
    const levelText = await this.getLevelText();
    const [currentLevel, maxLevel] = levelText.split('/');
    return parseInt(currentLevel);
}

  async getMaxLevel() {
    const levelText = await this.getLevelText();
    const [currentLevel, maxLevel] = levelText.split('/');
    return parseInt(maxLevel);
}

}
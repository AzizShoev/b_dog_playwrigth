import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}
 

 public mineButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app main section [alt="doge"]')
 
 public earnPerTap = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app header >div:nth-child(3) p:nth-child(2)').first();
 
 public profitPerHour =this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app header >div:nth-child(3) div > div:nth-child(2) div p:nth-child(2)')
 
 public pawsToLevelUp = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app header >div:nth-child(3) div:nth-child(3) p:nth-child(2)')
 
 public boostButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('[data-testid="boost_button"]')
 
 //public energy =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').first().locator('div').filter({ hasText: /^\d+\/\d+$/ }).first();
 
 public energy = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app main section > div:nth-child(4) p').first()
 
 public ranks =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app header a[href="/ranks"]')
 
 public levelName = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app header div div a span').first()

 public levels =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('a[href*="/ranks"] span:nth-of-type(2)')
 
 public claimRewardButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'Сlaim your reward' })
 
 public currentBalance =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('heading', { name: /^[0-9,]+$/ })

 //public currentBalance =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app main h2')
 
 public closeButton =  this.page.locator("div[class='modal-header'] button[title='Close']")

 public closeRewardButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'close' })
 
 public ratingButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app [href="/leaderboard"]')
 
 public profitByAwayMessage = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div div:nth-child(2)').first()
 
 public profitByAwayButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div div:nth-child(1) button:nth-of-type(2)')
 
 public profitByAwayCloseButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div div:nth-child(1) button:nth-of-type(1)')
 
 public profitByAway = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app> div:nth-child(1) div:nth-child(3) p').first()

 public promoInvite = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app >div:nth-child(1) button:nth-child(1)').last()

 public promoCopy = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app >div:nth-child(1) button:nth-child(2)')

 public promoJoin = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app >div button:nth-of-type(2) span')

 public promoClose = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app button [alt="close"]')
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

  async goRanks() {
    await this.ranks.click();
  }

  async goRating() {
    await this.ratingButton.click();
  }

  async goBoosts() {
    await this.boostButton.click();
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
  
 async getLevelName() {
    return await this.levelName.innerText();
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

async getProfitByAway() {
  return parseInt((await this.profitByAway.innerText()).replace(',', ''))
}
async getProfitByAwayMessage() {
  return await this.profitByAwayMessage.innerText()
}
async pressProfitByAwayOk() {
  await this.profitByAwayButton.click()
}
async pressProfitByAwayClose() {
  await this.profitByAwayCloseButton.click()
}

async pressPromoInvite() {
  await this.promoInvite.click()
}
async pressPromoCopy() {
  await this.promoCopy.click()
}
async pressPromoJoin() {
  await this.promoJoin.click()
}
async pressPromoClose() {
  await this.promoClose.click()
}
}
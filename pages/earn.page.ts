import { Page } from '@playwright/test';

export class EarnPage {
  constructor(private page: Page) {}
 
 public currentBalance = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app main h2')

 public welfareButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('label[for="Welfare"]')
 
 public specialCardsButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('label[for="Special Cards"]')
 
 public financeButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('label[for="Finance"]');
 
 //Cards
//use nth(1-~)
 public card = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app main section > div:nth-child(3) > div > div')
 
 public cardName = this.card.locator('>div >div div:nth-child(2) p').first()

 public cardProfit = this.card.locator(' div div:nth-child(2) div div p')

 public cardPrice = this.card.locator(' div >div:nth-child(2) button div')

 public openCardButton = this.card.locator(' div >div:nth-child(2) button')

 public cardLevel = this.card.locator('>div>div:nth-child(2) p').first()

 //Card modal

 public cardNameModal = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div:nth-child(3) h1')

 public currentProfitModal = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div:nth-child(4) div div p').first()

 public upProfitModal = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div:nth-child(4) div div span')

 public costModal = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div:nth-child(5) div p').first()
 
 public buyButtonModal = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'Buy' })

 public upgradeButtonModal = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'Upgrade' })

 public closeCardButtonModal = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'close' })

 public lowBalanceSing = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div:nth-child(6) span')
 
 
 async getBalance() {
   return parseInt((await this.currentBalance.innerText()).replace(',', ''));
 }
 
 async buyCard() {
    await this.buyButtonModal.click();
  }

  async upgradeCard() {
    await this.upgradeButtonModal.click();
  }
  async openSwapCard() {
    await this.openCardButton.click();
  }

 async pressWelfare() {
  await this.welfareButton.click();
}
async pressSpecialCardsButton() {
    await this.specialCardsButton.click();
  }

  async pressFinance() {
    await this.financeButton.click();
  }
 async closeCard() {
  await this.closeCardButtonModal.click();
}
 
//Cards

async getCardName() {
  return await this.cardName.innerText();
}
async getCardProfit() {
  return parseInt((await this.cardProfit.innerText()).replace(/\D/g, ''));
}
async getCardPrice() {
  return parseInt((await this.cardPrice.innerText()).replace(',', ''));
}

async getCardLevel() {
  return await this.cardLevel.innerText();
}

async getCardNameModal() {
  return await this.cardNameModal.innerText();
}

async getCurrentProfitModal() {
  return parseInt((await this.currentProfitModal.innerText()).replace(',', ''));
}

async getUpProfitModal() {
  return parseInt((await this.upProfitModal.innerText()).replace(/\D/g, ''));
}

async getCostModal() {
  return parseInt((await this.costModal.innerText()).replace(',', ''));
}

async getLowBalanceSing() {
  return parseInt((await this.lowBalanceSing.innerText()).replace(/\D/g, ''));
}


}
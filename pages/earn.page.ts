import { Page } from '@playwright/test';

export class EarnPage {
  constructor(private page: Page) {}
 

 public welfareButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByText('Welfare')
 
 public specialCardsButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByText('Special Cards')
 
 public financeButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByText('Finance');
 
 //Cards
//use nth(1-~)
 public card = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app main section > div:nth-child(3) > div > div > div')
 
 public cardName = this.card.locator('>div >div div:nth-child(2) p').first()

 public cardProfit = this.card.locator('>div >div div:nth-child(2) p').nth(3)

 public cardPrice = this.card.locator('>div >div:nth-child(2) button div')

 public openCardButton = this.card.locator('>div >div:nth-child(2) button')

 //Card modal

 public cardNameModal = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div:nth-child(3) h1')

 public currentProfitModal = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div:nth-child(4) div div p').first()

 public upProfitModal = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div:nth-child(4) div div span')

 public buyButtonModal = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'Buy' })

 public closeCardButtonModal = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button', { name: 'close' })

 async buyCard() {
    await this.buyButtonModal.click();
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

}
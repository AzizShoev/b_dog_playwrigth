import { Page } from '@playwright/test';

export class EarnPage {
  constructor(private page: Page) {}
 

 public welfareButton =  this.page.frameLocator('iframe[title="QAlaksmzxcghoul123asd Web App"]').getByText('Welfare')
 
 public specialCardsButton =  this.page.frameLocator('iframe[title="QAlaksmzxcghoul123asd Web App"]').getByText('Special Cards')
 
 public financeButton = this.page.frameLocator('iframe[title="QAlaksmzxcghoul123asd Web App"]').getByText('Finance');
 
 public closeCardButton = this.page.frameLocator('iframe[title="QAlaksmzxcghoul123asd Web App"]').getByRole('button', { name: 'close' })

 public OpenSwapCardButton = this.page.frameLocator('iframe[title="QAlaksmzxcghoul123asd Web App"]').getByRole('button', { name: '500 coin_logo' }).nth(2)

 public BuySwapCard = this.page.frameLocator('iframe[title="QAlaksmzxcghoul123asd Web App"]').getByRole('button', { name: 'Buy' })
 


 async buyCard() {
    await this.BuySwapCard.click();
  }

  async OpenSwapCard() {
    await this.OpenSwapCardButton.click();
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
  await this.closeCardButton.click();
}
 

}
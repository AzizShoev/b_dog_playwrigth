import { Page } from '@playwright/test';

export class BoostsPage {
  constructor(private page: Page) {}

  public buyMultitapButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#payable_boosts div button:nth-child(1) button')

  public multitapLevel = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#payable_boosts div button:nth-child(1) div div div:nth-child(1) p')

  public buyEnergyButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#payable_boosts div button:nth-child(2) button')

  public energyLevel = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#payable_boosts div button:nth-child(2) div div div:nth-child(1) p')

  public buyButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('//button[./div/span[text()=\'/Buy\']]').getByText('Buy')

  public closeModalButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('button img[alt="close"]')
  
  async buyMultitap() {
    await this.buyMultitapButton.click();
  }

  async buyEnergy() {
    await this.buyEnergyButton.click();
}

async getEnergyLevel() {
  await this.energyLevel.innerText();
}

async getMultitapLevel() {
  await this.multitapLevel.innerText();
}

async buy(){
  await this.buyButton.click();
}

async closeModal(){
    await this.closeModalButton.click();
}

}
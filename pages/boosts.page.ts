import { Page } from '@playwright/test';

export class BoostsPage {
  constructor(private page: Page) {}
  public boostersTab = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('label[for="booster"]')
  
  public multitap = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#payable_boosts button').first();
  
  public buyMultitapButton = this.multitap.locator('button').first();

  public multitapLevel = this.multitap.locator('div div div:nth-child(1) p').first();

  public energyLimit = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#payable_boosts button:nth-child(2)')

  public buyEnergyButton = this.energyLimit.locator('button')

  public energyLevel = this.energyLimit.locator('div div div:nth-child(1) p')

  public buyButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app main >div >div div button')

  public closeModalButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('button img[alt="close"]')

  public currentBalance = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app main div div:nth-child(3) div:nth-child(2) p')
  
  public lowBalanceSing = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app main >div >div div button')
  
  //DailyBoosts

  public dailyBoostersTab = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('label[for="daily"]')

  public fullEnergyBoost = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app main >div:nth-of-type(1) button').first();

  public fullEnergyGetButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app main >div:nth-of-type(1) button button');

  public turboBooster = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app main >div:nth-of-type(1) button:nth-child(2)');

  //Daily booster modal

  public inviteFriendsModalButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div div:nth-of-type(4) button:nth-child(1)');

  public copyModalButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app div div:nth-of-type(4) button:nth-child(2)');

  public useFreeBoostButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app >div:nth-of-type(1)  button:nth-of-type(2)').last();

  public buyEnergyModalButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app >div:nth-of-type(1) div:nth-child(6) button');
  
  // public dailyTaskLvl1 = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('[needtoinvite="0"]');

  // public dailyTaskLvl2 = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('[needtoinvite="1"]');

  // public dailyTaskLvl3 = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('[needtoinvite="4"]');
 async goDailyBoostsTab() {
    await this.dailyBoostersTab.click();
  }

  async goBoostersTab() {
    await this.boostersTab.click();
  }
 
  async buyMultitap() {
    await this.buyMultitapButton.click();
  }

  async buyEnergy() {
    await this.buyEnergyButton.click();
}

async getEnergyLevel() {
  return await this.energyLevel.innerText();
}

async getEnergyPrice() {
  return parseInt((await this.buyEnergyButton.innerText()).replace(',', ''));
}

async getMultitapLevel() {
  return await this.multitapLevel.innerText();
}

async getMultitapPrice() {
  return parseInt((await this.buyMultitapButton.innerText()).replace(',', ''));
}

async buy(){
  await this.buyButton.click();
}

async getLowBalanceSing(){
  return await this.lowBalanceSing.textContent();
}

async closeModal(){
    await this.closeModalButton.click();
}

}
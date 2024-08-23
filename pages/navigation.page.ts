import { Page } from '@playwright/test';

export class NavigationMenu {
  constructor(private page: Page) {}
 
 
 
  public homeButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('link', { name: 'menu Home' })
 
  public earnButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('link', { name: 'menu Earn' })
 
  public friendsButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('link', { name: 'menu Friends' })
 
  public tasksButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('link', { name: 'menu Tasks' })
 
  public settingsButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('link', { name: 'setting' })
 
  public backButton =  this.page.getByLabel('Back')
 
  public closeButton =  this.page.getByRole('button', { name: 'Close' })

 
 async goBack() {
    await this.backButton.click();
  }

  async goHome() {
    await this.homeButton.click();
  }

  async goEarn() {
    await this.earnButton.click();
  }

  async goFriends() {
    await this.friendsButton.click();
  }

  async goTasks() {
    await this.tasksButton.click();
  }
  async goSettings() {
    await this.settingsButton.click();
  }
}
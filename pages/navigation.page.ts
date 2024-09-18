import { Page } from '@playwright/test';

export class NavigationMenu {
  constructor(private page: Page) {}
 
 
 
  public homeButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('[href ="/"]')
 
  public earnButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('[href ="/earn"]')
 
  public friendsButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('[href ="/friends"]')
 
  public tasksButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('[href ="/tasks"]')
 
  public settingsButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('[href ="/setting"]')

  public ratingButton =  this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').locator('#app [href="/leaderboard"]')
 
  public backButton =  this.page.getByLabel('Back')
 
  public closeButton =  this.page.getByRole('button', { name: 'Close' })

  public headerButton = this.page.locator('.modal-header div button')

  public reloadPage = this.page.locator('.modal-header div [role="presentation"]')
  
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

  async goRating() {
    await this.ratingButton.click();
  }
  async goSettings() {
    await this.settingsButton.click();
  }
  async closeApp() {
    await this.closeButton.click();
  }
  async reloadApp() {
    await this.headerButton.click();
    await this.reloadPage.click();
  }

}
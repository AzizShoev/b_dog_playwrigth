import { Page } from '@playwright/test';

export class SkinsPage {
  constructor(private page: Page) {}


  public allSkinsTab = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByAltText('label[for="all"]') 

  public mySkinsTab = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByAltText('label[for="my"]')
}
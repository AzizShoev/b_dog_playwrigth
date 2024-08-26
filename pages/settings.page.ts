import { Page } from '@playwright/test';

export class SettingsPage {
  constructor(private page: Page) {}

  public selectLanguageList = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByText('Select language')

  public contactEmail = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('link', { name: 'ads@babydoge.com' })

  public copyButton = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByRole('button').nth(1)

  public search = this.page.frameLocator('iframe[title="stage_vnqwoeivnq_bot Web App"]').getByPlaceholder('Search')

  async selectLanguage(language: string) {
    await this.selectLanguageList.click();
    await this.search.fill(language);
    await this.page.locator('.absolute div').nth(1).click();
  }

  async pressEmail() {
    await this.contactEmail.click();
  }

  async pressCopyButton() {
    await this.copyButton.click();
  }
}
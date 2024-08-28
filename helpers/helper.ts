import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { TelegramPage } from '../pages/telegram.page';

export class TestHelper {
    private page: Page;
    constructor(page) {
        this.page = page;
    }

    public async upLevel(countClick) {
        const tg = new TelegramPage(this.page);
        await tg.pressLevel()
        await tg.pressLevelUp(countClick)
        await expect(this.checkLastTgMessage('Current level ' + (countClick + 1)) + '').toBeTruthy();
    }

    public async downLevel(countClick) {
        const tg = new TelegramPage(this.page);
        await tg.pressLevel()
        await tg.pressLevelDown(countClick)
        await expect(this.checkLastTgMessage('Current level ' + (countClick + 1)) + '').toBeTruthy();
    }

    public async refresh() {
        const tg = new TelegramPage(this.page);
        await tg.writeMessage('/start');
        await tg.sendMessage();
        await this.page.waitForTimeout(10000);
        await tg.pressQaPanel();
        await this.page.waitForTimeout(3000);
        await tg.pressRefresh();
    }

   public async checkPreLastTgMessage(message) {
        await expect(this.page.locator('(//div[contains(@class, "message-content")])[last()-2]/div/div').first()).toContainText(message);
    }
    public async checkLastTgMessage(message) {
        await expect(this.page.locator('(//div[contains(@class, "message-content")])[last()]/div/div').first()).toContainText(message);
    }
}
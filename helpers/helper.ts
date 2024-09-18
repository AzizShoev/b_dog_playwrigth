import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { TelegramPage } from '../pages/telegram.page';
import { RatingPage } from '../pages/rating.page';
import { NavigationMenu } from '../pages/navigation.page';
import { BoostsPage } from '../pages/boosts.page';
import { HomePage } from '../pages/home.page';

export class TestHelper {
    private page: Page;
    constructor(page) {
        this.page = page;
    }

    public async openApp() {
        const tg = new TelegramPage(this.page);
        await tg.checkErrorMessage();
        await tg.pressPlay();
        await tg.pressConfirm();
        await this.page.waitForTimeout(5000);
    }

    public async upLevel(countClick) {
        const tg = new TelegramPage(this.page);
        await tg.pressLevel()
        await this.page.waitForTimeout(2000);
        await tg.pressLevelUp(countClick)
        await this.page.waitForTimeout(7000);
        expect(await this.checkPreLastTgMessage('Current level ' + (countClick + 1)) + '').toBeTruthy();
        await tg.pressBackToQaPanel();
    }


    public async downLevel(countClick) {
        const tg = new TelegramPage(this.page);
        await tg.pressLevel()
        await this.page.waitForTimeout(2000);
        await tg.pressLevelDown(countClick)
        await this.page.waitForTimeout(7000);
        expect(await this.checkPreLastTgMessage('Current level ' + (countClick + 1)) + '').toBeTruthy();
        await tg.pressBackToQaPanel();
    }

    public async upHour(countClick: number) {
        const tg = new TelegramPage(this.page);
        await tg.pressCardsProfit()
        await this.page.waitForTimeout(2000);
        await tg.pressUpHour(countClick)
        await tg.pressBackToQaPanel();
    }

    public async refresh() {
        const tg = new TelegramPage(this.page);
        const lastMessageStart = await this.page.locator('.bottom-marker[data-message-id]').last();
        await tg.writeMessage('/start');
        await tg.sendMessage();
        const lastMessageStartId = await lastMessageStart.getAttribute('data-message-id') ?? '';
        const nextMessageId = parseInt(lastMessageStartId) + 2;
        await this.page.waitForSelector(`.bottom-marker[data-message-id="${nextMessageId}"]`, { state: 'attached' });
        await tg.pressQaPanel();
        await this.page.waitForTimeout(3000);
        await tg.pressRefresh();
        await this.page.waitForSelector(`.bottom-marker[data-message-id="${nextMessageId + 2}"]`, { state: 'attached' });
    }

    public async buyMulitap() {
        const home  = new HomePage (this.page);
        const boost = new BoostsPage (this.page);
        await home.goBoost();
        await boost.buyMultitap();
        await boost.buy();
    }

    public async buyEnergy() {
        const home  = new HomePage (this.page);
        const boost = new BoostsPage (this.page);
        await home.goBoost();
        await boost.buyEnergy();
        await boost.buy();
    }

   public async checkPreLastTgMessage(message) {
        await expect(this.page.locator('(//div[contains(@class, "message-content")])[last()-2]/div/div').first()).toContainText(message);
    }
    public async checkLastTgMessage(message) {
        await expect(this.page.locator('(//div[contains(@class, "message-content")])[last()]/div/div').first()).toContainText(message);
    }
}
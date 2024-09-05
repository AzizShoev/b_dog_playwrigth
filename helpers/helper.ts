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

    public async upLevel(countClick) {
        const tg = new TelegramPage(this.page);
        await tg.pressLevel()
        await this.page.waitForTimeout(2000);
        await tg.pressLevelUp(countClick)
        await this.page.waitForTimeout(7000);
        await expect(this.checkPreLastTgMessage('Current level ' + (countClick + 1)) + '').toBeTruthy();
        await tg.pressBackToQaPanel();
    }


    public async downLevel(countClick) {
        const tg = new TelegramPage(this.page);
        await tg.pressLevel()
        await this.page.waitForTimeout(2000);
        await tg.pressLevelDown(countClick)
        await this.page.waitForTimeout(7000);
        await expect(this.checkPreLastTgMessage('Current level ' + (countClick + 1)) + '').toBeTruthy();
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
        await tg.writeMessage('/start');
        await tg.sendMessage();
        await this.page.waitForTimeout(10000);
        await tg.pressQaPanel();
        await this.page.waitForTimeout(3000);
        await tg.pressRefresh();
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

    public async checkProfitByAway(profitMin: number, profitMax: number) {
        const home  = new HomePage (this.page);
        await home.profitByAwayMessage.isVisible();
        expect(await home.getProfitByAway()).toBeGreaterThanOrEqual(profitMin);
        expect(await home.getProfitByAway()).toBeLessThanOrEqual(profitMax);
        await home.pressProfitByAwayOk();
    }
}
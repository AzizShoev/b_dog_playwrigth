import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { TelegramPage } from '../pages/telegram.page';
import { RatingPage } from '../pages/rating.page';
import { NavigationMenu } from '../pages/navigation.page';
import { BoostsPage } from '../pages/boosts.page';
import { HomePage } from '../pages/home.page';
import { EarnPage } from '../pages/earn.page';

export class TestHelper {
    private page: Page;
    constructor(page) {
        this.page = page;
    }

    public async openApp() {
        const tg = new TelegramPage(this.page);
        const nav = new NavigationMenu (this.page);
        await tg.checkErrorMessage();
        await tg.pressPlay();
        await tg.pressConfirm();
        await this.page.waitForTimeout(5000);
        await nav.reloadApp();
    }
    public async upLevel(countClick) {
        const tg = new TelegramPage(this.page);
        await tg.pressLevel()
        await this.page.waitForTimeout(2000);
        await tg.pressLevelUp(countClick)
        await this.page.waitForTimeout(7000);
        await tg.pressBackToQaPanel();
    }


    public async downLevel(countClick) {
        const tg = new TelegramPage(this.page);
        await tg.pressLevel()
        await this.page.waitForTimeout(2000);
        await tg.pressLevelDown(countClick)
        await this.page.waitForTimeout(7000);
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
        await this.page.waitForSelector(`.bottom-marker[data-message-id="${nextMessageId + 1}"]`, { state: 'attached' });
        await tg.pressRefresh();
        await this.page.waitForSelector(`.bottom-marker[data-message-id="${nextMessageId + 2}"]`, { state: 'attached' });
    }

    public async buyMulitap() {
        const boost = new BoostsPage (this.page);
        const home = new HomePage (this.page);
        await home.goBoosts();
        await boost.goBoostersTab();
        await boost.buyMultitap();
        await boost.buy();
        await this.page.waitForTimeout(2000);
    }

    public async buyEnergy() {
        const boost = new BoostsPage (this.page);
        const home = new HomePage (this.page);
        await home.goBoosts();
        await boost.goBoostersTab();
        await boost.buyEnergy();
        await boost.buy();
        await this.page.waitForTimeout(2000);
    }

   public async checkPreLastTgMessage() {
        const lastMessageStart = await this.page.locator('.bottom-marker[data-message-id]').last();
        const lastMessageStartId = await lastMessageStart.getAttribute('data-message-id') ?? '';
        const nextMessageId = parseInt(lastMessageStartId) - 1;
        const preLastMessage = await this.page.waitForSelector(`[data-message-id="${nextMessageId}"] .message-content .text-content`, { state: 'attached' });
        return (await preLastMessage.innerText()).replace(/\d{2}:\d{2}/, '').trim();
    }
    public async checkLastTgMessage() {
        const lastMessageStart = await this.page.locator('.bottom-marker[data-message-id]').last();
        const lastMessageStartId = await lastMessageStart.getAttribute('data-message-id') ?? '';
        const nextMessageId = parseInt(lastMessageStartId);
        const lastMessage = await this.page.waitForSelector(`[data-message-id="${nextMessageId}"] .message-content .text-content`, { state: 'attached' });
        return (await lastMessage.innerText()).replace(/\d{2}:\d{2}/, '').trim();
    }

    public async mineTap(tap : number) {
        const home  = new HomePage (this.page);
        for (let i = 0; i < tap; i++) {
            await home.mine();
        }
    }

    public async checkProfitMessage() {
        const home  = new HomePage (this.page);
        await this.page.waitForTimeout(2000);
        if(await home.profitByAwayMessage.isVisible()) {
            await home.pressProfitByAwayClose();
        }else{return}
    }
}
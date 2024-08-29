import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { TelegramPage } from '../pages/telegram.page';
import { LeaderboardPage } from '../pages/leaderboard.page';
import { NavigationMenu } from '../pages/navigation.page';
import { BoostsPage } from '../pages/boosts.page';
import { HomePage } from '../pages/home.page';
import { EarnPage } from '../pages/earn.page';

export class EarnHelper {
    private page: Page;
    constructor(page) {
        this.page = page;
    }

    async checkCard(cardsNum: number) {
        const earn = new EarnPage(this.page);
        const cardSelector = `> div:nth-child(${cardsNum})`;
        const specificCard = earn.card.locator(cardSelector);
        return specificCard;
    }

async checkCardName(cardsNum: number) {
    const earn = new EarnPage(this.page);
    const cardSelector = `> div:nth-child(${cardsNum})`;
    const specificCard = earn.card.locator(cardSelector); 
    const specificCardName = specificCard.locator('> div > div div:nth-child(2) p').first();

    return await specificCardName.innerText();
}

async checkCardsProfit(cardsNum : number) {
    const earn = new EarnPage(this.page);
    const card = earn.card.locator(`> div:nth-child(${cardsNum})`);
    
    card.locator('>div >div div:nth-child(2) p').nth(3);
    return await earn.getCardProfit();
}

async checkCardPrice(cardsNum : number) {
    const earn = new EarnPage(this.page);
    const card = earn.card.locator(`> div:nth-child(${cardsNum})`);
    
    card.locator('>div >div:nth-child(2) button div').nth(4);
    return await earn.getCardPrice();
}


}
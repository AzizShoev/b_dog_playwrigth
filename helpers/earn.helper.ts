import { Page } from '@playwright/test';
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
    const cardSelector = `> div:nth-child(${cardsNum})`;
    const specificCard = earn.card.locator(cardSelector);
    const specificProfit = specificCard.locator(' div:nth-child(2) div div p');

    return parseInt((await specificProfit.innerText()).replace(/[^\d.-]/g, ''));
}

async checkCardPrice(cardsNum : number) {
    const earn = new EarnPage(this.page);
    const cardSelector = `> div:nth-child(${cardsNum})`;
    const specificCard = earn.card.locator(cardSelector);
    const specificPrice = specificCard.locator('>div >div:nth-child(2) button div');

    return  parseInt((await specificPrice.innerText()).replace(',', ''));
}

async checkCardLevel(cardsNum : number) {
    const earn = new EarnPage(this.page);
    const cardSelector = `> div:nth-child(${cardsNum})`;
    const specificCard = earn.card.locator(cardSelector);
    const specificLevel = specificCard.locator('>div>div:nth-child(2) p').first();

    return await specificLevel.innerText();
}

}
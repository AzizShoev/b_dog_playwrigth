import { Page } from '@playwright/test';
import { EarnPage } from '../pages/earn.page';

export class EarnHelper {
    private page: Page;
    constructor(page) {
        this.page = page;
}

async checkCard(listNum : number, cardsNum: number) {
    const earn = new EarnPage(this.page);
    const cardSelector = `>div >div:nth-child(${cardsNum})`;
    const cardList = `>div:nth-child(${listNum})`;
    const specificCardList = earn.card.locator(cardList);
    const specificCard = specificCardList.locator(cardSelector);;
        
    return specificCard;
}

async checkCardName(listNum : number, cardsNum: number) {
    const earn = new EarnPage(this.page);
    const cardSelector = `>div >div:nth-child(${cardsNum})`;
    const cardList = `>div:nth-child(${listNum})`;
    const specificCardList = earn.card.locator(cardList);
    const specificCard = specificCardList.locator(cardSelector); 
    const specificCardName = specificCard.locator(' div>div:nth-child(2) p').first();

    return await specificCardName.innerText();
}

async checkCardsProfit(listNum : number, cardsNum: number) {
    const earn = new EarnPage(this.page);
    const cardSelector = `>div >div:nth-child(${cardsNum})`;
    const cardList = `>div:nth-child(${listNum})`;
    const specificCardList = earn.card.locator(cardList);
    const specificCard = specificCardList.locator(cardSelector);  
    const specificProfit = specificCard.locator(' div:nth-child(2) div div p');

    return parseInt((await specificProfit.innerText()).replace(/[^\d.-]/g, ''));
}

async checkCardPrice(listNum : number, cardsNum: number) {
    const earn = new EarnPage(this.page);
    const cardSelector = `>div >div:nth-child(${cardsNum})`;
    const cardList = `>div:nth-child(${listNum})`;
    const specificCardList = earn.card.locator(cardList);
    const specificCard = specificCardList.locator(cardSelector); 
    const specificPrice = specificCard.locator('>div button div');

    return  parseInt((await specificPrice.innerText()).replace(',', ''));
}

async checkCardLevel(listNum : number, cardsNum: number) {
    const earn = new EarnPage(this.page);
    const cardSelector = `>div >div:nth-child(${cardsNum})`;
    const cardList = `>div:nth-child(${listNum})`;
    const specificCardList = earn.card.locator(cardList);
    const specificCard = specificCardList.locator(cardSelector);  
    const specificLevel = specificCard.locator('div p').first();

    return await specificLevel.innerText();
}

async findCardByName(listNum : number, cardNameToFind: string) {
    const earn = new EarnPage(this.page);
    const cardList = `>div:nth-child(${listNum})`;
    const specificCardList = earn.card.locator(cardList);
    const cardNum = await specificCardList.locator('>div>div').count();
    for (let i = 1; i <= cardNum; i++) {
        const cardSelector = `>div>div:nth-child(${i})`;
        const specificCard = await specificCardList.locator(cardSelector)
        const currentCardName = await specificCard.locator(' div>div:nth-child(2) p').first().innerText();
        
        if (currentCardName === cardNameToFind) {
            return i;
        }
    }
    return console.log('Card not found');
}


}
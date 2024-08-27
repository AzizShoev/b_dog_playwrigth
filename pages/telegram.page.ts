import { Page } from '@playwright/test';
import { executionAsyncResource } from 'async_hooks';
import { exists } from 'fs';

export class TelegramPage {
  constructor(private page: Page) {}
 

 
  public message =  this.page.getByLabel('Message', { exact: true })
 
  public playButton =  this.page.getByLabel('Open bot command keyboard')
 
  public sendMessagebutton =  this.page.getByLabel('Send Message').last()
 
  public qaPanel =  this.page.getByRole('button', { name: '🔍 Qa panel' }).last()
 
  public dailyReward = this.page.getByRole('button', { name: '🎁 Daily Reward' }).last()
 
  public friends =this.page.getByRole('button', { name: '👥 Friends' }).last()
 
  public level = this.page.getByRole('button', { name: '🔧 Level' }).last()
 
  public refresh =this.page.getByRole('button', { name: '🔄 Refresh' }).last()
 
  public token =this.page.getByRole('button', { name: '🔑 API Access Token' }).last()
 
  public id =this.page.getByRole('button', { name: '🆔 My id' }).last()
 
  public mainMenu =this.page.getByRole('button', { name: '🏠 Main Menu' }).last()
 
  public confirmation =this.page.getByRole('button', { name: 'Confirm' })
 
  public errorTextElement =this.page.getByText('Something went wrong');

  public okServiceWorkerButton =this.page.getByRole('button', { name: 'OK', exact: true })

 
  public forwardToInput=  this.page.getByPlaceholder('Forward to...')

  
  public tgaccount2=  this.page.getByRole('button', { name: 'Alex Qa Alex Qa last seen' })

  
  public botchat= this.page.getByRole('button', { name: 'QAlaksmzxcghoul123asd' }).last()
 
  public errorMessage =  this.page.locator('.modal-dialog .modal-title').getByText('Something went wrong')

  public errorMessageButton = this.page.locator('.modal-dialog .dialog-buttons').getByText('OK')
 


 async pressConfirm() {
    await this.confirmation.click();
    
  }

  async pressPlay() {
    await this.playButton.click();
   
  }

  async sendMessage() {
    await this.sendMessagebutton.click();
  }

  async writeMessage(s: string) {
    this.message.fill(s)
  }
 
  async pressDailyReward() {
    await this.dailyReward.click();
  }

  async pressFriends() {
    await this.friends.click();
  }
  async pressLevel() {
    await this.level.click();
  }
  async pressRefresh() {

 
    const buttonsBefore = await this.page.getByText('Account was refreshed').all();

   
    await this.refresh.last().click();

    
    await this.page.waitForTimeout(3000);

  
    const buttonsAfter =  await this.page.getByText('Account was refreshed').all();

   
    if (buttonsBefore.length < buttonsAfter.length) {
        return true;
    } else {
      
        throw new Error('Refresh was not applied.');
    }


}
  async pressToken() {
    await this.dailyReward.click();
  }
  async pressId() {
    await this.id.click();

  }
  async pressMainMenu() {
    await this.mainMenu.click();
  }
  async pressQaPanel() {
    await this.qaPanel.last().click();
  }

async isRefreshed () {
    const buttons = await this.page.getByRole('button', { name: '🔄 Refresh' }).all();
    
}
    
public async checkAndHandleError() {
 
 
      if (await this.errorTextElement.count()>0) {

 await this.okServiceWorkerButton.click();  
   
  }
}

 
async inviteFriendTG() {
    await this.forwardToInput.fill('QA')
    await this.tgaccount2.click()
    
    // await this.page.getByLabel('Send Message').click();
//   await this.page.locator('#message-57695').getByText('https://t.me/laksmzxcghoul123asd_bot?start=r_6159607116 Join the BabyDoge PAWS').click();
  }

  async pressToBotChat() {
    await this.botchat.click()
  }

  async topUp(id: string, amount: string) {
    const command = `/topup ${id} ${amount}`;
    await this.message.fill(command);
}

async checkErrorMessage() {
  if(await this.errorMessage.isVisible()){
    await this.errorMessageButton.click();}
  else{return}
}
}
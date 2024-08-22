import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { TelegramPage } from '../pages/telegram.page';
import { NavigationMenu } from '../pages/navigation.page';
import { FriendsPage } from '../pages/friends.page';


test.use({
  storageState: 'LoginAuth.json'
});

test('test2', async ({ page }) => {
  test.setTimeout(160000) 

  const tg  = new TelegramPage (page);
  const home  = new HomePage (page);
 const nav  = new NavigationMenu (page);
 const friends  = new FriendsPage (page);
  await page.goto('https://web.telegram.org/a/#7323068154');
  await page.waitForTimeout(2000);
tg.checkAndHandleError()

await page.waitForTimeout(4000);

  tg.pressPlay()
  await page.waitForTimeout(2000);
  tg.pressConfirm()
  await page.waitForTimeout(7000);
  home.obtainReward()
  await page.waitForTimeout(2000);
  home.mine()
  await page.waitForTimeout(2000);
  
nav.goEarn()
await page.waitForTimeout(5000);
nav.goBack()
await page.waitForTimeout(5000);
nav.goTasks()
await page.waitForTimeout(5000);
nav.goSettings()
await page.waitForTimeout(5000);
nav.goBack()
await page.waitForTimeout(5000);
home.close()


await page.waitForTimeout(1000);
tg.writeMessage('/start')
await page.waitForTimeout(1000);
tg.sendMessage()
await page.waitForTimeout(1000);
tg.pressQaPanel()
await page.waitForTimeout(1000);
tg.pressId()
await page.waitForTimeout(3000);
tg.pressRefresh()
await page.waitForTimeout(3000);
tg.pressMainMenu()
await page.waitForTimeout(3000);


 tg.pressPlay()
 await page.waitForTimeout(5000);
 home.closeReward()
 await page.waitForTimeout(1000);
  const availableEnergy = await home.getAvailableEnergy();
  console.log('Available Energy:', availableEnergy);


 const balance = await home.getBalance();
 console.log('balance balance:', balance);


 const getEarnPerTap = await home.getEarnPerTap();
 console.log('getEarnPerTap getEarnPerTap:', getEarnPerTap);


 const getEnergyLimit = await home.getEnergyLimit();
 console.log('getEnergyLimit getEnergyLimit:', getEnergyLimit);

 const getPawsToLevelUp = await home.getPawsToLevelUp();
 console.log('getPawsToLevelUp getPawsToLevelUp:', getPawsToLevelUp);


 const getProfitPerHour = await home.getProfitPerHour();
 console.log('getProfitPerHour getProfitPerHour:', getProfitPerHour);

 nav.goFriends()  
  await page.waitForTimeout(4000);
  
  friends.pressInviteButton()
  await page.waitForTimeout(2000);
  // await page.getByPlaceholder('Forward to...').fill('Alex Qa');
tg.inviteFriendTG()
await page.waitForTimeout(3000);
 
 tg.sendMessage()
await page.waitForTimeout(2000);
 tg.pressToBotChat()
await page.waitForTimeout(1000);

});

 
 
 


import {test, expect} from '@playwright/test';

test.describe('login scenario', () => {
    
    test('TC1: Launch the application and validate th etitle', async ({ page }) => {
        //open this url
        await page.goto('https://practice.sdetunicorns.com/');
        
        //verify the title of the page
        await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns');
    })

    test('TC2: Verify the about page', async ({page}) => {
        await page.goto('https://practice.sdetunicorns.com/about/');
        await expect(page).toHaveURL('https://practice.sdetunicorns.com/about/');
    })

    test('TC3: Use css locator to find the element', async ({page}) =>{
        await page.goto('https://practice.sdetunicorns.com/#get-started');

        //css locator
        await page.locator('#get-started').click();
        await expect(page).toHaveURL(/.*get-started/)  

        //text locator 
        const heading1 = await page.locator('text=Think different.')
        await expect(heading1).toBeVisible();

        //text locator for exact match
        const heading2 = await page.locator('text="Make different"') 
        await expect(heading2).toBeVisible();

        //text and css selector
        const heading3 = await page.locator('#primary-menu >> text=Home')
        await expect(heading3).toBeVisible();

        
    });

});





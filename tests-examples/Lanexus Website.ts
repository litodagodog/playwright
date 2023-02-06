import { Browser, BrowserContext, Page, chromium ,test,expect} from "@playwright/test";

test.describe("LANEXUS Website", () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    test.beforeAll(async () => {
        browser = await chromium.launch({
            headless: true
        });
        context = await browser.newContext()
        page = await context.newPage();
        await page.goto("https://lanexus.com")   
    })

    test("Home Page", async () => {
      console.log(await page.title());
      expect(await page.title()).toBe("LANEXUS | Offshore Software Development Company");
      await expect(page.getByRole('heading', { name: 'Your business needs, tailor-made' })).toHaveText("Your business needs, tailor-made");
      await expect(page.getByRole('link', { name: '5 Our Services 5' })).toHaveText("Our Services");
      await expect(page.getByRole('link', { name: '5 Schedule A Chat 5' })).toHaveText("Schedule A Chat");
      await page.getByText('We Are Different').isVisible();
      await page.waitForLoadState();
      await page.frameLocator('[data-testid="dialog_iframe"]').getByRole('button', { name: 'close' }).click();
      await expect(page.getByText('Our Technical Expertise')).toHaveText("Our Technical Expertise");
      await page.getByText('We are borderless and diverse').isVisible();
      await page.getByText('Skilled Developers & Designers').isVisible();
      await page.getByText('100').isVisible();
      await page.getByText('1200').isVisible();
      await page.getByText('Successful Projects').isVisible();
      await page.getByText('150').isVisible();
      await page.getByText('Happy Clients').isVisible();
      await page.getByText('Products We Built Together').isVisible();
      await page.getByText('Some Love From Our Clients').isVisible();
      await page.getByText('Ideas That Inspire Us').isVisible();
      await page.getByText('Let’s Talk!').isVisible();
      await page.locator('#lets-talk').getByText('25050 Riding Plaza Suite #130-617 South Riding, VA 20152').isVisible();
      await page.locator('#lets-talk').getByText('sales@lanexus.com').isVisible();
      await page.locator('#lets-talk').getByText('‪(703) 239-3683').isVisible();
      await page.getByText('@lanexusllc').isVisible();
      await page.getByText('#LANEXUS').isVisible();
      await page.locator('.footer-description-wrap > img').isVisible();
      await page.getByText('25050 Riding Plaza Suite #130-617 South Riding, VA 20152').nth(1).isVisible();
      await page.getByRole('link', { name: 'sales@lanexus.com' }).isVisible();
    });
    test("Inside LANEXUS Page",async () => {
      await page.locator('#menu-item-1675').getByRole('link', { name: 'Inside LANEXUS' }).click();
      await page.waitForLoadState();
      await page.getByRole('heading', { name: 'Connected Through Technology' }).isVisible();
      await page.locator('video').isVisible();
      await page.getByText('Borderless, But Rooted In Our Culture').isVisible();
      await page.getByText('We’re Global & Growing').isVisible();
      await page.locator('#et_builder_outer_content').getByText('Japan').nth(1).isVisible();
      await page.locator('#et_builder_outer_content').getByText('United States').isVisible();
      await page.getByText('Australia').first().isVisible();
      await page.getByText('Philippines').nth(2).isVisible();
      await page.locator('#et_builder_outer_content').getByText('Canada').isVisible();
      await page.getByText('Our Clients Around the Globe').isVisible();
      await page.getByText('Founded By Engineers').isVisible();
      await page.getByText('Takayuki Kobayashi').isVisible();
      await page.getByText('Wayne Steven Wing').isVisible();
      await page.getByText('Jarrod Robinson').isVisible();
      await page.getByText('Allan Freiberg').isVisible();
      await page.getByText('Jesse Hall').isVisible();
      await page.getByText('Stefan Mott').isVisible();
      await page.getByText('Faith Veloro').isVisible();
      await page.getByText('Christian Abella').isVisible();
      await page.getByText('Monette Esparcia').isVisible();
      await page.getByText('We’re Driven By Our Values').isVisible();
      await page.getByRole('heading', { name: 'K Customer Commitment 01' }).isVisible();
      await page.getByRole('heading', { name: 'L Quality & Integrity 02' }).isVisible();
      await page.getByRole('heading', { name: 'L Continuous Improvement 03' }).isVisible();
      await page.getByRole('heading', { name: 'L Technological Innovation 04' }).isVisible();
      await page.getByRole('heading', { name: 'L Trust, Respect & Transparency 05' }).isVisible();
      await page.getByText('The Technology We Use').isVisible();
    });
    test("Careers Page", async() => {
      await page.locator('#menu-item-20481').getByRole('link', { name: 'Careers' }).click();
      await page.getByRole('heading', { name: 'Work With Us' }).isVisible();
      await page.getByRole('img', { name: 'LANEX People' }).isVisible();
      await page.getByText('Career Opportunities').isVisible();
      await page.getByText('Get That Competitive Advantage').isVisible();
    });
    test.afterAll(async () => {
        await context.close()
        await browser.close()
    })
})
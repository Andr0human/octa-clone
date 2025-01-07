import { Page } from 'puppeteer';

const openLinkedIn = async (page: Page, creds: any) => {
  const { email, password } = creds;

  await page.goto('https://www.linkedin.com/');
  await page.goto(
    'https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin'
  );

  await page.type('#username', email);
  await page.type('#password', password);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Click the "Sign in" button
  await page.click('button[aria-label="Sign in"]');
  await new Promise((resolve) => setTimeout(resolve, 3000));
};

const getToPeoplePage = async (page: Page, searchText: string, company: string) => {
  await page.type('input[placeholder="Search"]', searchText);
  await page.keyboard.press('Enter');

  // Select people tab
  await page.waitForSelector('#search-reusables__filters-bar > ul > li:nth-child(3) > button');
  await page.click('#search-reusables__filters-bar > ul > li:nth-child(3) > button');

  console.log('People tab selected');
  

  //   <button class="artdeco-pill artdeco-pill--slate artdeco-pill--choice artdeco-pill--2 search-reusables__filter-pill-button
  //        search-reusables__filter-pill-button" aria-pressed="false" type="button">

  //       People
  // <!---->
  //   </button>

  //*[@id="search-reusables__filters-bar"]/ul/li[3]/button

  // Select company
  await page.waitForSelector('#artdeco-hoverable-artdeco-gen-190 > div.artdeco-hoverable-content__shell > div > form > fieldset > div.pl4.pr6 > div > div > input[type=text]');
  await page.type('#artdeco-hoverable-artdeco-gen-190 > div.artdeco-hoverable-content__shell > div > form > fieldset > div.pl4.pr6 > div > div > input[type=text]', 'Company Name');
  console.log('Company filter selected');

  // Wait for the dropdown to appear
  await page.waitForSelector('.basic-typeahead__selectable');

  // Select the first option
  await page.click('.basic-typeahead__selectable:first-child');

  await new Promise((resolve) => setTimeout(resolve, 60000));
};

export { openLinkedIn, getToPeoplePage };

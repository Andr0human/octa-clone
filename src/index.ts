import puppeteer, { Browser, Page } from 'puppeteer';
import { getToPeoplePage, openLinkedIn } from './linkedin';
import dotenv from 'dotenv';
// Or import puppeteer from 'puppeteer-core';

dotenv.config();

const run = async () => {
  // Launch the browser and open a new blank page
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page: Page = await browser.newPage();

  await page.setViewport({ width: 1080, height: 1024 });

  await openLinkedIn(page, {
    email: process.env.LINKEDIN_EMAIL,
    password: process.env.LINKEDIN_PASSWORD,
  });

  await getToPeoplePage(page, "sde", "successive digital");

  await browser.close();
};

run();

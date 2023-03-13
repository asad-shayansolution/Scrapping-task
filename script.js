const URL = require("./urls.js");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs/promises");

puppeteer.use(StealthPlugin());

async function start() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      channel: "chrome",
      args: [`--proxy-server=http://80.92.206.140:30207`],
      userDataDir: "C:/Users/shayan/AppData/Local/Google/Chrome/User Data/",
    });

    const context = await browser.createIncognitoBrowserContext();

    for (let i = 0; i < 10; i++) {
      const page = await context.newPage();
      const HTTPResponse = await page.goto(URL[i], {
        timeout: 100000,
      });

      const title = await page.title();
      console.log("title = ", title);

      if (!title) i--;
    // await page.waitForTimeout(10000);

      const cookies = await page.cookies();
      for (let cookie of cookies) {
        await page.deleteCookie(cookie);
      }

      // await page.close();
    }
    //   await browser.close();
  } catch (err) {
    console.log(err.message);
  }
}

start();

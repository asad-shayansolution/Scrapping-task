// const { default: puppeteer } = require("puppeteer");
// const proxyChain = require('proxy-chain');
const fs = require("fs/promises");
const URL = require("./urls.js");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const { scrollPageToBottom } = require("puppeteer-autoscroll-down");
puppeteer.use(StealthPlugin());

// const sleep = (ms)=> new Promise(resolve=> setTimeout(resolve, ms))

async function start() {
  // const server = await proxyChain.createProxyServer({
  //   proxyUrl: 'http://80.92.206.140:30207'
  // });

  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({
    // Launch chromium using a proxy server on port 9876.
    // More on proxying:
    //    https://www.chromium.org/developers/design-documents/network-settings
    // args: [ `--proxy-server=${proxyUrl}` ],
    // ignoreDefaultArgs: true,
    // ignoreDefaultArgs : ['--disable-extensions'],
    // defaultViewport: {
    //   width: 1280,
    //   height: 1024,
    // width: 1920,
    // height: 1080,
    // },
    headless: false,
    channel: "chrome",
    // executablePath: "C:\Program Files\Google\Chrome\Application\chrome.exe",
    // devtools: true,
    args: [
      // '--window-size=1920,1080',
      // '--disable-notifications',
      // '--proxy-server=103.58.16.5:4145',
      `--proxy-server=http://80.92.206.140:30207`,
      // '--load-extension',
    ],
    userDataDir: "C:/Users/shayan/AppData/Local/Google/Chrome/User Data/",
  });

  for (let i = 0; i < 10; i++) {
    const page = await browser.newPage();
    // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');

    // await page.setRequestInterception(true);
    // page.on('request', (request) => {
    //   if (request.resourceType() === 'image' || request.resourceType() === 'script') {
    //     request.abort();
    //   } else {
    //     request.continue();
    //   }
    // });

    const HTTPResponse = await page.goto(URL[i], {
      // waitUntil: "domcontentloaded",
      // waitUntil: "DOMContentLoaded",
      // waitUntil: "load",
      waitUntil: "networkidle2",
      timeout: 1000000,
    });

    // const wait = Math.floor(Math.random() * 5000) + 1000
    // console.log("wait = ", wait)
    // await page.waitFor(wait);

    const title = await page.title();
    console.log("title = ", title);
    // if (!title) {
      // Get all cookies and delete them
      // const cookies = await page.cookies();
      // console.log("cookies = ", cookies)
      // for (let cookie of cookies) {
      //   await page.deleteCookie(cookie);
      // }

      // Reload the page to ensure that the cookies have been cleared
      // await page.reload();
    // }
    // await page.waitForTimeout(10000);
    // await page.setViewport({width: 1080, height: 1024});

    // await page.waitForNetworkIdle({
    //   idleTime: 500,
    //   timeout: 30000
    // })
    // await page.waitForNavigation()

    // await page.scrollPage()
    // await page.waitForTimeout(3000);
    // const data = await page.evaluate(
    //   () => window.scrollTo(0, 0);)
    // );

    // const data = await page.evaluate(() => {
    //     const x = document.querySelector(".media-column-container")
    //     x.scroll(0, x.scrollHeight)
    //     return document.body
    // })
    // console.log('data = ', data)
    // await fs.writeFile(`pages/page${i}.html`, await HTTPResponse.text());

    await page.screenshot({ path: `images/image${i}.png`, fullPage: true });
    // await sleep(5000);

    // const data = await page.evaluate(
    //   () => [...document.querySelectorAll("article h3 a")].map(node=> node.textContent)
    // );

    // console.log("data = ", data)

    // const photos = await page.$$eval("img", (imgs) => imgs.map((img) => img.src));
    // for (let photo of photos) {
    //   const HTTPResponse = await page.goto(photo);
    //   await fs.writeFile(
    //     "./photos/" + photo.split("/").pop(),
    //     await HTTPResponse.buffer()
    //   );
    // }

    // await page.type("#textfield", 'myinput')
    // await page.click("#submit")
    // await page.waitForNavigation()

    // for(let i=0; i<2; i++){
    //   await Promise.all([
    //     page.click('#default > div > div > div > div > section > div:nth-child(2) > div > ul > li.next > a'),
    //     page.waitForNavigation(),
    //   ])
    //   const sel = await page.waitForSelector("#default > div > div > div > div > section > div:nth-child(2) > div > ul > li.next > a")
    //   console.log("sel content = ", await sel.evaluate(el=> el.textContent))
    //   await page.screenshot({ path: "page"+i+".jpg", fullPage: false });
    // }

    // const lastPosition = await scrollPageToBottom(page, {
        //   size: 500,
        //   delay: 500,
        // });

    // await page.close()
  }
  // await browser.close();
  // await proxyUrl.close();
}

start();

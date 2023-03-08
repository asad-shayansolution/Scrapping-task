const { default: puppeteer } = require("puppeteer");
const fs = require("fs/promises");
const URL = "https://www.zillow.com/homedetails/3405-Maceo-St-Los-Angeles-CA-90065/20756356_zpid/";

(async ()=> {
  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({
    // Launch chromium using a proxy server on port 9876.
    // More on proxying:
    //    https://www.chromium.org/developers/design-documents/network-settings
    // args: [ '--proxy-server=10.10.10.2' ]
    defaultViewport: {
      width: 1280,
      height: 1024,
      // width: 1920,
      // height: 1080,
    },
    headless: false,
    channel: "chrome",
    // devtools: true,
    args: ['--window-size=1920,1080', '--disable-notifications']
  });

  const page = await browser.newPage();
  const HTTPResponse = await page.goto(URL, {
    // waitUntil: "domcontentloaded",
    // waitUntil: "DOMContentLoaded",
    // waitUntil: "load",
    // waitUntil: "networkidle2",
  });

  // await page.title()
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
    await fs.writeFile("page.html", await HTTPResponse.text());

    await page.screenshot({ path: "image.png", fullPage: true });

    // await page.close()

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
  
    
    await page.close()
  await browser.close();
})()
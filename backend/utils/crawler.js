const { config } = require("dotenv");
const { myEmmiter } = require("./eventEmitter");
const cheerio = require("cheerio");
const workerpool = require('workerpool');

const workerPath = __dirname + '/worker.js';
console.log(workerPath, 'workerPath');
const pool = workerpool.pool(workerPath, {minWorkers: 4});
console.log(pool.stats(),'stats');
config();

let crawler = null;

const BASE_CRAWL_URL =
  process.env.BASE_CRAWL_URL ?? "https://companydetails.in";

async function loadCrawler() {
  const { default: Crawler } = await import("crawler");

  crawler = new Crawler({
    rateLimit: 2000,
    maxConnections: 10,
    skipDuplicates: true,
    callback: async (err, res, done) => {
      if (err) {
        console.log("error", err);
      } else {
        const $ = res.$;
        // console.log($('title').text());
        let currentUrl = res.options.url;
        if (currentUrl.includes("/company/")) {
          await handleCompanyDetails($);
        }
        // get all links in current page
        let links = $("a")
          .map((i, link) => link.attribs.href)
          .filter((i, link) => link.includes("/company/"))
          .get();

        // console.log(links, " links");
        const fullUrlLinks = links.map((url) => {
          if (!url.includes("http")) {
            url = getFullUrl(url);
          }
          // console.log(url,'url here');
          return url;
          // check if it is already passed in db earlier
          crawler.add(url);
        });
        crawler.add([...fullUrlLinks]);
        console.log("calling done");
        done();
        // console.log(res,'res here');
      }
    },
  });
}

loadCrawler();
async function crawlWeb(url) {
  if (!url.includes("http")) {
    url = getFullUrl(url);
    console.log(url, "fetched");
  }

  crawler.add([url]);

  // const response = await fetch(url);
  // const htmlText = await response.text();

  // if (url.includes('/company/')){
  //   await handleCompanyDetails(htmlText)
  // }
  //   const $ = cheerio.load(htmlText);
  //   let links = $('a').map((i,link)=> link.attribs.href).filter((i,link)=>link.includes('/company/')).get();
  //   links.forEach((link)=>{
  //     crawlWeb(link);
  //   });
}

async function handleCompanyDetails($) {
  const basic_details_children = $("#basicdetails > div");
  const contact_details_elements = $("#CONTACT-DETAILS > div");
  const director_details_elements = $("#COMPANY-DIRECTORS > div");
  const basic_details_elements = basic_details_children.filter((i, ele) => {
    if (ele.attribs.id) {
      return false;
    }
    return true;
  });

  const basicDetailsJson = parseDetailsFromHtmlElements(
    basic_details_elements,
    $
  );
  const contactDetailsJson = parseDetailsFromHtmlElements(
    contact_details_elements,
    $
  );

  const data = {
    name: basicDetailsJson['Company Name'],
    roc: basicDetailsJson['RoC'],
    status: basicDetailsJson['Company Status'],
    cin: basicDetailsJson['CIN'],
    registrationDate: basicDetailsJson['Registration Date'],
    category: basicDetailsJson['Category'],
    subCategory: basicDetailsJson['Sub Category'],
    class: basicDetailsJson['Company Class'],
    authorisedCapital: basicDetailsJson['Authorised Capital'],
    paidUpCapital: basicDetailsJson['PaidUp Capital'],    
    state: contactDetailsJson['State'],
    pin: contactDetailsJson['PIN Code'],
    country: contactDetailsJson['Country'],
    address: contactDetailsJson['Address'],
    email: contactDetailsJson['Email']
  }

  const isPromise = pool.exec('syncCrawledDataToDb', [data]).then((res)=>console.log('worker res',res));
  await new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, 3000);
  });
  console.log("returning from fun");
}

function parseDetailsFromHtmlElements(elements, $) {
  let data = {};
  elements.map((i, el) => {
    const key = $(el).find("div > a").text().trim();
    const value = $(el).find("div > h6").text().trim();
    data[key] = value;
  });

  return data;
}

function parseContactDetailsFromHtmlElements(elements) {}

function getFullUrl(url) {
  return (url = BASE_CRAWL_URL + url);
}
function setupCrawl() {
  myEmmiter.on("start-crawling", (url = "https://www.companydetails.in") => {
    console.log("start-crawling", url);
    crawlWeb(url);
  });
}
exports.setupCrawl = setupCrawl;

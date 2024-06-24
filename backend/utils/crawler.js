const { config } = require("dotenv");
const { myEmmiter } = require("./eventEmitter");
const cheerio = require("cheerio");
const workerpool = require("workerpool");

const workerPath = __dirname + "/worker.js";
const pool = workerpool.pool(workerPath, { minWorkers: 4 });
config();

let crawler = null;

const BASE_CRAWL_URL =
  process.env.BASE_CRAWL_URL ?? "https://companydetails.in";

function setupCrawler() {
  myEmmiter.on("start-crawling", (url = "https://www.companydetails.in") => {
    console.log("start-crawling", url);
    crawlWeb(url);
  });
}

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
        let currentUrl = res.options.url;
        console.log('URL crawled ', currentUrl);
        if (currentUrl.includes("/company/")) {
          await handleCompanyDetails($);
        }
        // get all links in current page
        let links = $("a")
          .map((i, link) => link.attribs.href)
          .get();

        let fullUrlLinks = links.map((url) => {
          if (!url.includes("http")) {
            url = getFullUrl(url);
          }

          return url;
          // check if it is already passed in db earlier
        });
        fullUrlLinks = fullUrlLinks.filter((url) => {
          try {
            new URL(url);
            if (!url.includes("companydetails")) return false;
            return true;
          } catch (err) {
            return false;
          }
        });
        crawler.add([...fullUrlLinks]);
        console.log("calling done callback");
        done();
      }
    },
  });
}

function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
}

loadCrawler();
async function crawlWeb(url) {
  if (!url.includes("http")) {
    url = getFullUrl(url);
  }
  crawler.add([url]);
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
    name: basicDetailsJson["Company Name"],
    roc: basicDetailsJson["RoC"],
    status: basicDetailsJson["Company Status"],
    cin: basicDetailsJson["CIN"],
    registrationDate: basicDetailsJson["Registration Date"],
    category: basicDetailsJson["Category"],
    subCategory: basicDetailsJson["Sub Category"],
    class: basicDetailsJson["Company Class"],
    authorisedCapital: basicDetailsJson["Authorised Capital"],
    paidUpCapital: basicDetailsJson["PaidUp Capital"],
    state: contactDetailsJson["State"],
    pin: contactDetailsJson["PIN Code"],
    country: contactDetailsJson["Country"],
    address: contactDetailsJson["Address"],
    email: contactDetailsJson["Email"],
  };

  pool
    .exec("syncCrawledDataToDb", [data])
    .then(() => console.log("data synced to db"));
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

function getFullUrl(url) {
  return (url = BASE_CRAWL_URL + url);
}

exports.setupCrawler = setupCrawler;

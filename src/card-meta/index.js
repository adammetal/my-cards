const puppeteer = require("puppeteer");

const GATHERER_BASE = "https://gatherer.wizards.com/";

const getSearchUrl = (title) => {
  return new URL(
    `/Pages/Search/Default.aspx?name=+[${title}]`,
    GATHERER_BASE
  ).toString();
};

const getCardMeta = async (title) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(getSearchUrl(title));

  const info = await page.evaluate(() => {
    const titleElement = document.querySelector(".contentTitle");
    const cardTitle = titleElement?.textContent?.trim() ?? "";

    if (cardTitle === "" || cardTitle.includes("SEARCH:")) {
      return null;
    }

    const imageElement = document.querySelector(".cardImage > img");

    const cardImageSrc = new URL(
      imageElement.src,
      "https://gatherer.wizards.com"
    ).toString();

    const detailsElement = document.querySelectorAll(
      ".cardDetails td.rightCol .row"
    );

    const cardDetails = [...detailsElement].reduce((acc, infoRow) => {
      const label = infoRow.querySelector(".label")?.textContent?.trim();
      const value = infoRow.querySelector(".value")?.textContent?.trim();

      if (!label || !label.length) {
        return acc;
      }

      acc[label] = value;

      return acc;
    }, {});

    return {
      cardTitle,
      cardImageSrc,
      cardDetails,
    };
  });

  await browser.close();

  return info;
};

module.exports = getCardMeta;

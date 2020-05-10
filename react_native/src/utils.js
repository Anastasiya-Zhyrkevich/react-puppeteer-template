const puppeteer = require('puppeteer');
const assert = require('assert');


async function waitForLoad(page) {
  await page.waitForSelector('input', { timeout: 1500 });
}

async function checkCardColor(page, cardId, colorValue) {
  const srcs = await page.$$eval(
    cardId + ' *', 
    (elems, colorValue) => elems
              .map(elem => elem.getAttribute('src'))
              .filter(src => src && src.match(colorValue)),
    colorValue
  );
  return srcs.length !== 0;
}

module.exports = {
  checkCardColor
}

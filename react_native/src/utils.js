const puppeteer = require('puppeteer');
const assert = require('assert');

const colorNameMapping = {
  'RED': 'a6330d',
  'BLUE': '3944db',
  'GRAY': '7d807a'
}

async function waitForCard(page, card, timeout) {
  await page.waitForSelector(card, { timeout });
}

async function checkCardColor(page, cardId, colorName) {
  const colorValue = colorNameMapping[colorName];
  assert.ok(colorValue);

  try {
    await page.waitForFunction(
      (cardId, colorValue) => {
        let childrenNodes = document.querySelectorAll(cardId + ' *');
        let srcs = Array.prototype.slice.call(childrenNodes)
                  .map(elem => elem.getAttribute('src'))
                  .filter(src => src && src.match(colorValue));
        return srcs.length !== 0;
      },
      {timeout: 200},
      cardId, colorValue
    );
  } catch (error) {
    assert.fail(`${cardId} was expected to be of ${colorName} color`);
  }
}

module.exports = {
  checkCardColor,
  waitForCard
}

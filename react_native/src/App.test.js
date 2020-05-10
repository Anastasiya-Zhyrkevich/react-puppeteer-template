const faker = require('faker');
const puppeteer = require('puppeteer');
const assert = require('assert');
const utils = require('./utils');


describe('H1 Text', () => {
  let browser, page;

  const RED = 'a6330d';
  const BLUE = '3944db';
  const GRAY = '7d807a';

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
      ]
    });
    page = await browser.newPage();
    try {
      await page.goto('http://localhost:3000/', { waitUntil: 'load' });
    } catch(err) {
      console.warn(err);
    }
  });

  afterAll(async () => {
    await browser.close();
  });

  it('First click on first card', async function() {
    await page.waitForSelector('#card1', { timeout: 1500 });
    await page.click('#card1');

    const colorResult = await utils.checkCardColor(page, '#card1', this.RED);
    assert.ok(colorResult);
  });

  it('Second click on first card', async function() {
    await page.click('#card1');

    const colorResult = await utils.checkCardColor(page, '#card1', this.GRAY);
    assert.ok(colorResult);
  });

  it('First click on second card, click does not affect the first card', async function() {
    await page.click('#card2');

    const colorResult1 = await utils.checkCardColor(page, '#card1', this.GRAY);
    assert.ok(colorResult1);

    const colorResult2 = await utils.checkCardColor(page, '#card2', this.RED);
    assert.ok(colorResult2);
  });

});

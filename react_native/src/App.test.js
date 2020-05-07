const faker = require('faker');
const puppeteer = require('puppeteer');
const assert = require('assert');
const utils = require('./utils');


describe('H1 Text', () => {
  let browser, page;

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

  it('does not show suggestions without input', async function() {
    await page.waitForSelector('#card1', { timeout: 1500 });
    await page.click('#card1');

    const srcs = await page.$$eval(
      '#card1 *', 
      elems => elems
                .map(elem => { console.log('meow'); return elem.getAttribute('src')})
                .filter(src => src && src.match('a6330d'))
    );

    assert.notEqual(srcs.length, 0);
  });

});

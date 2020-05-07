const faker = require('faker');
const puppeteer = require('puppeteer');
const assert = require('assert');
const utils = require('./utils');


// class utils {
//   static async checkInput(page, expectedValue) {
//     let inputValue = await page.evaluate(() => document.querySelector('input').value);
//     assert.equal(inputValue, expectedValue);
//   }
  
  
//   static async waitForLoad(page) {
//     await page.waitForSelector('input', { timeout: 1500 });
//   }
// }



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
    await utils.waitForLoad(page);

    let tagsSuggestions = await page.$x('//*[@class="TagSuggestions"]');
    assert.equal(tagsSuggestions.length, 0);
  });

  it('shows matching suggestions with input', async function() {
    await utils.waitForLoad(page);

    await page.evaluate(() => document.querySelector('input').value = '');
    await page.focus('input');
    await page.keyboard.type('alm');

    await page.waitForSelector('.TagSuggestion');
    const tagSuggestions = await page.evaluate(() => {
      const nodes = Array.prototype.slice.call(document.querySelectorAll('.TagSuggestion'));
      return nodes.map(el => el.innerHTML);
    });
    tagSuggestions.sort();

    assert.equal(tagSuggestions[0], 'Almond');
    assert.equal(tagSuggestions[1], 'Salmon');
  });

  it('adds matching suggestions on click, clears value', async function() {
    await utils.waitForLoad(page);
    
    await page.evaluate(() => document.querySelector('input').value = '');
    await page.focus('input');
    await page.keyboard.type('almo');
    await utils.checkInput(page, 'almo');

    await page.evaluate(() => document.querySelector('.TagSuggestion').click());
    
    await utils.checkInput(page, '');

    let tags = await page.$x('//*[@class="Tag"]//*[contains(text(), "Almond")]');
    assert.equal(tags.length, 1);
  });

  it('excludes already selected suggestions', async function() {
    await utils.waitForLoad(page);

    await page.focus('input');
    await page.keyboard.type('alm');

    const expectedItemsCount = 1;
    await page.waitForFunction(
      itemsCount => document.querySelectorAll('.TagSuggestion').length === itemsCount, 
      { timeout: 1500 }, 
      expectedItemsCount
    );

    const tagSuggestions = await page.evaluate(() => {
      const nodes = Array.prototype.slice.call(document.querySelectorAll('.TagSuggestion'));
      return nodes.map(el => el.innerHTML);
    });
    tagSuggestions.sort();

    assert.equal(tagSuggestions[0], 'Salmon');
  });

  it('does not show suggestions without a match', async function() {
    await utils.waitForLoad(page);

    await page.focus('input');
    await page.keyboard.type('azx');

    let tagsSuggestions = await page.$x('//*[@class="TagSuggestions"]');
    assert.equal(tagsSuggestions.length, 0);
  });

});

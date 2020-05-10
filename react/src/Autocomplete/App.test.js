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

  it('On start h1 loads correctly', async () => {
    await page.waitForSelector('input', { timeout: 1500 });

    const h1Handle = await page.$('h1');
    const h1Text = await page.evaluate(h1 => h1.innerHTML, h1Handle);
    assert.equal(h1Text, 'Search Users');
  }, 16000);

  it('On start autocomplete input should be empty', async () => {
    const inputHandle = await page.$('input');
    const inputText = await page.evaluate(elem => elem.innerText, inputHandle);
    assert.equal(inputText, ''); 
  }, 16000);

  it('Text of autocomplete is \"Mab\", there should be 13 items', async () => {
    await page.focus('input');
    await page.keyboard.type('Mab', {delay: 100}); 

    const expectedItemsCount = 13;
    await page.waitForFunction(
      itemsCount => document.querySelectorAll('.item').length === itemsCount, 
      { timeout: 500 }, 
      expectedItemsCount
    );

    const itemsHandle = await page.$$('.item');
    assert.equal(itemsHandle.length, expectedItemsCount);

  }, 16000);

  it('Text of autocomplete is \"Sab\", there should be 4 items, first item should be \"Sally Stanton V\"', async () => {  
    await page.focus('input');
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('Backspace'); 
    }
    await page.keyboard.type('Sab', {delay: 100}); 

    const expectedItemsCount = 4;
    await page.waitForFunction(
      itemsCount =>
          document.querySelectorAll('.item').length === itemsCount,
      { timeout: 500 }, 
      expectedItemsCount
    );

    const itemsHandle = await page.$$('.item');
    assert.equal(itemsHandle.length, expectedItemsCount);
    
    const itemText = await page.evaluate(elem => elem.innerText, itemsHandle[0]);
    assert.equal(itemText, 'Sally Stanton V');
  }, 16000);

  it('Text of autocomplete is \"Saba\", there should be 17 items, first item should be \"Bailey Beer\"', async () => {
    await page.focus('input');
    await page.keyboard.type('a', {delay: 100}); 

    const expectedItemsCount = 17;
    await page.waitForFunction(
      itemsCount =>
          document.querySelectorAll('.item').length === itemsCount,
      { timeout: 500 }, 
      expectedItemsCount
    );

    const itemsHandle = await page.$$('.item');
    assert.equal(itemsHandle.length, expectedItemsCount);
    
    const itemText = await page.evaluate(elem => elem.innerText, itemsHandle[0]);
    assert.equal(itemText, 'Bailey Beer');
  }, 16000);

});



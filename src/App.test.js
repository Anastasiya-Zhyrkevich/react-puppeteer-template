const faker = require('faker');
const puppeteer = require('puppeteer');
const assert = require('assert');

const person = {
  name: faker.name.firstName() + ' ' + faker.name.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words()
};

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

  it('h1 loads correctly', async () => {
    const h1Handle = await page.$('h1');
    const h1Text = await page.evaluate(h1 => h1.innerHTML, h1Handle);
    assert.equal(h1Text, 'Search Users');
  }, 16000);

  it('input is clear in initial state', async () => {
    const inputHandle = await page.$('input');
    const inputText = await page.evaluate(elem => elem.innerText, inputHandle);
    assert.equal(inputText, ''); 
  }, 16000);

  it('type Mab', async () => {
    await page.focus('input');
    await page.keyboard.type('Mab', {delay: 100}); 

    const expectedItemsCount = 13;
    await page.waitForFunction(
      itemsCount => document.querySelectorAll('.item').length === itemsCount, 
      { timeout: 1500 }, 
      expectedItemsCount
    );

    const itemsHandle = await page.$$('.item');
    assert.equal(itemsHandle.length, expectedItemsCount);

  }, 16000);

  it('type Sab', async () => {

    await page.focus('input');
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('Backspace'); 
    }
    await page.keyboard.type('Sab', {delay: 100}); 

    const expectedItemsCount = 4;
    await page.waitForFunction(
      itemsCount =>
          document.querySelectorAll('.item').length === itemsCount,
      { timeout: 3000 }, 
      expectedItemsCount
    );

    const itemsHandle = await page.$$('.item');
    assert.equal(itemsHandle.length, expectedItemsCount);
    
    const itemText = await page.evaluate(elem => elem.innerText, itemsHandle[0]);
    assert.equal(itemText, 'Sally Stanton V');
  }, 16000);

});

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
    await utils.waitForLoad(page, 'h1');

    const h1Handle = await page.$('h1');
    const h1Text = await page.evaluate(h1 => h1.innerHTML, h1Handle);
    assert.equal(h1Text, 'User information');
  }, 16000);

  it('#documentName input should be empty', async () => {
    await utils.waitForLoad(page, '#documentName');

    const inputHandle = await page.$('#documentName');
    const inputText = await page.evaluate(elem => elem.innerText, inputHandle);
    assert.equal(inputText, ''); 
  }, 16000);

  it('Update #documentName value and check progressBar width', async () => {
    await page.focus('#documentName');
    await page.keyboard.type('ab');

    // Check input value
    const inputHandle = await page.$('#documentName');
    const inputText = await page.evaluate(elem => elem.value, inputHandle);
    assert.equal(inputText, 'ab'); 

    // Check form-progress-bar
    const formProgressBarHandle = await page.$('.form-progress-bar');
    const formProgressBarWidth = await page.evaluate(elem => elem.innerHTML, formProgressBarHandle);
    assert.equal(formProgressBarWidth, '25%'); 
  }, 16000);

});



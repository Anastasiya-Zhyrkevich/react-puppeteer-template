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

  it('#documentName input should be empty and progressBar width = 0%', async () => {
    await utils.waitForLoad(page, '#documentName');

    const inputText = await page.evaluate(() => document.querySelector('#documentName').innerText);
    assert.equal(inputText, ''); 

    // Check form-progress-bar
    await utils.checkFormProgressBarWidthInRange(page, 0.0, 0.10);
  }, 16000);

  it('Update #documentName value and check progressBar width = 25%', async () => {
    await page.focus('#documentName');
    await page.keyboard.type('ab');

    // Check input value
    const inputHandle = await page.$('#documentName');
    const inputText = await page.evaluate(elem => elem.value, inputHandle);
    assert.equal(inputText, 'ab'); 

    // Check form-progress-bar
    await utils.checkFormProgressBarWidthInRange(page, 0.15, 0.35);
  }, 16000);

  it('#email input should be empty', async () => {
    const inputHandle = await page.$('#email');
    const inputText = await page.evaluate(elem => elem.innerText, inputHandle);
    assert.equal(inputText, ''); 
  }, 16000);

  it('Update #email value and check progressBar width = 50%', async () => {
    await page.focus('#email');
    await page.keyboard.type('example@gmail.com');

    // Check input value
    const inputHandle = await page.$('#email');
    const inputText = await page.evaluate(elem => elem.value, inputHandle);
    assert.equal(inputText, 'example@gmail.com'); 

    // Check form-progress-bar
    await utils.checkFormProgressBarWidthInRange(page, 0.4, 0.5);
  }, 16000);


  it('Update #documentType value = PDF and check progressBar width = 75%', async () => {
    await page.waitForSelector('#documentType', { timeout: 10 });
    await page.select('select#documentType', 'PDF');

    // Check form-progress-bar
    await utils.checkFormProgressBarWidthInRange(page, 0.65, 0.85);
  }, 16000);

  it('Update #category value = Application and check progressBar width = 100%', async () => {
    await page.waitForSelector('#category', { timeout: 10 });
    await page.select('select#category', 'Application');

    // Check form-progress-bar
    await utils.checkFormProgressBarWidthInRange(page, 0.90, 1.00);
  }, 16000);

  it('Set maximum valid length of #documentName and check progressBar width = 100%', async () => {
    await page.waitForSelector('#documentName', { timeout: 10 });
    await page.focus('#documentName');
    await page.keyboard.type('cdefghijklmnopqrstuvwxyz!@#$');

    // Check input value
    const inputText = await page.evaluate(() => document.querySelector('#documentName').value);
    assert.equal(inputText, 'abcdefghijklmnopqrstuvwxyz!@#$');

    // Check form-progress-bar
    await utils.checkFormProgressBarWidthInRange(page, 0.90, 1.00);
  }, 16000);

  it('Set invalid or empty fields and check progressBar width = 25%', async () => {
    await page.focus('#documentName');
    await page.keyboard.type('000');

    await page.select('select#category', 'Audit');
    await page.select('select#documentType', '');

    await page.focus('#email');
    await page.keyboard.type('@@@');

    // Check form-progress-bar
    await utils.checkFormProgressBarWidthInRange(page, 0.15, 0.35);
  }, 16000);

  it('Set invalid values for fields and check progressBar width = 25%', async () => {
    await page.focus('#documentName');
    await page.keyboard.down('Backspace');

    await page.select('select#category', '');

    await page.evaluate(() => document.querySelector('#email').value = '');
    await page.focus('#email');
    await page.keyboard.type('example@@example..com');

    // Check form-progress-bar
    await utils.checkFormProgressBarWidthInRange(page, 0.15, 0.35);
  }, 16000);

});



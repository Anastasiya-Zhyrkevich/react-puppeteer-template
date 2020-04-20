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

  beforeEach(async () => {
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

  afterEach(async () => {
    await browser.close();
  });

  it('h1 loads correctly', async () => {
    // =======================
    {
      const bodyHandle = await page.$('h1');
      const html = await page.evaluate(body => body.innerHTML, bodyHandle);
      assert.equal(html, 'Search Users');
      
      // assert.equal(autocompleteText, ' ');
    }
    // ========================  
  }, 16000);

  it('h1 loads correctly1', async () => {
    // =======================
    {
      const bodyHandle = await page.$('h1');
      const html = await page.evaluate(body => body.innerHTML, bodyHandle);
      assert.equal(html, 'Search Users');
      
      // assert.equal(autocompleteText, ' ');
    }
    // ========================  
  }, 16000);

});

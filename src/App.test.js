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
  it('h1 loads correctly', async () => {
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

    // =======================
    {
      await page.waitForSelector('input', { timeout: 1500 });

      let header = await page.$x('//h1');
      assert.equal(header[0].innerHTML, 'Search Users');

      
      // assert.equal(autocompleteText, ' ');
    }
    // ========================  



    browser.close();
  }, 16000);
});

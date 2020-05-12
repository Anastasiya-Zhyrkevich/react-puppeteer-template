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

  it('First click on card1, expect blue color', async function() {
    await utils.waitForCard(page, '#card1', 1500);
    
    await page.click('#card1');

    await utils.checkCardColor(page, '#card1', "BLUE");
  });

  it('Second click on first card', async function() {
    await page.click('#card1');

    await utils.checkCardColor(page, '#card1', "GRAY");
  });

  it('First click on second card, click does not affect the first card', async function() {
    await page.click('#card2');

    await utils.checkCardColor(page, '#card1', "GRAY");
    await utils.checkCardColor(page, '#card2', "RED");
  });

  it('Add RED card', async function() {
    await page.click('#buttonRed');

    await utils.waitForCard(page, '#card3', 200);
    await utils.checkCardColor(page, '#card3', "GRAY");

    await page.click('#card3');
    await utils.checkCardColor(page, '#card3', "RED");

    await page.click('#card3');
    await utils.checkCardColor(page, '#card3', "GRAY");
  });

  it('Add BLUE card', async function() {
    await page.click('#buttonBlue');

    await utils.waitForCard(page, '#card4', 200);
    await utils.checkCardColor(page, '#card4', "GRAY");

    await page.click('#card4');
    await utils.checkCardColor(page, '#card4', "BLUE");

    await page.click('#card4');
    await utils.checkCardColor(page, '#card4', "GRAY");
  });

  it('Flip first card', async function() {
    await utils.waitForCard(page, '#card1', 200);
    await utils.checkCardColor(page, '#card1', "GRAY");

    await page.click('#card1');
    await utils.checkCardColor(page, '#card1', "BLUE");

    await page.click('#card1');
    await utils.checkCardColor(page, '#card1', "GRAY");
  });

  it('Final state of cards', async function() {
    await utils.checkCardColor(page, '#card1', "GRAY");
    await utils.checkCardColor(page, '#card2', "RED");
    await utils.checkCardColor(page, '#card3', "GRAY");
    await utils.checkCardColor(page, '#card4', "GRAY");
  });

});



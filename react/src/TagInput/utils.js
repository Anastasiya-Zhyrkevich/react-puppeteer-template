const puppeteer = require('puppeteer');
const assert = require('assert');


async function checkInput(page, expectedValue) {
  let inputValue = await page.evaluate(() => document.querySelector('input').value);
  assert.equal(inputValue, expectedValue);
}


async function waitForLoad(page) {
  await page.waitForSelector('input', { timeout: 1500 });
}

exports.checkInput = checkInput;
exports.waitForLoad = waitForLoad;

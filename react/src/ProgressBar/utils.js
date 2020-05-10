const puppeteer = require('puppeteer');
const assert = require('assert');


async function checkInput(page, expectedValue) {
  let inputValue = await page.evaluate(() => document.querySelector('input').value);
  assert.equal(inputValue, expectedValue);
}


async function waitForLoad(page, cssSelector) {
  await page.waitForSelector(cssSelector, { timeout: 1500 });
}

async function elemWidth(page, cssSelector) {
  const eHandle = await page.$(cssSelector);
  const eWidth = await page.evaluate(
    elem => {const {width} = elem.getBoundingClientRect(); return width}, 
    eHandle
  );
  return eWidth;
}

async function _formProgressBarWidthInRange(minBound, maxBound) {
  const progressWidth = document.querySelector('.form-progress-bar-wrapper').getBoundingClientRect().width;
  const formWidth = document.querySelector('.form-progress-bar').getBoundingClientRect().width;
  const p = 1. * formWidth / progressWidth;
  return minBound <= p && p <= maxBound;
}

async function checkFormProgressBarWidthInRange(page, minBound, maxBound) {
  await page.waitForSelector('.form-progress-bar-wrapper', { timeout: 10 });
  await page.waitForSelector('.form-progress-bar', { timeout: 10 });
  await page.waitForFunction(
    _formProgressBarWidthInRange,
    { timeout: 200 },
    minBound, maxBound
  );
}

module.exports = {
  checkInput,
  waitForLoad,
  checkFormProgressBarWidthInRange
};

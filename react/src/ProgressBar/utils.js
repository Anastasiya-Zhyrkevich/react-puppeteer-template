const puppeteer = require('puppeteer');
const assert = require('assert');


async function waitForLoad(page, cssSelector) {
  await page.waitForSelector(cssSelector, { timeout: 1500 });
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
  waitForLoad,
  checkFormProgressBarWidthInRange
};

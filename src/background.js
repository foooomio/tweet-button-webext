'use strict'

// Array Util
const first = array =>
  Array.isArray(array) && array.length > 0 ? array[0] : null

// Quotation
const lqm = '“'
const rqm = '”'
const quote = text => lqm + text + rqm

// URL Builder
const buildUrlParams = params =>
  Object.entries(params).map(([key, value]) =>
    key + '=' + encodeURIComponent(value)
  ).join('&')

const buildUrl = (base, params) =>
  base + '?' + buildUrlParams(params)

// Config
const baseUrl = 'https://twitter.com/intent/tweet'
const code = 'window.getSelection().toString()'

const separator = ' / '
const buildText = (title, selection) =>
  selection ? quote(selection) + separator + title : title

// Entry Point
chrome.browserAction.onClicked.addListener(({ url, title, index }) =>
  chrome.tabs.executeScript({ code }, results =>
    chrome.tabs.create({
      url: buildUrl(baseUrl, { url, text: buildText(title, first(results)) }),
      index: index + 1
    })
  )
)

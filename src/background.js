'use strict'

const quote = (text) => '“' + text + '”'
const buildText = (title, selection) => quote(selection) + ' / ' + title
const buildUrl = (base, params) => base + '?' + new URLSearchParams(params)

const baseUrl = 'https://twitter.com/intent/tweet'
const code = 'window.getSelection().toString()'
const width = 550
const height = 420

chrome.browserAction.onClicked.addListener(({ url, title }) => {
  chrome.tabs.executeScript({ code }, ([selection] = []) => {
    chrome.windows.create({
      url: buildUrl(baseUrl, {
        url: extendedEncodeURI(url),
        text: selection ? buildText(title, selection) : title,
      }),
      left: Math.round((screen.width - width) / 2),
      top: Math.round((screen.height - height) / 2),
      width,
      height,
      type: 'popup',
    })
  })
})

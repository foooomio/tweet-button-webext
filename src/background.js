'use strict'

const quote = (text) => '“' + text + '”'
const buildText = (title, selection) => quote(selection) + ' / ' + title
const buildUrl = (base, params) => base + '?' + new URLSearchParams(params)
const encodeFragment = fragment => '#' + encodeURIComponent(fragment.slice(1)).replace(/[\.!~\*'\(\)]/g, c => '%' + c.charCodeAt(0).toString(16))

const baseUrl = 'https://twitter.com/intent/tweet'
const code = 'window.getSelection().toString()'
const width = 550
const height = 420

chrome.browserAction.onClicked.addListener(({ url, title }) => {
  chrome.tabs.executeScript({ code }, ([selection] = []) => {
    const text = selection ? buildText(title, selection) : title
    const urlEncodedFragment = url.replace(/#.*$/, fragment => encodeFragment(decodeURIComponent(fragment)))
    chrome.windows.create({
      url: buildUrl(baseUrl, { url: urlEncodedFragment, text }),
      left: Math.round((screen.width - width) / 2),
      top: Math.round((screen.height - height) / 2),
      width,
      height,
      type: 'popup',
    })
  })
})

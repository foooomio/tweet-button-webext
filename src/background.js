import { extendedEncodeURI } from './extendedEncodeURI.js';

const url = new URL('https://twitter.com/intent/tweet');
const width = 550;
const height = 420;

/**
 * @param {string} title
 * @param {string} selection
 * @returns {string}
 */
function buildText(title, selection) {
  if (selection) {
    return selection.replace(/^/gm, '> ') + '\n\n' + title;
  } else {
    return title;
  }
}

/**
 * @param {number} tabId
 * @returns {Promise<string>}
 */
async function getSelection(tabId) {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => window.getSelection().toString(),
  });
  return result;
}

chrome.action.onClicked.addListener(async (tab) => {
  const window = await chrome.windows.get(tab.windowId);
  const selection = await getSelection(tab.id).catch((e) => (console.log(e), ''));

  const top = Math.round(window.top + (tab.height - height) / 2);
  const left = Math.round(window.left + (tab.width - width) / 2);

  url.searchParams.set('url', extendedEncodeURI(tab.url));
  url.searchParams.set('text', buildText(tab.title, selection));

  chrome.windows.create({
    url: url.toString(),
    top,
    left,
    width,
    height,
    type: 'popup',
  });
});

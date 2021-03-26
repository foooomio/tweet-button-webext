'use strict'

const assert = require('assert').strict
const twitter = require('twitter-text')

const extendedEncodeURI = require('../src/extendedEncodeURI')

suite('extendedEncodeURI()', () => {
  suite('URLs that should be encoded so that Twitter-Text can recognize them', () => {
    const cases = [
      'https://www.scala-lang.org/api/current/scala/Int.html#==(x:Int):Boolean',
      'https://www.scala-lang.org/api/current/scala/Int.html#^(x:Int):Int',
      'https://www.scala-lang.org/api/current/scala/Int.html#->[B](y:B):(A,B)',
      'https://www.scala-lang.org/api/current/scala/Int.html#getClass():Class[Int]',
      'https://en.wikipedia.org/wiki/Google_(disambiguation)',
      'https://en.wikipedia.org/wiki/Google_()',
      'https://en.wikipedia.org/wiki/Google_(foo),(bar)',
      'https://ja.wikipedia.org/wiki/ウィキペディア',
      'https://ja.wikipedia.org/wiki/山手線_(曖昧さ回避)',
      'https://ypc2e55orj.github.io/playground/,',
      'https://ypc2e55orj.github.io/playground/;',
      'https://ypc2e55orj.github.io/playground/:',
      'https://ypc2e55orj.github.io/playground/!',
      "https://ypc2e55orj.github.io/playground/'",
      'https://ypc2e55orj.github.io/playground/(',
      'https://ypc2e55orj.github.io/playground/)',
      'https://ypc2e55orj.github.io/playground/[',
      'https://ypc2e55orj.github.io/playground/]',
      'https://ypc2e55orj.github.io/playground/@',
      'https://ypc2e55orj.github.io/playground/*',
      'https://ypc2e55orj.github.io/playground/&',
      'https://ypc2e55orj.github.io/playground/=',
      'https://ypc2e55orj.github.io/playground/$',
    ]

    for (const url of cases) {
      test(url, () => {
        const encoded = extendedEncodeURI(url)
        const [extracted] = twitter.extractUrls(encoded)
        assert.equal(extracted, encoded)
      })
    }
  })

  suite('URLs that should not be encoded', () => {
    const cases = [
      'https://example.com/index.html',
      'https://example.com/~username/',
      'https://mastodon.social/@Gargron',
      'https://tools.ietf.org/html/rfc3986#section-2.2',
      'https://en.wikipedia.org/wiki/Google_(disambiguation)',
    ]

    for (const url of cases) {
      test(url, () => {
        const encoded = extendedEncodeURI(url)
        assert.equal(encoded, url)
      })
    }
  })
})

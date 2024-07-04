#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")/.."

NAME="$(basename "$PWD")"
VERSION="$(jq -r .version src/manifest.json)"

rm -rf dist
mkdir -p dist

find . -name .DS_Store -delete

# for Chrome
zip -r "dist/${NAME}-${VERSION}-chrome.zip" src -x src/manifest.*.json

# for Firefox
(
  cd src
  zip -r "../dist/${NAME}-${VERSION}-firefox.zip" ./* -x manifest.*.json
)

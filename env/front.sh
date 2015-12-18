#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR/../src/Rascada && node /usr/local/lib/node_modules/webpack/bin/webpack.js --progress --hide-modules --config webpack-prod.js

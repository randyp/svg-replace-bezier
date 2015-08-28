#!/bin/bash

set -e
browserify=`pwd`"/node_modules/browserify/bin/cmd.js"

pushd agg
emcc --pre-js svg-replace-bezier.pre.js --post-js svg-replace-bezier.post.js --bind -o ../svg-replace-bezier.js *.cpp
popd

npm install
pushd demo
${browserify} index.js > bundle_index.js
popd

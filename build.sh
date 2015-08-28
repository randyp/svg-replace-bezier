#!/bin/bash

set -e

pushd agg
emcc --pre-js svg-replace-bezier.pre.js --post-js svg-replace-bezier.post.js --bind -o ../svg-replace-bezier.js *.cpp
popd

npm install
pushd demo
browserify index.js > bundle_index.js
popd

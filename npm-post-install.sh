#!/bin/bash
node_modules/.bin/bower install
node_modules/.bin/gulp copyScriptToLib
node_modules/.bin/gulp copyCSSToLib
node_modules/.bin/gulp copyFontsToLib
node server.js
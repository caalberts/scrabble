# Scrabble

[![Travis Build Status](https://img.shields.io/travis/caalberts/scrabble.svg?style=flat-square)](https://travis-ci.org/caalberts/scrabble)
[![Gemnasium Status](https://img.shields.io/gemnasium/caalberts/scrabble.svg?style=flat-square)](https://gemnasium.com/caalberts/scrabble)

A front-end two-player scrabble game created for General Assembly Web Development Immersive project submission using HTML, CSS and Javascript.

[![Screenshot of Scrabble](docs/scrabble.png)](http://scrabble.caalberts.xyz)

## Tools and Libraries
- Babelify
- Browserify
- brfs
- watch-spawn
- HTTP Server
- Travis CI
- Heroku
- Dragula

## Approach
- Scrabble board is created with DOM manipulation
- Scrabble tiles created with an array of objects with letter and score as properties
- User interaction created using Dragula drag and drop package
- Built scripts to read words from the board and check against Sowpods dictionary
- Automated testing and deployemnt workflow with GitHub, Travis and Heroku

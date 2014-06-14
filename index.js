var through = require('through2')
var split = require('split2')
var EOL = require('os').EOL

module.exports = parse
module.exports.serialize = serialize
module.exports.parse = parse

function parse() {
  return split(function(row) {
    if (row) return JSON.parse(row)
  })
}

function serialize() {
  return through.obj(function(obj, enc, cb) {
    cb(null, JSON.stringify(obj) + EOL)
  })
}

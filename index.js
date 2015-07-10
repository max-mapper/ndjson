var through = require('through2')
var split = require('split2')
var EOL = require('os').EOL

module.exports = parse
module.exports.serialize = module.exports.stringify = serialize
module.exports.parse = parse

function parse (opts) {
  opts = opts || {}
  opts.strict = opts.strict !== false

  function parseRow (row) {
    try {
      if (row) return JSON.parse(row)
    } catch (e) {
      if (opts.strict) {
        this.emit('error', new Error('Could not parse row ' + row.slice(0, 50) + '...'))
      }
    }
  }

  return split(parseRow)
}

function serialize (opts) {
  var first = true

  opts = opts || {separator: EOL}

  var s = through.obj(function(obj, enc, cb) {
    if (first) {
      first = false
      cb(null, JSON.stringify(obj))
    } else {
      cb(null, opts.separator + JSON.stringify(obj))
    }
  }, function(cb) {
    this.push((opts.after || '') + EOL)
    cb()
  })

  s.push(opts.before || '')

  return s
}

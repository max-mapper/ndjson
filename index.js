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
  if (!opts) opts = {}
  if (!opts.separator) opts.separator = EOL
  if (!opts.after) opts.after = EOL
  var firstWrite = true
  var serializer = through.obj(function write (obj, enc, cb) {
    var out = ""
    if (firstWrite) {
      if (typeof opts.before !== 'undefined') out += opts.before
      out += JSON.stringify(obj)
      firstWrite = false
    } else {
      out += opts.separator
      out += JSON.stringify(obj)
    }
    cb(null, out)
  }, function end (cb) {
    if (typeof opts.after !== 'undefined') serializer.push(opts.after)
    cb()
  })
  
  return serializer
}

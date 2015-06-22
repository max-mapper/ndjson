# ndjson

#### streaming [newline delimited json](https://en.wikipedia.org/wiki/Line_Delimited_JSON) parser + serializer

[![NPM](https://nodei.co/npm/ndjson.png)](https://nodei.co/npm/ndjson/)

## usage

```
var ndjson = require('ndjson')
```

#### ndjson.parse(opts)

returns a transform stream that accepts newline delimited json and emits objects

example newline delimited json:

`data.txt`:

```
{"foo": "bar"}
{"hello": "world"}
```

If you want to discard non-valid JSON messages, you can call `ndjson.parse({strict: false})`

usage:

```js
fs.createReadStream('data.txt')
  .pipe(ndjson.parse())
  .on('data', function(obj) {
    // obj is a javascript object
  })
```

#### ndjson.serialize(opts) / ndjson.stringify(opts)

returns a transform stream that accepts json objects and emits newline delimited json

example usage:

```js
var serialize = ndjson.serialize()
serialize.on('data', function(line) {
  // line is a line of stringified JSON with a newline delimiter at the end
})
serialize.write({"foo": "bar"})
serialize.end()
```

##### Options

- `before` - a string to put before the stream
- `after` - a string to put after the stream, defaults to `os.EOL` (e.g. `\n`)
- `separator` - a string to put between items in the stream, defaults to `os.EOL` (e.g. `\n`)

### license

BSD-3-Clause

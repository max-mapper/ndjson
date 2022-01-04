# Development on this npm package is moved to https://github.com/ndjson/ndjson.js


# ndjson

Streaming [newline delimited json](https://en.wikipedia.org/wiki/Line_Delimited_JSON) parser + serializer. Available as a JS API and a CLI.

[![NPM](https://nodei.co/npm/ndjson.png)](https://nodei.co/npm/ndjson/)

## Usage

```
const ndjson = require('ndjson')
```

#### ndjson.parse([opts])

Returns a transform stream that accepts newline delimited json buffers and emits objects of parsed data.

Example file:

```
{"foo": "bar"}
{"hello": "world"}
```

Parsing it:

```js
fs.createReadStream('data.txt')
  .pipe(ndjson.parse())
  .on('data', function(obj) {
    // obj is a javascript object
  })
```


##### Options

- `strict` can be set to false to discard non-valid JSON messages
- All other options are passed through to the stream class.

#### ndjson.stringify([opts])

Returns a transform stream that accepts JSON objects and emits newline delimited json buffers.

Example usage:

```js
const stream = ndjson.stringify()
stream.on('data', function(line) {
  // line is a line of stringified JSON with a newline delimiter at the end
})
stream.write({"foo": "bar"})
stream.end()
```

##### Options

Options are passed through to the stream class.

### LICENSE

BSD-3-Clause

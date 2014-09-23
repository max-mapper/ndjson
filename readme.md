# ndjson

#### streaming newline delimited json parser + serializer

[![NPM](https://nodei.co/npm/ndjson.png)](https://nodei.co/npm/ndjson/)

## usage

```
var ndjson = require('ndjson')
```

#### ndjson.parse()

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

#### ndjson.serialize() / ndjson.stringify()

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

### license

BSD

# ldjson

#### streaming line delimited json parser + serializer

[![NPM](https://nodei.co/npm/ldjson.png)](https://nodei.co/npm/ldjson/)

## usage

#### ldjson.parse()

returns a transform stream that accepts newline delimited json and emits objects

example newline delimited json:

`data.txt`:

```
{"foo": "bar"}
{"hello": "world"}
```

usage:

```js
fs.createReadStream('data.txt')
  .pipe(require('ldjson').parse())
  .on('data', function(obj) {
    // obj is a javascript object
  })
```

#### ldjson.serialize()

returns a transform stream that accepts json objects and emits newline delimited json

example usage:

```js
var serialize = require('ldjson').serialize()
serialize.on('data', function(line) {
  // line is a line of stringified JSON with a newline delimiter at the end
})
serialize.write({"foo": "bar"})
serialize.end()
```

### license

BSD

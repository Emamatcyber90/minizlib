'use strict'

const zlib = require('../')
const t = require('tap')

// Throws if `opts.chunkSize` is invalid
t.throws(
  _ => new zlib.Deflate({chunkSize: -Infinity}),
  new Error('Invalid chunk size: -Infinity')
)

// Confirm that maximum chunk size cannot be exceeded because it is `Infinity`.
t.equal(zlib.constants.Z_MAX_CHUNK, Infinity)

// Throws if `opts.windowBits` is invalid
t.throws(
  _ => new zlib.Deflate({windowBits: -Infinity}),
  new Error('Invalid windowBits: -Infinity')
)

t.throws(
  _ => new zlib.Deflate({windowBits: Infinity}),
  new Error('Invalid windowBits: Infinity')
)

// Throws if `opts.level` is invalid
t.throws(
  _ => new zlib.Deflate({level: -Infinity}),
  new Error('Invalid compression level: -Infinity')
)

t.throws(
  _ => new zlib.Deflate({level: Infinity}),
  new Error('Invalid compression level: Infinity')
)

// Throws a RangeError if `level` invalid in  `Deflate.prototype.params()`
t.throws(
  _ => new zlib.Deflate().params(-Infinity),
  new RangeError('Invalid compression level: -Infinity')
)

t.throws(
  _ => new zlib.Deflate().params(Infinity),
  new RangeError('Invalid compression level: Infinity')
)

// Throws if `opts.memLevel` is invalid
t.throws(
  _ => new zlib.Deflate({memLevel: -Infinity}),
  new Error('Invalid memLevel: -Infinity')
)

t.throws(
  _ => new zlib.Deflate({memLevel: Infinity}),
  new Error('Invalid memLevel: Infinity')
)

// Does not throw if opts.strategy is valid
t.doesNotThrow(
  _ => new zlib.Deflate({strategy: zlib.constants.Z_FILTERED})
)

t.doesNotThrow(
  _ => new zlib.Deflate({strategy: zlib.constants.Z_HUFFMAN_ONLY})
)

t.doesNotThrow(
  _ => new zlib.Deflate({strategy: zlib.constants.Z_RLE})
)

t.doesNotThrow(
  _ => new zlib.Deflate({strategy: zlib.constants.Z_FIXED})
)

t.doesNotThrow(
  _ => new zlib.Deflate({ strategy: zlib.constants.Z_DEFAULT_STRATEGY})
)

// Throws if opt.strategy is the wrong type.
t.throws(
  _ => new zlib.Deflate({strategy: '' + zlib.constants.Z_RLE }),
  new Error('Invalid strategy: 3')
)

// Throws if opts.strategy is invalid
t.throws(
  _ => new zlib.Deflate({strategy: 'this is a bogus strategy'}),
  new Error('Invalid strategy: this is a bogus strategy')
)

// Throws TypeError if `strategy` is invalid in `Deflate.prototype.params()`
t.throws(
  _ => new zlib.Deflate().params(0, 'I am an invalid strategy'),
  new TypeError('Invalid strategy: I am an invalid strategy')
)

// Throws if opts.dictionary is not a Buffer
t.throws(
  _ => new zlib.Deflate({dictionary: 'not a buffer'}),
  new Error('Invalid dictionary: it should be a Buffer instance')
)

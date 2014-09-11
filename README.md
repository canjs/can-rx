# can.rx

`can.rx` is a [CanJS](https://github.com/bitovi/canjs) plugin that lets you
create [RxJS](https://github.com/Reactive-Extensions/RxJS) `Observable`s from
`CanJS` event handlers, as well as feed `Observable` streams back into `CanJS`
observables. The result is a delicious, canned-bacon-flavored mix of
[FRP](https://en.wikipedia.org/wiki/Functional_reactive_programming) and
`CanJS`-style declarative MVC.

`can.rx` implements the
[can.eventstream](https://github.com/sykopomp/can.eventstream) interface and
adds a few methods to `RxJS` objects (documented below). For information on the
`CanJS` side of the interface, please refer to `can.eventstream`'s
documentation.

Check out `dist/sandbox.html` and `dist/sandbox.js` for some rough usage
examples, including a fairly short drag-and-drop demo using `can.Component`, and
super-simple, single-line two-way binding between pairs of computes and pairs of
`can.Map`s.

`can.rx` is
[hosted at Github](http://github.com/sykopomp/can.rx). `can.rx` is a
public domain work, dedicated using
[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Feel free to do
whatever you want with it.

# Quickstart

### Install

`$ npm install can.rx`
or
`$ bower install can.rx`

Prebuilt releases are included in `dist`.

### Example

```javascript
var compute = can.compute(),
    observable = compute.bind();

observable.subscribe(function(x) { console.log("Value changed: ", x); });

compute(1);

observable.toCompute().bind("change", function() {
  console.log("compute updated from property change.");
});

compute(2);

```

# Documentation

For the most part, `can.rx` is a straightforward implementation of the
`can.eventstream` interface.

`can.rx` also extends `Rx.Observable.prototype` with a few utility methods
that directly wrap `can.eventstream` functions, documented below.

### `Rx.Observable#toCompute([compute=can.compute()])`

Wraps `can.bindComputeFromStream`.

`stream.toCompute(compute)` is the same as `can.bindComputeFromStream(stream,
compute);`

### `Rx.Observable#toMap([map=new can.Map()])`

Wraps `can.bindMapFromStream`.

`stream.toMap(compute)` is the same as `can.bindMapFromStream(stream,
compute);`

### `Rx.Observable#toList([list=new can.List()])`

Wraps `can.bindListFromStream`.

`stream.toList(compute)` is the same as `can.bindListFromStream(stream,
compute);`

module rx from "rx";
module can from "can";
import "can.eventstream";

/**
 * Wraps `can.bindComputeFromStream`.
 *
 * `stream.toCompute(compute)` is the same as
 * `can.bindComputeFromStream(stream, compute);`
 */
rx.Observable.prototype.toCompute = function(compute=can.compute()) {
  return can.bindComputeFromStream(this, compute);
};

/**
 * Wraps `can.bindMapFromStream`.
 *
 * `stream.toMap(compute)` is the same as
 * `can.bindMapFromStream(stream, compute);`
 */
rx.Observable.prototype.toMap = function(map=new can.Map()) {
  return can.bindMapFromStream(this, map);
};

/**
 * Wraps `can.bindListFromStream`.
 *
 * `stream.toList(compute)` is the same as
 * `can.bindListFromStream(stream, compute);`
 */
rx.Observable.prototype.toList = function(list=new can.List()) {
  return can.bindListFromStream(this, list);
};

can.EventStream = {};
can.EventStream.isEventStream = (stream) => stream instanceof rx.Observable;
can.EventStream.onValue = (stream, callback) => stream.subscribe(callback);
can.EventStream.bind = function(ctx, ev, selector) {
  ev = ev == null ? "change" : ev;
  var stream = rx.Observable.fromEventPattern(
    selector ?
      cb => can.delegate.call(ctx, selector, ev, cb) :
      cb => can.bind.call(ctx, ev, cb),
    selector ?
      cb => can.undelegate.call(ctx, selector, ev, cb) :
      cb => can.unbind.call(ctx, ev, cb),
    args => chooseEventData(ctx, args, ev));
  return stream;
};
can.EventStream.untilStream = (stream, until) => stream.takeUntil(until);

function chooseEventData(ctx, eventArgs, evName) {
  if (ctx.isComputed) {
    return eventArgs[1];
  } else if (ctx.getEventValueForStream) {
    return ctx.getEventValueForStream(eventArgs, evName);
  } else {
    return eventArgs[0];
  }
}

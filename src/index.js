module rx from "rx";
module can from "can";
import "can.eventstream";

/**
 * Wraps `can.bindComputeFromStream`.
 *
 * `stream.toCanCompute(compute)` is the same as
 * `can.bindComputeFromStream(stream, compute);`
 */
rx.Observable.prototype.toCanCompute = function(compute=can.compute()) {
  return can.bindComputeFromStream(this, compute);
};

/**
 * Wraps `can.bindMapFromStream`.
 *
 * `stream.toCanMap(compute)` is the same as
 * `can.bindMapFromStream(stream, compute);`
 */
rx.Observable.prototype.toCanMap = function(map=new can.Map()) {
  return can.bindMapFromStream(this, map);
};

/**
 * Wraps `can.bindListFromStream`.
 *
 * `stream.toCanList(compute)` is the same as
 * `can.bindListFromStream(stream, compute);`
 */
rx.Observable.prototype.toCanList = function(list=new can.List()) {
  return can.bindListFromStream(this, list);
};

can.isEventStream = (stream) => stream instanceof rx.Observable;
can.onEventStreamValue = (stream, callback) => stream.subscribe(callback);
can.bindEventStream = function(ctx, ev, selector) {
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
can.eventStreamUntil = (stream, until) => stream.takeUntil(until);

function chooseEventData(ctx, eventArgs, evName) {
  if (ctx.isComputed) {
    return eventArgs[1];
  } else if (ctx.getEventValueForStream) {
    return ctx.getEventValueForStream(eventArgs, evName);
  } else {
    return eventArgs[0];
  }
}

var compute = can.compute(),
    observable = compute.bind();

observable.subscribe(function(x) { console.log("Value changed: ", x); });

compute(1);

observable.toCanCompute().bind("change", function() {
  console.log("compute updated from property change.");
});

compute(2);

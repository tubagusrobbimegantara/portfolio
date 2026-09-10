import assert from "node:assert/strict";
import { atFrame, makeRoute, places } from "../src/routes.ts";

const expected = [
  { kilometres: 26, frames: 256, order: [2, 1, 3, 0] },
  { kilometres: 20, frames: 208, order: [1, 2, 3, 0] },
  { kilometres: 24, frames: 240, order: [1, 3, 2, 0] },
];
expected.forEach(({ kilometres, frames, order }, index) => {
  const route = makeRoute(index);
  assert.equal(route.totalLength / 40, kilometres);
  assert.equal(route.duration, frames);
  assert.deepEqual(route.arrivals.map((arrival) => arrival.place), order);
  assert.equal(atFrame(route, 0).x, places[0].x);
  assert.equal(atFrame(route, 0).y, places[0].y);
  route.arrivals.forEach(({ place, frame }) => {
    const arrived = atFrame(route, frame);
    assert.equal(arrived.x, places[place].x);
    assert.equal(arrived.y, places[place].y);
  });
  let previous = atFrame(route, 0);
  for (let frame = 1; frame < frames; frame++) {
    const current = atFrame(route, frame);
    assert.ok(Math.abs(current.x - previous.x) + Math.abs(current.y - previous.y) <= 5.000001, "No jumping or excess speed");
    assert.ok(current.length >= previous.length, "Distance must never reverse");
    previous = current;
  }
  assert.equal(previous.x, places[0].x);
  assert.equal(previous.y, places[0].y);
  assert.equal(previous.length / 40, kilometres);
});
console.log("All 3 routes visit the expected stores, preserve speed, and return to the warehouse.");

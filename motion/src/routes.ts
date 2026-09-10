export const places = [
  { name: "Gudang", x: 80, y: 184 },
  { name: "Toko 1", x: 160, y: 64 },
  { name: "Toko 2", x: 320, y: 104 },
  { name: "Toko 3", x: 280, y: 224 },
];

// The town uses a Manhattan grid. Each 40 SVG units represents one kilometre.
// Travel always goes horizontally, then vertically, as in the website demo.
export const orders = [[0, 2, 1, 3, 0], [0, 1, 2, 3, 0], [0, 1, 3, 2, 0]];
const speed = 5; // SVG units per frame; identical in all three comparisons.
const departureFrame = 12;
const stopFrames = 6;

export const makeRoute = (routeIndex: number) => {
  const order = orders[routeIndex];
  if (!order) throw new Error(`Unknown route ${routeIndex}`);
  let arrivalFrame = departureFrame;
  let totalLength = 0;
  const segments: { x: number; y: number; dx: number; dy: number; start: number; end: number; length: number; before: number }[] = [];
  const arrivals: { place: number; frame: number }[] = [];
  order.slice(1).forEach((place, i) => {
    const from = places[order[i]];
    const to = places[place];
    [[from.x, from.y, to.x - from.x, 0], [to.x, from.y, 0, to.y - from.y]].forEach(([x, y, dx, dy]) => {
      const length = Math.abs(dx) + Math.abs(dy);
      if (!length) return;
      segments.push({ x, y, dx, dy, start: arrivalFrame, end: arrivalFrame + length / speed, length, before: totalLength });
      arrivalFrame += length / speed;
      totalLength += length;
    });
    arrivals.push({ place, frame: arrivalFrame });
    if (place !== 0) arrivalFrame += stopFrames;
  });
  return {
    segments,
    arrivals,
    totalLength,
    duration: arrivalFrame + 18,
    path: `M${places[0].x} ${places[0].y} ` + order.slice(1).map((n) => `H${places[n].x}V${places[n].y}`).join(" "),
  };
};

export const atFrame = (route: ReturnType<typeof makeRoute>, frame: number) => {
  const segment = route.segments.find((part) => frame <= part.end) ?? route.segments[route.segments.length - 1];
  const progress = Math.max(0, Math.min(1, (frame - segment.start) / (segment.end - segment.start)));
  return {
    x: segment.x + segment.dx * progress,
    y: segment.y + segment.dy * progress,
    angle: Math.atan2(segment.dy, segment.dx) * 180 / Math.PI,
    length: segment.before + segment.length * progress,
  };
};

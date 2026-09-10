import { loadFont } from "@remotion/fonts";
import { AbsoluteFill, CanvasImage, staticFile, useCurrentFrame } from "remotion";
import { atFrame, makeRoute, places } from "./routes";

loadFont({ family: "Fredoka", url: staticFile("fredoka-bold-latin.woff2"), weight: "700" });

const labels = [
  { label: "G", x: 52, y: 200 },
  { label: "1", x: 172, y: 58 },
  { label: "2", x: 335, y: 98 },
  { label: "3", x: 295, y: 241 },
];

export const RouteJourney: React.FC<{ routeIndex: number }> = ({ routeIndex }) => {
  const frame = useCurrentFrame();
  const route = makeRoute(routeIndex);
  const truck = atFrame(route, frame);
  return (
    <AbsoluteFill style={{ backgroundColor: "#f5ebda" }}>
      <CanvasImage src={staticFile("route-town.svg")} style={{ width: "100%", height: "100%" }} />
      <svg viewBox="0 0 400 280" style={{ position: "absolute", width: "100%", height: "100%", overflow: "visible" }}>
        <path d={route.path} fill="none" stroke="#a88454" strokeWidth="2" strokeDasharray="5 5" opacity="0.5" />
        <path d={route.path} fill="none" stroke="#7d3436" strokeWidth="4" strokeLinejoin="round" strokeDasharray={route.totalLength} strokeDashoffset={route.totalLength - truck.length} />
        {places.map((place, index) => {
          const arrived = route.arrivals.some((arrival) => arrival.place === index && arrival.frame <= frame);
          return <rect key={place.name} x={place.x - 4} y={place.y - 4} width="8" height="8" fill={arrived ? "#5d2021" : "#fffdf9"} stroke="#5d2021" strokeWidth="2" />;
        })}
        {labels.map(({ label, x, y }) => (
          <g key={label}>
            <rect x={x - 9} y={y - 16} width="22" height="22" rx="2" fill="#fffdf9" />
            <text x={x + 2} y={y + 1} textAnchor="middle" fontFamily="Fredoka" fontSize="18" fontWeight="700" fill="#5d2021">{label}</text>
          </g>
        ))}
        <g style={{ translate: `${truck.x}px ${truck.y}px`, rotate: `${truck.angle}deg` }} shapeRendering="crispEdges">
          <path d="M-13-8H5V-4h9V8h-27z" fill="#a88454" stroke="#fffdf9" strokeWidth="1.5" />
          <path d="M6-3h5v5H6z" fill="#fffdf9" />
          <path d="M-10 5h6v6h-6zm16 0h6v6H6z" fill="#382c29" />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

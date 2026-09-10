import { Composition } from "remotion";
import { RouteJourney } from "./RouteJourney";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Route1" component={RouteJourney} durationInFrames={256} fps={30} width={800} height={560} defaultProps={{ routeIndex: 0 }} />
      <Composition id="Route2" component={RouteJourney} durationInFrames={208} fps={30} width={800} height={560} defaultProps={{ routeIndex: 1 }} />
      <Composition id="Route3" component={RouteJourney} durationInFrames={240} fps={30} width={800} height={560} defaultProps={{ routeIndex: 2 }} />
    </>
  );
};

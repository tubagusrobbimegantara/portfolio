# Mathantara route animations

Three short, silent videos explain the homepage delivery routes. All use the
same pixel town, destinations and horizontal-then-vertical Manhattan paths as
`src/components/RouteExplorer.astro`. Each 40 SVG units is one kilometre. The truck
moves at the same speed in all three clips, stops briefly at each store, then
returns to the warehouse.

| File | Distance | Duration | Frame count |
| --- | --- | --- | --- |
| `public/motion/route-1.mp4` | 26 km | 8.53 s | 256 |
| `public/motion/route-2.mp4` | 20 km | 6.93 s | 208 |
| `public/motion/route-3.mp4` | 24 km | 8 s | 240 |

Output is H.264, 800 x 560, 30 fps, yuv420p, without audio. The website serves the
rendered files on explicit play; React and Remotion are only authoring tools and
are not added to the Astro runtime. The static SVG and HTML remain available
without video playback.

From this directory (Node 22.18+):

```console
npm ci
npm run lint
npm test
npm run dev
npm run render
```

`npm run render` copies the authoritative town SVG and local Fredoka Bold font
into the ignored `motion/public/` staging directory, then exports all three MP4s
into the website's `public/motion/` directory. If only rendering one composition,
first run `node scripts/prepare-assets.mjs`, then `npm run render:1` (or 2/3).
Remotion may download its headless renderer the first time it runs.

For a representative still:

```console
npx remotion still src/index.ts Route1 out/route-1-mid.png --frame=85
```

The outer map background is `#f5ebda`, matching the homepage map surface. Compact
G/1/2/3 labels use the site's local Fredoka Bold file. Keep the shared
town at `public/art/route-town.svg`, coordinates and HTML route descriptions in
sync when changing the example.

Remotion is pinned in `package-lock.json`. See the
[Remotion license](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)
for its terms. Fredoka's license is in `public/fonts/Fredoka-OFL.txt` at the
website root.

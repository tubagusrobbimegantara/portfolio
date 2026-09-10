import { copyFile, mkdir } from "node:fs/promises";

const project = new URL("../", import.meta.url);
await mkdir(new URL("public/", project), { recursive: true });
await Promise.all([
  copyFile(new URL("../public/art/route-town.svg", project), new URL("public/route-town.svg", project)),
  copyFile(new URL("../public/fonts/fredoka-bold-latin.woff2", project), new URL("public/fredoka-bold-latin.woff2", project)),
]);

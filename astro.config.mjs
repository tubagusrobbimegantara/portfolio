// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
	site: "https://example.com",
	integrations: [sitemap()],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
	i18n: {
		defaultLocale: "id",
		locales: ["id", "en"],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});

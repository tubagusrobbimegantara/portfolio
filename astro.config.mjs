// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

/** Membungkus setiap <table> dengan div agar tabel lebar bisa digeser mendatar. */
function rehypeBungkusTabel() {
	/** @param {any} tree */
	return (tree) => {
		/** @param {any} simpul */
		const telusuri = (simpul) => {
			if (!simpul.children) return;
			simpul.children = simpul.children.map((/** @type {any} */ anak) => {
				telusuri(anak);
				if (anak.type === "element" && anak.tagName === "table") {
					return {
						type: "element",
						tagName: "div",
						properties: { className: ["tabel-bungkus"] },
						children: [anak],
					};
				}
				return anak;
			});
		};
		telusuri(tree);
	};
}

export default defineConfig({
	site: "https://mathantara.com",
	integrations: [sitemap()],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
	markdown: {
		// LaTeX: $inline$ dan $$display$$ dirender jadi HTML saat build (KaTeX).
		remarkPlugins: [remarkMath],
		rehypePlugins: [
			[rehypeKatex, { throwOnError: false, strict: false }],
			rehypeBungkusTabel,
		],
		shikiConfig: { theme: "github-light", wrap: true },
	},
});

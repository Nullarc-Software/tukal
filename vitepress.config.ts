import { defineConfig } from "vite";

export default defineConfig({
	base: "/src/components",

	// Additional Vite configuration options
	// ...

	optimizeDeps: {
		include: [
			"vue",
			"vue-router",
		],
	},

	// TypeScript configuration for Vite
});

  
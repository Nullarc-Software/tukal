import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		Components({
			dts: true, // Generate types for auto-imported components
			dirs: ["src/components"], // Directory to scan for components
			deep: true, // Search subdirectories
			resolvers: [
				// Custom resolver for tukal components
				(componentName) => {
					if (componentName.startsWith("Tu")) {
						// Convert TuSelect -> tuSelect, TuButton -> tuButton, etc.
						const kebabName = componentName.replace(/^Tu/, "tu");
						return {
							name: componentName,
							from: `./src/components/${kebabName}`
						};
					}
				}
			]
		}),
		dts({
			include: ["src/lib.ts","src/components/**/*.vue", "src/components/**/*.ts", "src/components.d.ts", "src/utils/**/*.ts"],
			beforeWriteFile: (filePath, content) => {
				// Auto-generate global component types
				if (filePath.includes("components.d.ts")) {
					// You can add custom logic here to enhance the generated types
				}
				return { filePath, content };
			},
			insertTypesEntry: true,
			cleanVueFileName: true,
			skipDiagnostics: false,
			logDiagnostics: true
		}),
		vue()
	],
	build: {
		emptyOutDir: true,
		minify: false,
		lib: {
			entry: "./src/lib.ts",
			name: "tukal-vue",
			fileName: "tukal-vue"
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ["vue"],
			output: {
			// Provide global variables to use in the UMD build
			// for externalized deps
				globals: {
					vue: "Vue"
				}
			}
		}
	},
	server: {
		port: 5174
	},
	resolve: {
		alias: [
			{ find: "@", replacement: resolve(__dirname, "src") },
		],
	},
	test:{
		environment: "jsdom",
	}
});
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [dts(), vue()],
	build: {
		emptyOutDir: true,
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
	resolve: {
		alias: [
			{ find: "@", replacement: resolve(__dirname, "src") },
		],
	}
});

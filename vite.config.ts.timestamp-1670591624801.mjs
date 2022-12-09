// vite.config.ts
import { defineConfig } from "file:///D:/tukal/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/tukal/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import dts from "file:///D:/tukal/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\tukal";
var vite_config_default = defineConfig({
  plugins: [dts(), vue()],
  build: {
    emptyOutDir: true,
    lib: {
      entry: "./src/lib.ts",
      name: "tukal-vue",
      fileName: "tukal-vue"
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__vite_injected_original_dirname, "src") }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx0dWthbFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdHVrYWxcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3R1a2FsL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcblx0cGx1Z2luczogW2R0cygpLCB2dWUoKV0sXHJcblx0YnVpbGQ6IHtcclxuXHRcdGVtcHR5T3V0RGlyOiB0cnVlLFxyXG5cdFx0bGliOiB7XHJcblx0XHRcdGVudHJ5OiBcIi4vc3JjL2xpYi50c1wiLFxyXG5cdFx0XHRuYW1lOiBcInR1a2FsLXZ1ZVwiLFxyXG5cdFx0XHRmaWxlTmFtZTogXCJ0dWthbC12dWVcIlxyXG5cdFx0fSxcclxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcclxuXHRcdFx0Ly8gbWFrZSBzdXJlIHRvIGV4dGVybmFsaXplIGRlcHMgdGhhdCBzaG91bGRuJ3QgYmUgYnVuZGxlZFxyXG5cdFx0XHQvLyBpbnRvIHlvdXIgbGlicmFyeVxyXG5cdFx0XHRleHRlcm5hbDogW1widnVlXCJdLFxyXG5cdFx0XHRvdXRwdXQ6IHtcclxuXHRcdFx0Ly8gUHJvdmlkZSBnbG9iYWwgdmFyaWFibGVzIHRvIHVzZSBpbiB0aGUgVU1EIGJ1aWxkXHJcblx0XHRcdC8vIGZvciBleHRlcm5hbGl6ZWQgZGVwc1xyXG5cdFx0XHRcdGdsb2JhbHM6IHtcclxuXHRcdFx0XHRcdHZ1ZTogXCJWdWVcIlxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0cmVzb2x2ZToge1xyXG5cdFx0YWxpYXM6IFtcclxuXHRcdFx0eyBmaW5kOiBcIkBcIiwgcmVwbGFjZW1lbnQ6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSB9LFxyXG5cdFx0XSxcclxuXHR9XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThNLFNBQVMsb0JBQW9CO0FBQzNPLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxTQUFTO0FBSGhCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQUEsRUFDdEIsT0FBTztBQUFBLElBQ04sYUFBYTtBQUFBLElBQ2IsS0FBSztBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1g7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUdkLFVBQVUsQ0FBQyxLQUFLO0FBQUEsTUFDaEIsUUFBUTtBQUFBLFFBR1AsU0FBUztBQUFBLFVBQ1IsS0FBSztBQUFBLFFBQ047QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNSLE9BQU87QUFBQSxNQUNOLEVBQUUsTUFBTSxLQUFLLGFBQWEsUUFBUSxrQ0FBVyxLQUFLLEVBQUU7QUFBQSxJQUNyRDtBQUFBLEVBQ0Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

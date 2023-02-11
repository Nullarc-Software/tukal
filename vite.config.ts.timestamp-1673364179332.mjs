// vite.config.ts
import { defineConfig } from "file:///C:/Users/tushar/Documents/tukal/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/tushar/Documents/tukal/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import dts from "file:///C:/Users/tushar/Documents/tukal/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\tushar\\Documents\\tukal";
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
  server: {
    port: 5174
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0dXNoYXJcXFxcRG9jdW1lbnRzXFxcXHR1a2FsXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0dXNoYXJcXFxcRG9jdW1lbnRzXFxcXHR1a2FsXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy90dXNoYXIvRG9jdW1lbnRzL3R1a2FsL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcblx0cGx1Z2luczogW2R0cygpLCB2dWUoKV0sXHJcblx0YnVpbGQ6IHtcclxuXHRcdGVtcHR5T3V0RGlyOiB0cnVlLFxyXG5cdFx0bGliOiB7XHJcblx0XHRcdGVudHJ5OiBcIi4vc3JjL2xpYi50c1wiLFxyXG5cdFx0XHRuYW1lOiBcInR1a2FsLXZ1ZVwiLFxyXG5cdFx0XHRmaWxlTmFtZTogXCJ0dWthbC12dWVcIlxyXG5cdFx0fSxcclxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcclxuXHRcdFx0Ly8gbWFrZSBzdXJlIHRvIGV4dGVybmFsaXplIGRlcHMgdGhhdCBzaG91bGRuJ3QgYmUgYnVuZGxlZFxyXG5cdFx0XHQvLyBpbnRvIHlvdXIgbGlicmFyeVxyXG5cdFx0XHRleHRlcm5hbDogW1widnVlXCJdLFxyXG5cdFx0XHRvdXRwdXQ6IHtcclxuXHRcdFx0Ly8gUHJvdmlkZSBnbG9iYWwgdmFyaWFibGVzIHRvIHVzZSBpbiB0aGUgVU1EIGJ1aWxkXHJcblx0XHRcdC8vIGZvciBleHRlcm5hbGl6ZWQgZGVwc1xyXG5cdFx0XHRcdGdsb2JhbHM6IHtcclxuXHRcdFx0XHRcdHZ1ZTogXCJWdWVcIlxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0c2VydmVyOiB7XHJcblx0XHRwb3J0OiA1MTc0XHJcblx0fSxcclxuXHRyZXNvbHZlOiB7XHJcblx0XHRhbGlhczogW1xyXG5cdFx0XHR7IGZpbmQ6IFwiQFwiLCByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpIH0sXHJcblx0XHRdLFxyXG5cdH1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVIsU0FBUyxvQkFBb0I7QUFDdFQsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFNBQVM7QUFIaEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFBQSxFQUN0QixPQUFPO0FBQUEsSUFDTixhQUFhO0FBQUEsSUFDYixLQUFLO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWDtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BR2QsVUFBVSxDQUFDLEtBQUs7QUFBQSxNQUNoQixRQUFRO0FBQUEsUUFHUCxTQUFTO0FBQUEsVUFDUixLQUFLO0FBQUEsUUFDTjtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1A7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNSLE9BQU87QUFBQSxNQUNOLEVBQUUsTUFBTSxLQUFLLGFBQWEsUUFBUSxrQ0FBVyxLQUFLLEVBQUU7QUFBQSxJQUNyRDtBQUFBLEVBQ0Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

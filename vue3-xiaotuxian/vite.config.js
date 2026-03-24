import {fileURLToPath, URL} from "node:url";

import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

// ElementPlus包
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    // ElementPlus按需引入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // ElementPlus支持sass
      resolvers: [
        ElementPlusResolver({importStyle: "sass"}),
      ],
    }),
  ],
  resolve: {
    alias: {
      // @符号指向src目录
      "@": fileURLToPath(new URL("./src", import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/vars.scss" as *;
        `,
      }
    }
  }
});

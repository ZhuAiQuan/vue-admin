import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      store: path.resolve(__dirname, "src/store"),
      router: path.resolve(__dirname, "src/router"),
      views: path.resolve(__dirname, "src/views"),
      components: path.resolve(__dirname, "src/components"),
      api: path.resolve(__dirname, "src/api"),
      utils: path.resolve(__dirname, "src/utils"),
      assets: path.resolve(__dirname, "src/assets")
    },
    extensions: [".mjs", ".js", ".ts", ".vue", ".json"],
  },
  server: {
    host: '0.0.0.0',
    port: 8800,
    proxy: {
      '/api': {
        target: 'http://192.168.18.221:8800',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
});

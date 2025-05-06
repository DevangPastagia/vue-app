import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify()],
  server: {
    host: "0.0.0.0",
    port: 4000,
    open: true,
    strictPort: true,
    https: undefined, // https://vite.dev/config/
    // Uncomment the following lines to enable proxy while back-end integrated
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:4000",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
    fs: {
      allow: [".."],
    },

    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 4000,
      overlay: true,
    },

    // Uncomment the following lines to enable CORS only when not handled from back-end
    // cors: {
    //   origin: "*",
    //   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    //   allowedHeaders: ["Content-Type", "Authorization"], // Add any custom headers you need for server
    //   exposedHeaders: ["Content-Type", "Authorization"], // Add any custom headers you need for browser
    //   credentials: true,
    //   maxAge: 3600,
    // },

    watch: {
      usePolling: true,
      interval: 100,
      ignored: ["node_modules", "**/node_modules/*"],
      followSymlinks: true,
      useFsEvents: true,
    },
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@components": resolve(__dirname, "./src/components"),
      "@layouts": resolve(__dirname, "./src/layouts"),
      "@views": resolve(__dirname, "./src/views"),
      "@store": resolve(__dirname, "./src/store"),
      "@router": resolve(__dirname, "./src/router"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@api": resolve(__dirname, "./src/api"),
      "@mixins": resolve(__dirname, "./src/mixins"),
      "@plugins": resolve(__dirname, "./src/plugins"),
      "@styles": resolve(__dirname, "./src/styles"),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ` 
          @import "@/assets/styles/variables.scss";
          @import "@/assets/styles/mixins.scss";
          @import "@/assets/styles/global.scss";
          `,
      },
    },
  },
  build: {
    outDir: "prod",
    sourcemap: true,
    minify: process.env.NODE_ENV === "production" ? true : undefined,
  },
  preview: {
    host: "0.0.0.0",
    port: 4001,
    open: true,
    // Uncomment the following lines to enable proxy while back-end integrated
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8080",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
  base: process.env.NODE_ENV === "production" ? "/prod/" : "/",
  optimizeDeps: {
    include: ["vue", "vue-router", "pinia"],
    exclude: ["vue-demi"],
  },
  define: {
    "process.env": {
      NODE_ENV: process.env.NODE_ENV,
      VITE_APP_TITLE: process.env.VITE_APP_TITLE,
    },
  },
  assetsInclude: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif"],
  publicDir: "public",
  cacheDir: "node_modules/.vite",
  clearScreen: true,
  esbuild: {
    // drop: ["console", "debugger"],
  },
});

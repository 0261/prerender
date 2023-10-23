import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
// import path from 'path';
import checker from "vite-plugin-checker";

// const define = new Map<string, string>();


export default defineConfig({
  server: { port: 8080 },
  build: {
    cssCodeSplit: false,
    /**
     * 번들 사이즈 경량화를 위해 SWC minifier를 사용해요.
     * SWC 옵션을 공식 지원하지 않아 package.json의 resolutions에서 우회적으로 @swc/core를 사용하도록 해두었어요.
     */
    minify: "terser",
    /**
     * ESM을 지원하는 최소 브라우저로 컴파일 타겟을 변경해요.
     */
    target: ["chrome64", "safari13"],
  },
  // define: Object.fromEntries(define),
  // resolve: {
  //   alias: {
  //     '@/src': path.resolve(__dirname, './src'),
  //   },
  // },
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
});
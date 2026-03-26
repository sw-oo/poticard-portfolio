import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite' // loadEnv 추가
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 현재 작업 디렉토리에서 환경 변수를 로드합니다.
  // 세 번째 인자를 ''로 설정하면 VITE_ 접두사가 없는 변수도 읽어올 수 있습니다.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    define: {
      global: 'window',
    },
    server: {
      host: true,
      port: 5173,
      proxy: {
        '/api': {
          // env 객체를 통해 변수에 접근합니다.
          target: env.VITE_BACKEND_URL || 'http://backend:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/ws': {
          // 템플릿 리터럴 대신 변수명을 직접 쓰거나 백틱(``)을 사용해야 합니다.
          target: env.VITE_BACKEND_URL || 'http://backend:8080',
          ws: true,
          changeOrigin: true,
        },
      },
      allowedHosts: ['www.sw-oo.kro.kr', 'sw-oo.kro.kr']
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})
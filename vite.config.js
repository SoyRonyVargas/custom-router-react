import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.TEST_ENV': JSON.stringify('happy-dom')
  },
  test: {
    environment: "happy-dom"
  }
})

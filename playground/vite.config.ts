import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import HostQrCode from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    HostQrCode(),
  ],
})

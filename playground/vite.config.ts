import { defineConfig } from 'vite';
import HostQrCode from '../src/vite';

export default defineConfig({
  plugins: [
    HostQrCode({
      info: [
        ({ bold, cyan, green }) => {
          return {
            text: `  ${green('➜')}  ${bold('Font Icon:')} ${bold(cyan('http://localhost:3000'))}`,
          }
        }
      ]
    }),
  ],
});

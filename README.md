<p align="center">
<a href="https://www.npmjs.com/package/vite-host-qrcode" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/bi:plugin.svg?color=%23a985ff" alt="logo" width='100'/></a>
</p>

<p align="center">
  A plugin print text, QR code for <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">Vitejs</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vite-host-qrcode" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/vite-host-qrcode.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/vite-host-qrcode" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/dt/vite-host-qrcode.svg?logo=npm" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/result?p=vite-host-qrcode" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/bundlephobia/minzip/vite-host-qrcode" alt="Minizip" /></a>
  <a href="https://github.com/hunghg255/vite-host-qrcode/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/vite-host-qrcode/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/vite-host-qrcode" alt="License" /></a>
</p>

## Install

```bash
npm i vite-host-qrcode -D
```

```bash
# package.json
"scripts": {
  "dev": "vite --host",
  ...
},
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import HostQrCode from 'vite-host-qrcode/vite'

export default defineConfig({
  plugins: [
    HostQrCode({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<img height="360" alt="CLI output" src="https://cdn.jsdelivr.net/gh/hunghg255/vite-host-qrcode/public/demo.png" />


## Options
```ts
type Message = string | MessageValue | ((kolorist: Kolorist) => string | MessageValue | Promise<string | MessageValue | void>)

export interface Options {
	info?: Message[]
  /**
	 * filter list of shown QR codes. Useful if you have multiple interfaces and only need one
	 *
	 *  examples:
	 *    url => url.startsWith('http://192.')
	 *    url => !url.startsWith('http://172.)
	 *    url => url === 'http://192.168.1.70:4173'
	 *
	 * @param url {string} ip address
	 * @returns {boolean}
	 */
  filter?: (url: string) => boolean
}
```

### filter

A function that allows you to select addresses to show QR-Codes for in case you have multiple interfaces

Example:

```js
// vite.config.js
import HostQrCode from 'vite-host-qrcode/vite'

export default defineConfig({
	plugins: [HostQrCode({ filter: (url) => url === 'http://192.168.1.1:4173' })]
});
```

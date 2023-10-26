# vite-host-qrcode

[![NPM version](https://img.shields.io/npm/v/vite-host-qrcode?color=a1b858&label=)](https://www.npmjs.com/package/vite-host-qrcode)


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

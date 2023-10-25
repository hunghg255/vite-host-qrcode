import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { PreviewServerForHook, ViteDevServer } from 'vite'
import { renderUnicodeCompact } from 'hqr'
import * as korlorist from 'kolorist'
import boxen from 'boxen'

import type { MessageValue, Options } from './types'

function printQrcode(server: ViteDevServer | PreviewServerForHook, options?: Options) {
  let networkUrls = server.resolvedUrls?.network

  if (!networkUrls)
    return

  if (options?.filter)
    networkUrls = networkUrls.filter(options.filter)

  if (networkUrls.length === 0)
    return

  for (const url of networkUrls) {
    const r = renderUnicodeCompact(url, {
      ecc: 'L',
      border: 1,
    })

    printWithBoxen({
      text: `  ${r.replace(/\n/g, '\n  ')}`,
      title: korlorist.bold('Visit page on mobile'),
      padding: 1,
      margin: 1,
      borderStyle: 'round',
    })
  }
}

function log(msg: string | void) {
  if (!msg)
    return
  console.log(msg)
}

async function printWithBoxen(res: MessageValue) {
  res.borderStyle = res.borderStyle || 'none'
  log(boxen(res.text, res))
}

export async function print(info: Options['info']) {
  if (!info) return;

  for (const message of info) {
    if (typeof message === 'function') {
      const res = await message(korlorist)
      if (typeof res === 'object')
        printWithBoxen(res)

      else log(res)
    }
    else if (typeof message === 'object') {
      printWithBoxen(message)
    }
    else {
      log(message)
    }
  }
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = options => ({
  name: 'vite-host-qrcode',
  apply: 'serve',
  configureServer(server: any) {
    const _printUrls = server.printUrls
    server.printUrls = async () => {
      await _printUrls();
      await print(options?.info)
      printQrcode(server, options)
    }
  },
  configurePreviewServer(server: any) {
    const _printUrls = server.printUrls
    server.printUrls = async () => {
      await _printUrls();
      await print(options?.info)
      printQrcode(server, options)
    }
  },
})

export const HostQrCode = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default HostQrCode

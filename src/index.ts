import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { PreviewServerForHook, ViteDevServer } from 'vite'
import { renderUnicodeCompact } from 'hqr'
import type { Options } from './types'

function cyan(str: string): string {
  return `\x1B[36m${str}\x1B[0m`
}

function logQrcode(server: ViteDevServer | PreviewServerForHook, options?: Options) {
  let networkUrls = server.resolvedUrls?.network

  if (!networkUrls)
    return

  if (options?.filter)
    networkUrls = networkUrls.filter(options.filter)

  if (networkUrls.length === 0)
    return

  const info = server.config.logger.info

  info(`\n  ${cyan('Visit page on mobile:')}\n`)

  for (const url of networkUrls) {
    const r = renderUnicodeCompact(url, {
      ecc: 'L',
      border: 1,
    })

    info(`  ${r.replace(/\n/g, '\n  ')}`)
  }
  info('\n')
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = options => ({
  name: 'vite-host-qrcode',
  apply: 'serve',
  configureServer(server: any) {
    const _listen = server.listen
    server.listen = function () {
      // eslint-disable-next-line prefer-rest-params
      const isRestart = arguments[1] === true
      // console.log(server)
      const info = server.config.logger.info

      info('\n  Visit page on mobile:')
      if (!isRestart) {
        server.httpServer?.on('listening', () => {
          setTimeout(() => logQrcode(server, options), 0)
        })
      }
      // eslint-disable-next-line prefer-rest-params
      return _listen.apply(this, arguments)
    }
  },
  configurePreviewServer(server: any) {
    // Preview server has no restarts, so we can hook directly
    // The `resolvedUrls` only exist in Vite >=4.3.0, so add a guard to prevent unnecessary hook
    if ('resolvedUrls' in server) {
      server.httpServer?.on('listening', () => {
        setTimeout(() => logQrcode(server, options), 0)
      })
    }
  },
})

export const HostQrCode = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default HostQrCode

import type * as kolorist from 'kolorist'

import type { Options as BoxenOptions } from 'boxen'


type Kolorist = Omit<typeof kolorist, 'SupportLevel' | 'options'>

export type MessageValue = Omit<BoxenOptions, 'borderStyle'> & { text: string } & {
  borderStyle?: BoxenOptions['borderStyle'] | 'none'
}

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

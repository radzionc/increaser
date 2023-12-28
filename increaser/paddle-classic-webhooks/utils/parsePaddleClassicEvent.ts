import { PaddleClassicEvent } from '../PaddleClassicEvent'

export const parsePaddleClassicEvent = (body: string) => {
  return body
    .split('&')
    .map((str) => str.split('=').map(decodeURIComponent))
    .reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {},
    ) as PaddleClassicEvent
}

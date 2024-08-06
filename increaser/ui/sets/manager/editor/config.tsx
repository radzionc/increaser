import { MS_IN_HOUR } from '@lib/utils/time'

const pxInHour = 100
const pxInMs = pxInHour / MS_IN_HOUR

export const setEditorConfig = {
  rightPadding: 12,
  pxInHour,
  pxInMs,
  msToPx: (ms: number) => ms * pxInMs,
  pxToMs: (px: number) => px / pxInMs,
}

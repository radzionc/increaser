import { MS_IN_HOUR } from '@lib/utils/time'

export const horizontalPaddingInPx = 20
export const timeLabelGapInPx = 8
export const botomPlaceholderHeightInPx = 28
export const topPlaceholderHeightInPx = horizontalPaddingInPx
export const minimumHourHeightInPx = 40
export const headerHeightInPx = 40

export const pxInHour = 100
export const pxInMs = pxInHour / MS_IN_HOUR
export const msToPx = (ms: number) => ms * pxInMs
export const pxToMs = (px: number) => px / pxInMs

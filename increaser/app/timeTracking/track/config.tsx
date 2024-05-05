import { MS_IN_HOUR } from '@lib/utils/time'

export const pxInHour = 100
export const pxInMs = pxInHour / MS_IN_HOUR
export const msToPx = (ms: number) => ms * pxInMs

export const defaultIntervalDuration = 30

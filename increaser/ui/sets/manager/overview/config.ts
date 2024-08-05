import { MS_IN_HOUR } from '@lib/utils/time'

const pxInHour = 100
const pxInMs = pxInHour / MS_IN_HOUR

export const dayOverviewConfig = {
  horizontalPadding: 20,
  timeLabelGap: 8,
  verticalPlaceholderHeight: 28,
  minimumHourHeight: 40,
  interactiveSectionHeight: 40,
  dayTimeLabelsWidth: 48,
  editor: {
    pxInHour,
    pxInMs,
    msToPx: (ms: number) => ms * pxInMs,
    pxToMs: (px: number) => px / pxInMs,
  },
}

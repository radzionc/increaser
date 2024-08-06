const horizontalPadding = 20
const dayTimeLabelsWidth = 48
const timeLabelGap = 8

export const dayOverviewConfig = {
  horizontalPadding,
  timeLabelGap,
  verticalPlaceholderHeight: 28,
  minimumHourHeight: 40,
  interactiveSectionHeight: 40,
  dayTimeLabelsWidth,
  setLeftOffset: horizontalPadding + dayTimeLabelsWidth + timeLabelGap * 2,
}

const horizontalPadding = 20
const dayTimeLabelsWidth = 44
const timeLabelGap = 8

export const dayOverviewConfig = {
  horizontalPadding,
  timeLabelGap,
  verticalPlaceholderHeight: 28,
  minimumHourHeight: 40,
  interactiveSectionHeight: dayTimeLabelsWidth,
  dayTimeLabelsWidth,
  setLeftOffset: horizontalPadding + dayTimeLabelsWidth + timeLabelGap * 2,
}

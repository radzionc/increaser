import { PageTitle } from '@increaser/app/ui/PageTitle'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { RhythmicRerender } from '@lib/ui/base/RhythmicRerender'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { TitleProjectSelector } from './TitleProjectSelector'
import { TitleFocusDurationSelector } from './TitleFocusDurationSelector'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { focusIntervalsToSets } from '@increaser/ui/focus/utils/focusIntervalsToSets'

export const FocusTitle = () => {
  const { intervals } = useCurrentFocus()

  return (
    <>
      <RhythmicRerender
        render={(now) => {
          const duration = getSetsDuration(
            focusIntervalsToSets({
              intervals,
              now,
            }),
          )
          const title = `${formatDuration(duration, 'ms', {
            kind: 'digitalClock',
            minUnit: 's',
            maxUnit: 'h',
          })}`
          return <PageMetaTags title={title} />
        }}
      />
      <PageTitle
        title={
          <>
            <TitleProjectSelector /> <TitleFocusDurationSelector /> session
          </>
        }
      />
    </>
  )
}

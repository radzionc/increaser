import { RhythmicRerender } from '@lib/ui/base/RhythmicRerender'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { focusIntervalsToSets } from '@increaser/ui/focus/utils/focusIntervalsToSets'
import { useAssertFocusIntervals } from '../state/focusIntervals'

export const ActiveFocusDocumentTitle = () => {
  const intervals = useAssertFocusIntervals()

  return (
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
  )
}

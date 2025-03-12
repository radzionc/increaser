import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { RhythmicRerender } from '@lib/ui/base/RhythmicRerender'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { getSetsDuration } from '@product/entities-utils/set/getSetsDuration'
import { focusIntervalsToSets } from '@product/ui/focus/utils/focusIntervalsToSets'

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

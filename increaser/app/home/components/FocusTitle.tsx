import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { RhythmicRerender } from '@lib/ui/base/RhythmicRerender'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { TitleProjectSelector } from './TitleProjectSelector'
import { TitleFocusDurationSelector } from './TitleFocusDurationSelector'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { focusIntervalsToSets } from '@increaser/ui/focus/utils/focusIntervalsToSets'
import { PageTitle } from '@lib/ui/text/PageTitle'
import { PageHeader } from '../../ui/page/header/PageHeader'
import { HStack } from '@lib/ui/css/stack'

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
      <PageHeader>
        <PageTitle as="div">
          <HStack wrap="wrap" gap={8}>
            <TitleProjectSelector /> <TitleFocusDurationSelector /> session
          </HStack>
        </PageTitle>
      </PageHeader>
    </>
  )
}

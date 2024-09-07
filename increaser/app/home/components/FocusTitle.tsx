import { RhythmicRerender } from '@lib/ui/base/RhythmicRerender'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { TitleFocusDurationSelector } from './TitleFocusDurationSelector'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { focusIntervalsToSets } from '@increaser/ui/focus/utils/focusIntervalsToSets'
import { PageTitle } from '@lib/ui/text/PageTitle'
import { PageHeader } from '../../ui/page/header/PageHeader'
import { HStack } from '@lib/ui/css/stack'
import { FocusNotifications } from '../../focus/components/FocusNotifications'
import { useAssertFocusIntervals } from '@increaser/ui/focus/FocusContext'

export const FocusTitle = () => {
  const intervals = useAssertFocusIntervals()

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
        <HStack
          fullWidth
          alignItems="center"
          justifyContent="space-between"
          gap={20}
        >
          <PageTitle as="div">
            <HStack wrap="wrap" gap={8}>
              <TitleFocusDurationSelector /> session
            </HStack>
          </PageTitle>
          <FocusNotifications />
        </HStack>
      </PageHeader>
    </>
  )
}

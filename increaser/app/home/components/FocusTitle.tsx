import { Text } from '@lib/ui/text'
import { PageTitle } from '@increaser/app/ui/PageTitle'
import { HStack } from '@lib/ui/layout/Stack'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { FocusGoal } from '@increaser/ui/focus/FocusGoal'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { FocusProjectSelector } from '../../focus/components/FocusProjectSelector'
import { RhytmicRerender } from '@lib/ui/base/RhytmicRerender'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { formatDuration } from '@lib/utils/time/formatDuration'

export const FocusTitle = () => {
  const { projectId, startedAt } = useCurrentFocus()
  const { focusDuration } = useFocus()
  const { projectsRecord } = useProjects()
  return (
    <>
      <RhytmicRerender
        render={() => {
          const duration = Date.now() - startedAt
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
          <HStack
            fullWidth
            alignItems="center"
            justifyContent="space-between"
            gap={8}
            wrap="wrap"
          >
            <Text>
              {projectsRecord[projectId].name} {focusDuration} min session
            </Text>
            <HStack wrap="wrap" alignItems="center" gap={8}>
              <FocusProjectSelector />
              <FocusGoal />
            </HStack>
          </HStack>
        }
      />
    </>
  )
}

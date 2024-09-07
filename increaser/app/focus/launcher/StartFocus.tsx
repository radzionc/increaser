import { useMemo } from 'react'
import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { MemberOnlyAction } from '@increaser/app/membership/components/MemberOnlyAction'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { RocketIcon } from '@lib/ui/icons/RocketIcon'
import { useFocusTarget } from '../state/useFocusTarget'
import { useFocusTargetStartTime } from './state/FocusLauncherStartTimeProvider'
import { useFocusTargetDuration } from './state/FocusLauncherDurationProvider'
import { useFocusTargetProject } from '../hooks/useFocusTargetProject'

export const StartFocus = () => {
  const { start } = useFocus()
  const [{ projectId, taskId }] = useFocusTarget()

  const [focusDuration] = useFocusTargetDuration()

  const project = useFocusTargetProject()

  const isDisabled = useMemo(() => {
    if (!project) {
      return `Choose a project or task to begin your focus session`
    }
  }, [project])

  const [startTime] = useFocusTargetStartTime()

  return (
    <MemberOnlyAction
      action={() => {
        start({
          projectId: shouldBePresent(projectId),
          taskId: taskId,
          duration: focusDuration,
          startedAt: startTime ?? Date.now(),
        })
      }}
      render={({ action }) => (
        <Button isDisabled={isDisabled} size="l" onClick={action}>
          <HStack alignItems="center" gap={8}>
            <IconWrapper>
              <RocketIcon />
            </IconWrapper>
            Start
          </HStack>
        </Button>
      )}
    />
  )
}

import { useMemo } from 'react'
import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/layout/Stack'
import { MemberOnlyAction } from '@increaser/app/membership/components/MemberOnlyAction'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { RocketIcon } from '@lib/ui/icons/RocketIcon'
import { useFocusLauncher } from './state/useFocusLauncher'
import { useFocusLauncherStartTime } from './state/FocusLauncherStartTimeProvider'
import { useFocusLauncherProject } from './hooks/useFocusLauncherProject'
import { useFocusLauncherDuration } from './state/FocusLauncherDurationProvider'

export const StartFocus = () => {
  const { start } = useFocus()
  const [{ projectId, taskId }] = useFocusLauncher()

  const [focusDuration] = useFocusLauncherDuration()

  const project = useFocusLauncherProject()

  const isDisabled = useMemo(() => {
    if (!project) {
      return `Choose a project or task to begin your focus session`
    }
  }, [project])

  const [startTime] = useFocusLauncherStartTime()

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

import { FocusDuration, suggestFocusDuration } from 'focus/FocusDuration'
import { useFocus } from 'focus/hooks/useFocus'
import { FocusDurationEducation } from 'home/components/FocusDurationEducation'
import { CurrentProjectProvider } from 'projects/components/ProjectView/CurrentProjectProvider'
import { useProjects } from 'projects/hooks/useProjects'
import { suggestProject } from 'projects/utils/suggestProject'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useHaveFinishedASet } from 'sets/hooks/useHaveFinishedASet'
import { useTodaySets } from 'sets/hooks/useTodaySets'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { Button } from '@increaser/ui/buttons/Button'
import { Panel } from '@increaser/ui/panel/Panel'
import { VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { useAssertUserState } from 'user/state/UserStateContext'
import { MS_IN_MIN } from '@increaser/utils/time'

import { FocusDurationInput } from '../FocusDurationInput'
import { FocusDurationText } from '../FocusDurationText'
import { FocusProjectInput } from './FocusProjectInput'
import { ProjectGoal } from './ProjectGoal'
import { WorkdayFinished } from './WorkdayFinished'
import styled from 'styled-components'
import { MemberOnlyAction } from 'membership/components/MemberOnlyAction'

const Container = styled(Panel)`
  position: relative;
  isolation: isolate;
`

// todo: warning when the workday end is close
export const FocusSessionForm = () => {
  const todayStartedAt = useStartOfDay()
  const { goalToFinishWorkBy } = useAssertUserState()
  const todaySets = useTodaySets()
  const { projectsRecord, activeProjects } = useProjects()
  const { start } = useFocus()

  const lastInteractionWasAt = useRef<number>()

  const haveFinishedASet = useHaveFinishedASet()

  const [focusDuration, setFocusDuration] = useState<FocusDuration>(
    suggestFocusDuration({
      todayStartedAt,
      goalToFinishWorkBy,
      todaySets,
    }),
  )
  const [projectId, setProjectId] = useState<string | null>(
    suggestProject({
      projects: activeProjects,
      todaySets,
    }),
  )

  const updateSuggestions = useCallback(() => {
    if (
      lastInteractionWasAt.current &&
      Date.now() - lastInteractionWasAt.current < MS_IN_MIN
    ) {
      return
    }

    setFocusDuration(
      suggestFocusDuration({
        todayStartedAt,
        goalToFinishWorkBy,
        todaySets,
      }),
    )

    setProjectId(
      suggestProject({
        projects: activeProjects,
        todaySets,
      }),
    )
  }, [activeProjects, goalToFinishWorkBy, todaySets, todayStartedAt])

  useEffect(() => {
    updateSuggestions()

    const interval = setInterval(updateSuggestions, MS_IN_MIN)

    return () => clearInterval(interval)
  }, [updateSuggestions])

  if (!projectId) return null
  const project = projectsRecord[projectId]

  if (!project) {
    return null
  }

  return (
    <Container style={{ position: 'relative' }} kind="regular">
      <VStack gap={32}>
        <FocusProjectInput
          options={activeProjects}
          value={projectId}
          onChange={(value) => {
            setProjectId(value)
            lastInteractionWasAt.current = Date.now()
          }}
        />
        <CurrentProjectProvider value={project}>
          <ProjectGoal />
        </CurrentProjectProvider>
        <FocusDurationInput
          value={focusDuration}
          onChange={(value) => {
            setFocusDuration(value)
            lastInteractionWasAt.current = Date.now()
          }}
        />
        <MemberOnlyAction
          action={() => start({ projectId, duration: focusDuration })}
          render={({ action }) => (
            <Button kind="reversed" size="l" onClick={action}>
              <Text as="div" style={{ wordBreak: 'keep-all' }}>
                <FocusDurationText
                  emoji={project.emoji}
                  value={focusDuration}
                />
              </Text>
            </Button>
          )}
        />
        {!haveFinishedASet && <FocusDurationEducation />}
      </VStack>
      <WorkdayFinished />
    </Container>
  )
}

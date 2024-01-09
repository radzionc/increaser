import { suggestFocusDuration } from '@increaser/app/focus/FocusDuration'
import { FocusDurationEducation } from '@increaser/app/home/components/FocusDurationEducation'
import { CurrentProjectProvider } from '@increaser/app/projects/components/ProjectView/CurrentProjectProvider'
import { suggestProject } from '@increaser/app/projects/utils/suggestProject'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useHaveFinishedASet } from '@increaser/app/sets/hooks/useHaveFinishedASet'
import { useTodaySets } from '@increaser/app/sets/hooks/useTodaySets'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { Button } from '@lib/ui/buttons/Button'
import { Panel } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { MS_IN_MIN } from '@lib/utils/time'

import { FocusDurationInput } from '../FocusDurationInput'
import { FocusDurationText } from '../FocusDurationText'
import { FocusProjectInput } from './FocusProjectInput'
import { ProjectGoal } from './ProjectGoal'
import { WorkdayFinished } from './WorkdayFinished'
import styled from 'styled-components'
import { MemberOnlyAction } from '@increaser/app/membership/components/MemberOnlyAction'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { FocusDuration } from '@increaser/entities/FocusDuration'

const Container = styled(Panel)`
  position: relative;
  isolation: isolate;
`

// todo: warning when the workday end is close
export const FocusSessionForm = () => {
  const todayStartedAt = useStartOfDay()
  const { finishWorkAt } = useAssertUserState()
  const todaySets = useTodaySets()
  const { projectsRecord, activeProjects } = useProjects()
  const { start } = useFocus()

  const lastInteractionWasAt = useRef<number>()

  const haveFinishedASet = useHaveFinishedASet()

  const [focusDuration, setFocusDuration] = useState<FocusDuration>(
    suggestFocusDuration({
      todayStartedAt,
      finishWorkAt,
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
        finishWorkAt,
        todaySets,
      }),
    )

    setProjectId(
      suggestProject({
        projects: activeProjects,
        todaySets,
      }),
    )
  }, [activeProjects, finishWorkAt, todaySets, todayStartedAt])

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

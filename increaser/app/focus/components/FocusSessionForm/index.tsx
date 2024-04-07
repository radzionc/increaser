import { suggestFocusDuration } from '@increaser/app/focus/FocusDuration'
import { CurrentProjectProvider } from '@increaser/app/projects/components/ProjectView/CurrentProjectProvider'
import { suggestProject } from '@increaser/app/projects/utils/suggestProject'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { WorkdayFinished } from './WorkdayFinished'
import styled from 'styled-components'
import { MemberOnlyAction } from '@increaser/app/membership/components/MemberOnlyAction'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { FocusDuration } from '@increaser/entities/FocusDuration'
import { ProjectBudgetWidget } from '../../../projects/budget/ProjectBudgetWidget'
import { splitBy } from '@lib/utils/array/splitBy'
import { order } from '@lib/utils/array/order'

const Container = styled(Panel)`
  position: relative;
  isolation: isolate;
`

type FocusSessionFormProps = {
  onFocusStart?: () => void
}

// todo: warning when the workday end is close
export const FocusSessionForm = ({ onFocusStart }: FocusSessionFormProps) => {
  const todayStartedAt = useStartOfDay()
  const { finishWorkAt } = useAssertUserState()
  const todaySets = useTodaySets()
  const { projectsRecord, activeProjects } = useProjects()
  const { start } = useFocus()

  const lastInteractionWasAt = useRef<number>()

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

  const options = useMemo(() => {
    const [projectsWithGoal, projectsWithoutGoal] = splitBy(
      activeProjects,
      (project) => (project.goal ? 0 : 1),
    )

    const [doMoreProjects, doLessProjects] = splitBy(
      projectsWithGoal,
      (project) => (project.goal === 'doMore' ? 0 : 1),
    )

    return [
      ...order(
        doMoreProjects,
        (project) =>
          project.doneMinutesThisWeek / project.allocatedMinutesPerWeek,
        'asc',
      ),
      ...projectsWithoutGoal,
      ...order(
        doLessProjects,
        (project) =>
          project.doneMinutesThisWeek / project.allocatedMinutesPerWeek,
        'asc',
      ),
    ]
  }, [activeProjects])

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
        projects: options,
        todaySets,
      }),
    )
  }, [finishWorkAt, options, todaySets, todayStartedAt])

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
    <Container style={{ position: 'relative' }} kind="secondary">
      <VStack gap={32}>
        <FocusProjectInput
          options={options}
          value={projectId}
          onChange={(value) => {
            setProjectId(value)
            lastInteractionWasAt.current = Date.now()
          }}
        />
        <CurrentProjectProvider value={project}>
          <ProjectBudgetWidget />
        </CurrentProjectProvider>
        <FocusDurationInput
          value={focusDuration}
          onChange={(value) => {
            setFocusDuration(value)
            lastInteractionWasAt.current = Date.now()
          }}
        />
        <MemberOnlyAction
          action={() => {
            start({ projectId, duration: focusDuration })
            onFocusStart?.()
          }}
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
      </VStack>
      <WorkdayFinished />
    </Container>
  )
}

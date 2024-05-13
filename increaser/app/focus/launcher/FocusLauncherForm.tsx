import { suggestFocusDuration } from '@increaser/app/focus/FocusDuration'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTodaySets } from '@increaser/app/sets/hooks/useTodaySets'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { Button } from '@lib/ui/buttons/Button'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { MS_IN_MIN } from '@lib/utils/time'

import { FocusDurationInput } from '../components/FocusDurationInput'
import { FocusDurationText } from '../components/FocusDurationText'
import { FocusProjectInput } from './FocusProjectInput'
import { WorkdayFinished } from './WorkdayFinished'
import styled from 'styled-components'
import { MemberOnlyAction } from '@increaser/app/membership/components/MemberOnlyAction'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { FocusDuration } from '@increaser/entities/FocusDuration'
import { ProjectBudgetWidget } from '@increaser/ui/projects/budget/ProjectBudgetWidget'
import { ProjectBudgetSummary } from '@increaser/ui/projects/budget/ProjectBudgetWidget/ProjectGoalStatus'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import {
  RenderSelectFocusView,
  SelectFocusViewSelector,
  useSelectFocusView,
} from './SelectFocusView'
import { FocusTaskInput } from './FocusTaskInput'
import { useFocusLauncher } from './state/FocusLauncherContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

const Container = styled(Panel)`
  position: relative;
  isolation: isolate;
`

export const FocusLauncherForm = () => {
  const todayStartedAt = useStartOfDay()
  const { finishWorkAt } = useAssertUserState()
  const todaySets = useTodaySets()
  const { projectsRecord } = useProjects()
  const { start } = useFocus()
  const { projectId, taskId } = useFocusLauncher()

  const lastInteractionWasAt = useRef<number>()

  const { view } = useSelectFocusView()

  const [focusDuration, setFocusDuration] = useState<FocusDuration>(
    suggestFocusDuration({
      todayStartedAt,
      finishWorkAt,
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
  }, [finishWorkAt, todaySets, todayStartedAt])

  useEffect(() => {
    updateSuggestions()

    const interval = setInterval(updateSuggestions, MS_IN_MIN)

    return () => clearInterval(interval)
  }, [updateSuggestions])

  const project = projectId ? projectsRecord[projectId] : null

  const isDisabled = useMemo(() => {
    if (!project) {
      return `Select a project to start a focus session`
    }
  }, [project])

  return (
    <VStack gap={12}>
      <HStack
        alignItems="center"
        wrap="wrap"
        justifyContent="space-between"
        fullWidth
      >
        <SectionTitle>Start a focus session</SectionTitle>
        <SelectFocusViewSelector />
      </HStack>
      <Container style={{ position: 'relative' }} kind="secondary">
        <VStack gap={32}>
          <RenderSelectFocusView
            projects={() => <FocusProjectInput />}
            tasks={() => <FocusTaskInput />}
          />
          {project && (
            <CurrentProjectProvider value={project}>
              <VStack gap={4}>
                <ProjectBudgetWidget />
                <VStack style={{ minHeight: 20 }}>
                  {project.goal && project.allocatedMinutesPerWeek > 0 && (
                    <ProjectBudgetSummary />
                  )}
                </VStack>
              </VStack>
            </CurrentProjectProvider>
          )}
          <FocusDurationInput
            value={focusDuration}
            onChange={(value) => {
              setFocusDuration(value)
              lastInteractionWasAt.current = Date.now()
            }}
          />
          <MemberOnlyAction
            action={() => {
              start({
                projectId: shouldBePresent(projectId),
                taskId: view === 'tasks' && taskId ? taskId : undefined,
                duration: focusDuration,
              })
            }}
            render={({ action }) => (
              <Button
                isDisabled={isDisabled}
                kind="reversed"
                size="l"
                onClick={action}
              >
                <Text as="div" style={{ wordBreak: 'keep-all' }}>
                  <FocusDurationText
                    emoji={project?.emoji}
                    value={focusDuration}
                  />
                </Text>
              </Button>
            )}
          />
        </VStack>
        <WorkdayFinished />
      </Container>
    </VStack>
  )
}

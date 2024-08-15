import { suggestFocusDuration } from '@increaser/app/focus/FocusDuration'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTodaySets } from '@increaser/app/sets/hooks/useTodaySets'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { Button } from '@lib/ui/buttons/Button'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { MS_IN_MIN } from '@lib/utils/time'

import { FocusDurationInput } from '../components/FocusDurationInput'
import { FocusProjectInput } from './FocusProjectInput'
import { WorkdayFinished } from './WorkdayFinished'
import styled from 'styled-components'
import { MemberOnlyAction } from '@increaser/app/membership/components/MemberOnlyAction'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { FocusDuration } from '@increaser/entities/FocusDuration'
import { ProjectBudgetWidget } from '@increaser/ui/projects/budget/ProjectBudgetWidget'
import { ProjectBudgetSummary } from '@increaser/ui/projects/budget/ProjectBudgetWidget/ProjectBudgetSummary'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { FocusTaskInput } from './FocusTaskInput'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { FocusStartTime } from './startTime/FocusStartTime'
import { FocusViewSelector } from './FocusViewSelector'
import { Match } from '@lib/ui/base/Match'
import { useProjectDoneMinutesThisWeek } from '@increaser/ui/projects/hooks/useProjectDoneMinutesThisWeek'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { RocketIcon } from '@lib/ui/icons/RocketIcon'
import { useFocusLauncher } from './state/useFocusLauncher'

const Container = styled(Panel)`
  position: relative;
  isolation: isolate;
`

export const FocusLauncherForm = () => {
  const todayStartedAt = useStartOfDay()
  const { finishWorkAt, projects } = useAssertUserState()
  const todaySets = useTodaySets()
  const { start } = useFocus()
  const [{ projectId, taskId, startedAt, focusEntity }, setState] =
    useFocusLauncher()

  const lastInteractionWasAt = useRef<number>()

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

  const project = projects[projectId]

  const doneMinutesThisWeek = useProjectDoneMinutesThisWeek(projectId)

  const showBudget =
    project.allocatedMinutesPerWeek > 0 && doneMinutesThisWeek > 0

  const isDisabled = useMemo(() => {
    if (!project) {
      return `Select a project to start a focus session`
    }
  }, [project])

  const shouldShowFocusSettings = focusEntity !== 'task' || taskId

  return (
    <VStack gap={12}>
      <HStack
        alignItems="center"
        wrap="wrap"
        justifyContent="space-between"
        fullWidth
        gap={8}
      >
        <SectionTitle>Start a focus session</SectionTitle>
        <FocusViewSelector />
      </HStack>
      <Container withSections kind="secondary">
        <Match
          value={focusEntity}
          project={() => <FocusProjectInput />}
          task={() => <FocusTaskInput />}
        />
        {shouldShowFocusSettings && (
          <>
            {showBudget && (
              <CurrentProjectProvider value={project}>
                <VStack gap={4}>
                  <ProjectBudgetWidget />
                  {project.goal && project.allocatedMinutesPerWeek > 0 && (
                    <ProjectBudgetSummary />
                  )}
                </VStack>
              </CurrentProjectProvider>
            )}
            <FocusStartTime />
            <FocusDurationInput
              value={focusDuration}
              onChange={(value) => {
                setFocusDuration(value)
                lastInteractionWasAt.current = Date.now()
              }}
            />
            <VStack gap={32}>
              <MemberOnlyAction
                action={() => {
                  start({
                    projectId: shouldBePresent(projectId),
                    taskId: focusEntity === 'task' && taskId ? taskId : null,
                    duration: focusDuration,
                    startedAt: startedAt ?? Date.now(),
                  })
                  if (startedAt) {
                    setState((state) => ({
                      ...state,
                      startedAt: null,
                    }))
                  }
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
            </VStack>
          </>
        )}

        <WorkdayFinished />
      </Container>
    </VStack>
  )
}

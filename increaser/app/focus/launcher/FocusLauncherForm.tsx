import { suggestFocusDuration } from '@increaser/app/focus/FocusDuration'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { useCallback, useEffect, useRef, useState } from 'react'
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
import { useProjectEmoji } from '@increaser/ui/projects/hooks/useProjectEmoji'
import { useProject } from '@increaser/ui/projects/hooks/useProject'

const Container = styled(Panel)`
  position: relative;
  isolation: isolate;
`

export const FocusLauncherForm = () => {
  const todayStartedAt = useStartOfDay()
  const { finishWorkAt } = useAssertUserState()
  const todaySets = useTodaySets()
  const { start } = useFocus()
  const { projectId, taskId } = useFocusLauncher()
  const emoji = useProjectEmoji(projectId)
  const project = useProject(projectId)

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
        <SelectFocusViewSelector />
      </HStack>
      <Container style={{ position: 'relative' }} kind="secondary">
        <VStack gap={32}>
          <RenderSelectFocusView
            projects={() => <FocusProjectInput />}
            tasks={() => <FocusTaskInput />}
          />
          <CurrentProjectProvider value={projectId ?? null}>
            <VStack gap={4}>
              <ProjectBudgetWidget />
              <VStack style={{ minHeight: 20 }}>
                {project?.goal && project?.allocatedMinutesPerWeek > 0 && (
                  <ProjectBudgetSummary />
                )}
              </VStack>
            </VStack>
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
              start({
                projectId: shouldBePresent(projectId),
                taskId: view === 'tasks' && taskId ? taskId : undefined,
                duration: focusDuration,
              })
            }}
            render={({ action }) => (
              <Button kind="reversed" size="l" onClick={action}>
                <Text as="div" style={{ wordBreak: 'keep-all' }}>
                  <FocusDurationText emoji={emoji} value={focusDuration} />
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

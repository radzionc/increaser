import { useCurrentProject } from '@increaser/app/projects/components/ProjectView/CurrentProjectProvider'
import styled, { useTheme } from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { VStack } from '@lib/ui/layout/Stack'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { ProjectBudgetWidgetHeader } from './ProjectBudgetWidgetHeader'
import { ProjectBudgetVisualization } from './ProjectBudgetVisualization'

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  ${borderRadius.m};
  ${transition};
  height: 52px;
  background: ${getColor('foreground')};
  border: 1px solid ${getColor('mist')};
  overflow: hidden;
`

export const ProjectBudgetWidget = () => {
  const { allocatedMinutesPerWeek, doneMinutesThisWeek, goal } =
    useCurrentProject()

  const { colors } = useTheme()

  return (
    <VStack gap={4}>
      <ProjectBudgetWidgetHeader />
      <Container
        style={{
          borderColor:
            allocatedMinutesPerWeek &&
            goal &&
            doneMinutesThisWeek >= allocatedMinutesPerWeek
              ? (goal === 'doMore' ? colors.success : colors.alert).toCssValue()
              : undefined,
        }}
      >
        {allocatedMinutesPerWeek > 0 && <ProjectBudgetVisualization />}
      </Container>
    </VStack>
  )
}

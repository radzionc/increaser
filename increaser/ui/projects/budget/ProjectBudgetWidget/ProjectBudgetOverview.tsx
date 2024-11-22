import styled from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { toPercents } from '@lib/utils/toPercents'
import { ProjectBudgetWidgetDays } from './ProjectBudgetWidgetDays'
import { useProjectDoneMinutesThisWeek } from '../../hooks/useProjectDoneMinutesThisWeek'
import { LinesFiller } from '@lib/ui/visual/LinesFiller'
import { ProjectBudgetOffset } from './ProjectBudgetOffset'

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  ${borderRadius.xs};
  height: 100%;
  background: ${getColor('background')};
  border: 1px solid ${getColor('mistExtra')};
  overflow: hidden;
  height: 28px;
`

const Fill = styled.div`
  height: 100%;
  background: ${getColor('foregroundExtra')};
  position: relative;
  color: ${getColor('background')};
`

export const ProjectBudgetOverview = () => {
  const { goal, allocatedMinutesPerWeek, id } = useCurrentProject()

  const doneMinutesThisWeek = useProjectDoneMinutesThisWeek(id)

  return (
    <Container>
      <Fill
        style={{
          width: toPercents(
            Math.min(doneMinutesThisWeek / allocatedMinutesPerWeek, 1),
          ),
        }}
      >
        <LinesFiller />
      </Fill>
      {goal && <ProjectBudgetOffset />}
      <ProjectBudgetWidgetDays />
    </Container>
  )
}

import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { toPercents } from '@lib/utils/toPercents'
import { useCurrentProject } from '@product/ui/projects/CurrentProjectProvider'
import styled from 'styled-components'

import { useProjectDoneMinutesThisWeek } from '../../hooks/useProjectDoneMinutesThisWeek'

import { ProjectBudgetOffset } from './ProjectBudgetOffset'
import { ProjectBudgetWidgetDays } from './ProjectBudgetWidgetDays'

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
  position: relative;

  background: repeating-linear-gradient(
    135deg,
    ${getColor('foregroundExtra')},
    ${getColor('foregroundExtra')} 1.5px,
    ${getColor('background')} 1.5px,
    ${getColor('background')} 3px
  );
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
      />
      {goal && <ProjectBudgetOffset />}
      <ProjectBudgetWidgetDays />
    </Container>
  )
}

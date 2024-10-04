import { GoalsTimeline } from '@increaser/ui/goals/timeline/GoalsTimeline'
import { VStack } from '@lib/ui/css/stack'
import { PageHeaderControlsArea } from '../ui/page/header/PageHeaderControlsAreaProvider'
import { GoalStatusFilter } from '@increaser/ui/goals/filter/GoalStatusFilter'
import styled from 'styled-components'
import { GoalList } from './GoalList'

const Container = styled(VStack)`
  gap: 32px;
  width: 100%;
  max-width: 560px;
`

export const Goals = () => {
  return (
    <Container>
      <PageHeaderControlsArea>
        <GoalStatusFilter />
      </PageHeaderControlsArea>
      <GoalsTimeline />
      <GoalList />
    </Container>
  )
}

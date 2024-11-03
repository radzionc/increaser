import { GoalsTimeline } from '@increaser/ui/goals/timeline/GoalsTimeline'
import { VStack } from '@lib/ui/css/stack'
import { PageHeaderControlsArea } from '../ui/page/header/PageHeaderControlsAreaProvider'
import { GoalStatusFilter } from '@increaser/ui/goals/filter/GoalStatusFilter'
import styled from 'styled-components'
import { GoalList } from './GoalList'
import { AddGoal } from './AddGoal'
import { ManageGoalsTimelineType } from '@increaser/ui/goals/timeline/ManageGoalsTimelineType'

const Container = styled(VStack)`
  gap: 32px;
`

export const Goals = () => {
  return (
    <Container>
      <PageHeaderControlsArea>
        <GoalStatusFilter />
        <ManageGoalsTimelineType />
        <AddGoal />
      </PageHeaderControlsArea>
      <GoalsTimeline />
      <GoalList />
    </Container>
  )
}

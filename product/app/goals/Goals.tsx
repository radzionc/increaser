import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { ActiveGoal } from '@product/ui/goals/ActiveGoal'
import { GoalStatusFilter } from '@product/ui/goals/filter/GoalStatusFilter'
import { GoalList } from '@product/ui/goals/GoalList'
import { GoalsTimeline } from '@product/ui/goals/timeline/GoalsTimeline'
import { ManageGoalsTimelineType } from '@product/ui/goals/timeline/ManageGoalsTimelineType'
import styled from 'styled-components'

import { PageHeaderControlsArea } from '../ui/page/header/PageHeaderControlsAreaProvider'

import { AddGoal } from './AddGoal'

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
      <ActiveItemIdProvider initialValue={null}>
        <ActiveGoal />
        <GoalsTimeline />
        <GoalList />
      </ActiveItemIdProvider>
    </Container>
  )
}

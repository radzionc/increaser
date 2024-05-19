import styled from 'styled-components'
import { focusPageHorizontalPadding } from './focusPageHorizontalPadding'
import { HStack } from '@lib/ui/layout/Stack'
import { FocusAssistance } from './FocusAssistance'
import { ShrinkFocusView } from './ShrinkFocusView'
import { getColor } from '@lib/ui/theme/getters'
import { SessionStartedAt } from '@increaser/ui/focus/SessionStartedAt'
import { FocusGoal } from '@increaser/ui/focus/FocusGoal'
import { FocusProjectSelector } from './FocusProjectSelector'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { CurrentFocusTask } from './CurrentFocusTask'

const Container = styled(HStack)`
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  width: 100%;
  min-height: 60px;
  ${verticalPadding(8)};
  ${focusPageHorizontalPadding};
  border-bottom: 1px solid ${getColor('mist')};
  flex-shrink: 0;
`

export const ManageFocusSet = () => {
  return (
    <Container>
      <HStack wrap="wrap" gap={8}>
        <SessionStartedAt />
        <FocusGoal />
        <FocusProjectSelector />
        <CurrentFocusTask />
      </HStack>
      <HStack gap={8}>
        <FocusAssistance />
        <ShrinkFocusView />
      </HStack>
    </Container>
  )
}

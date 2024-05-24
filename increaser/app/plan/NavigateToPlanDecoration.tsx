import { useHaveToSubmitYesterdayHabits } from '../habits/hooks/useHaveToSubmitYesterdayHabits'
import styled from 'styled-components'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { useHasOverdueTasks } from '@increaser/ui/tasks/hooks/useHasOverdueTasks'

const Container = styled.div`
  ${absoluteOutline(2, 2)};
  border: 2px dashed ${getColor('primary')};
  ${borderRadius.s};
`

export const NavigateToPlanDecoration = () => {
  const haveToSubmitYesterdayHabits = useHaveToSubmitYesterdayHabits()
  const hasOverdueTasks = useHasOverdueTasks()
  const isActive = haveToSubmitYesterdayHabits || hasOverdueTasks

  return isActive ? <Container /> : null
}

import { useHaveToSubmitYesterdayHabits } from '../habits/hooks/useHaveToSubmitYesterdayHabits'
import styled from 'styled-components'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'

const Container = styled.div`
  ${absoluteOutline(2, 2)};
  border: 2px dashed ${getColor('primary')};
  ${borderRadius.s};
`

export const NavigateToPlanDecoration = () => {
  const haveToSubmitYesterdayHabits = useHaveToSubmitYesterdayHabits()

  if (!haveToSubmitYesterdayHabits) {
    return null
  }

  return <Container />
}

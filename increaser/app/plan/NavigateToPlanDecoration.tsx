import styled from 'styled-components'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { useIsStartDaySetupCompleted } from './useIsStartDaySetupCompleted'

const Container = styled.div`
  ${absoluteOutline(2, 2)};
  border: 2px dashed ${getColor('primary')};
  ${borderRadius.s};
`

export const NavigateToPlanDecoration = () => {
  const isCompleted = useIsStartDaySetupCompleted()

  return isCompleted ? null : <Container />
}

import { ComponentWithValueProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { D_IN_WEEK } from '@lib/utils/time'
import { toPercents } from '@lib/utils/toPercents'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  height: 100%;
  background: ${getColor('mist')};
  pointer-events: none;
`

export const CurrentDayHighlight = ({
  value,
}: ComponentWithValueProps<number>) => (
  <Container
    style={{
      width: toPercents(1 / D_IN_WEEK),
      left: toPercents(value / D_IN_WEEK),
    }}
  />
)

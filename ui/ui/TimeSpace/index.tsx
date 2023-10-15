import styled from 'styled-components'
import { getColor } from '../theme/getters'
import { HStack, VStack } from '../Stack'
import { Fragment, useMemo } from 'react'
import { getHoursInRange } from '@increaser/utils/time/getHoursInRange'
import { Text } from '../Text'
import { formatTime } from '@increaser/utils/time/formatTime'
import { PositionAbsolutelyCenterHorizontally } from '../PositionAbsolutelyCenterHorizontally'
import { getCSSUnit } from '../utils/getCSSUnit'
import { getVerticalPaddingCSS } from '../utils/getVerticalPaddingCSS'
import { ComponentWithChildrenProps } from '../../props'

interface TimeSpaceProps extends ComponentWithChildrenProps {
  startsAt: number
  endsAt: number
  msToPx: (ms: number) => number
}

const labelSize = 12

const Label = styled(Text)`
  font-size: ${getCSSUnit(labelSize)};
  line-height: 1;
  color: ${getColor('textSupporting')};
`

const Wrapper = styled.div`
  ${getVerticalPaddingCSS(labelSize / 2)};
  user-select: none;
`

const Container = styled.div`
  position: relative;
`

const Transparent = styled.div`
  opacity: 0;
`
const Line = styled.div`
  background: ${getColor('mistExtra')};
  height: 1px;
  width: 100%;
`

export const TimeSpace = ({
  startsAt,
  endsAt,
  msToPx,
  children,
}: TimeSpaceProps) => {
  const height = msToPx(endsAt - startsAt)

  const marks = useMemo(() => getHoursInRange(startsAt, endsAt), [])

  return (
    <Wrapper>
      <Container style={{ height }}>
        <HStack fullHeight gap={8}>
          <VStack style={{ position: 'relative' }} fullHeight>
            {marks.map((mark, index) => {
              const top = msToPx(mark - startsAt)

              const label = <Label>{formatTime(mark)}</Label>

              return (
                <Fragment key={index}>
                  <Transparent>{label}</Transparent>
                  <PositionAbsolutelyCenterHorizontally top={top}>
                    {label}
                  </PositionAbsolutelyCenterHorizontally>
                </Fragment>
              )
            })}
          </VStack>
          <VStack fullWidth fullHeight style={{ position: 'relative' }}>
            {marks.map((mark, index) => {
              const top = msToPx(mark - startsAt)

              return (
                <PositionAbsolutelyCenterHorizontally
                  key={index}
                  fullWidth
                  top={top}
                >
                  <Line />
                </PositionAbsolutelyCenterHorizontally>
              )
            })}
            {children}
          </VStack>
        </HStack>
      </Container>
    </Wrapper>
  )
}

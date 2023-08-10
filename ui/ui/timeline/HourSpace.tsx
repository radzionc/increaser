import styled from 'styled-components'
import { VStack } from '../Stack'
import { Text } from '../Text'
import { getColor } from '../theme/getters'
import { range } from '../../shared/utils/range'
import { MS_IN_HOUR } from '@increaser/utils/time'
import { formatTime } from '../../../app/shared/utils/formatTime'

interface Props {
  start: number
  end: number
  className?: string
  children?: React.ReactNode
  underLinesContent?: React.ReactNode
}

const Container = styled(VStack)`
  position: relative;
`

const HourWr = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const HourContainer = styled.div`
  position: absolute;
  width: 100%;
`

const HourContent = styled.div<{ labelWidth: number }>`
  width: 100%;
  display: grid;
  gap: 8px;
  grid-template-columns: ${({ labelWidth }) => labelWidth}px 1fr;
  align-items: center;
`

const HourLine = styled.div`
  background: ${getColor('mist')};
  height: 1px;
  width: 100%;
`

const Content = styled.div<{ leftOffset: number }>`
  position: absolute;
  width: calc(100% - ${(p) => p.leftOffset}px);
  height: 100%;
  left: ${(p) => p.leftOffset}px;
  display: flex;
`

export const HourSpace = ({
  start,
  end,
  className,
  children,
  underLinesContent,
}: Props) => {
  const hours = range(end + 1 - start).map((index) => start + index)

  const hourLabelWidthInPx = 40

  return (
    <Container
      className={className}
      justifyContent="space-between"
      fullHeight
      fullWidth
    >
      {underLinesContent && (
        <Content leftOffset={hourLabelWidthInPx}>{underLinesContent}</Content>
      )}
      {hours.map((hour) => {
        return (
          <HourWr key={hour}>
            <HourContainer>
              <HourContent labelWidth={hourLabelWidthInPx}>
                <Text nowrap size={12} color="supporting">
                  {formatTime(start + hour * MS_IN_HOUR)}
                </Text>
                <HourLine />
              </HourContent>
            </HourContainer>
          </HourWr>
        )
      })}
      {children && (
        <Content leftOffset={hourLabelWidthInPx}>{children}</Content>
      )}
    </Container>
  )
}

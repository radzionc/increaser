import { goalToFinishWorkByEmoji, goalToStartWorkAtEmoji } from 'sets/constants'
import { formatTime } from 'shared/utils/formatTime'
import { getDateFromMinutes } from 'shared/utils/getDateFromMinutes'
import { range } from 'shared/utils/range'
import { toPercents } from 'shared/utils/toPercents'
import styled, { useTheme } from 'styled-components'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { getCSSUnit } from '@increaser/ui/ui/utils/getCSSUnit'
import { useAssertUserState } from 'user/state/UserStateContext'
import { MIN_IN_HOUR } from 'utils/time'

interface Props {
  start: number
  end: number
  className?: string
  labelsWidth: number
  children?: React.ReactNode
  underLinesContent?: React.ReactNode
  formatHour?: (hour: number) => string | number
}

const Container = styled(VStack)`
  position: relative;
  flex: 1;
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

const hourLabelLineGapInPx = 8

const HourContent = styled.div<{ labelWidth: number }>`
  width: 100%;
  display: grid;
  gap: ${getCSSUnit(hourLabelLineGapInPx)};
  grid-template-columns: ${({ labelWidth }) => labelWidth}px 1fr;
  align-items: center;
`

const HourLine = styled.div`
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
  height: 1px;
  width: 100%;
`

const Content = styled.div<{ leftOffset: number }>`
  position: absolute;
  width: calc(100% - ${(p) => p.leftOffset}px);
  height: 100%;
  left: ${(p) => p.leftOffset}px;
  display: flex;
  gap: 4px;
`

const Boundary = styled(HourWr)`
  position: absolute;
  width: 100%;
`

export const ScheduleHourSpace = ({
  start,
  end,
  className,
  labelsWidth,
  children,
  underLinesContent,
}: Props) => {
  const { colors } = useTheme()

  const hours = range(end + 1 - start).map((index) => start + index)

  const { goalToStartWorkAt, goalToFinishWorkBy, goalToGoToBedAt } =
    useAssertUserState()

  const offset = labelsWidth - hourLabelLineGapInPx

  return (
    <Container
      className={className}
      justifyContent="space-between"
      fullHeight
      fullWidth
    >
      {underLinesContent && (
        <Content leftOffset={offset}>{underLinesContent}</Content>
      )}
      {hours.map((hour) => {
        const shouldDisplay = [
          goalToStartWorkAt,
          goalToFinishWorkBy,
          goalToGoToBedAt,
        ].every((minutes) => {
          const hourInMinutes = hour * 60
          return hourInMinutes < minutes - 30 || hourInMinutes > minutes + 30
        })
        return (
          <HourWr key={hour}>
            <HourContainer>
              <HourContent labelWidth={offset}>
                {shouldDisplay ? (
                  <Text color="shy" size={14}>
                    {formatTime(getDateFromMinutes(hour * 60).getTime())}
                  </Text>
                ) : (
                  <div />
                )}
                <HourLine />
              </HourContent>
            </HourContainer>
          </HourWr>
        )
      })}
      <Boundary
        style={{
          top: toPercents(
            (goalToStartWorkAt / MIN_IN_HOUR - start) / (hours.length - 1),
          ),
        }}
      >
        <HourContainer>
          <HourContent
            style={{ color: colors.textSupporting.toCssValue() }}
            labelWidth={offset}
          >
            <Text weight="semibold" size={14}>
              {formatTime(getDateFromMinutes(goalToStartWorkAt).getTime())}
              <Text as="span" color="contrast" style={{ marginLeft: 4 }}>
                {goalToStartWorkAtEmoji}
              </Text>
            </Text>
          </HourContent>
        </HourContainer>
      </Boundary>
      <Boundary
        style={{
          top: toPercents(
            (goalToFinishWorkBy / MIN_IN_HOUR - start) / (hours.length - 1),
          ),
        }}
      >
        <HourContainer>
          <HourContent
            style={{ color: colors.textSupporting.toCssValue() }}
            labelWidth={offset}
          >
            <Text weight="semibold" size={14}>
              {formatTime(getDateFromMinutes(goalToFinishWorkBy).getTime())}
              <Text as="span" color="contrast" style={{ marginLeft: 4 }}>
                {goalToFinishWorkByEmoji}
              </Text>
            </Text>
          </HourContent>
        </HourContainer>
      </Boundary>
      {children && <Content leftOffset={labelsWidth}>{children}</Content>}
    </Container>
  )
}

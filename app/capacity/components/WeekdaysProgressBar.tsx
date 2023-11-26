import { HSLA } from '@increaser/ui/colors/HSLA'
import { useWeekday } from '@increaser/ui/hooks/useWeekday'
import { toPercents } from '@increaser/utils/toPercents'
import styled, { useTheme } from 'styled-components'
import { D_IN_WEEK, getShortWeekday } from '@increaser/utils/time'
import { Match } from '@increaser/ui/base/Match'
import { round } from '@increaser/ui/css/round'

const Wrapper = styled.div`
  height: 4px;
  width: 100%;
  position: relative;
`

const Container = styled.div`
  position: relative;
  ${round};
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
  height: 100%;
  overflow: hidden;
`

const Fill = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  max-width: 100%;
`

const Weekday = styled.div`
  position: absolute;
  top: 0;
  padding-top: 8px;
  padding-right: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  color: ${({ theme }) => theme.colors.textShy.toCssValue()};
  border-right: 1px solid;
`

interface WeekdaysProgressBarProps {
  total: number
  target: number
  value: number
  goal: 'more' | 'less' | 'awareness'
  color?: HSLA
}

export const WeekdaysProgressBar = ({
  target,
  value,
  goal,
  total,
  color: optionalColor,
}: WeekdaysProgressBarProps) => {
  const weekday = useWeekday()

  const { colors } = useTheme()

  const color = optionalColor || colors.mistExtra

  return (
    <Wrapper>
      <Container>
        <Match
          value={goal}
          more={() => (
            <>
              <Fill
                style={{
                  width: toPercents(value / total),
                  background: (value > total
                    ? colors.success
                    : color
                  ).toCssValue(),
                }}
              />
              <Fill
                style={{
                  width: toPercents(Math.abs(value - target) / total),
                  left: toPercents((value > target ? target : value) / total),
                  background: (value > target
                    ? colors.success
                    : colors.alert
                  ).toCssValue(),
                }}
              />
            </>
          )}
          less={() => (
            <>
              <Fill
                style={{
                  width: toPercents(value / total),
                  background: color.toCssValue(),
                }}
              />
              <Fill
                style={{
                  width: toPercents(Math.abs(value - target) / total),
                  left: toPercents((value > target ? target : value) / total),
                  background: (value < target
                    ? colors.success
                    : colors.alert
                  ).toCssValue(),
                }}
              />
            </>
          )}
          awareness={() => (
            <>
              <Fill
                style={{
                  width: toPercents(target / total),
                  background: colors.mist.toCssValue(),
                }}
              />
              <Fill
                style={{
                  width: toPercents(value / total),
                  background: color.toCssValue(),
                }}
              />
            </>
          )}
        />
      </Container>
      {weekday < D_IN_WEEK - 1 && (
        <Weekday
          style={{
            right: toPercents((total - target) / total),
          }}
        >
          {getShortWeekday(weekday)}
        </Weekday>
      )}
    </Wrapper>
  )
}

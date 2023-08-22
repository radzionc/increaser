import { useCurrentProject } from 'projects/components/ProjectView/CurrentProjectProvider'
import { Path } from 'router/Path'
import { useWeekday } from 'shared/hooks/useWeekday'
import { formatDuration } from 'shared/utils/formatDuration'
import { sum } from 'shared/utils/sum'
import { toPercents } from '@increaser/utils/toPercents'
import styled, { useTheme } from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { defaultBorderRadiusCSS } from '@increaser/ui/ui/borderRadius'
import { LabeledValue } from '@increaser/ui/ui/LabeledValue'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { getShortWeekday } from 'utils/time'
import { useWeekTimeAllocation } from 'weekTimeAllocation/hooks/useWeekTimeAllocation'
import Link from 'next/link'

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  ${defaultBorderRadiusCSS};
  ${defaultTransitionCSS};
  height: 52px;
  border: 1px solid ${({ theme }) => theme.colors.mist.toCssValue()};
  overflow: hidden;
`

const Days = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
`

const Day = styled.div`
  height: 100%;
  border-right: 1px dashed;
  display: flex;
  align-items: end;
  justify-content: end;
  padding-right: 6px;
`

const Fill = styled.div`
  height: 100%;
  ${defaultTransitionCSS};
`

const Distance = styled.div`
  position: absolute;
  top: 0;
  color: ${({ theme }) => theme.colors.alert.toCssValue()};
  border-top: 1px solid;
  font-size: 14px;
  ${centerContentCSS};
  overflow: visible;
  white-space: nowrap;
  justify-content: end;
  padding-right: 6px;
  ${defaultTransitionCSS};
`

export const ProjectGoal = () => {
  const { allocatedMinutesPerWeek, doneMinutesThisWeek } = useCurrentProject()
  const { allocation, totalMinutes } = useWeekTimeAllocation()

  const weekday = useWeekday()

  const { colors } = useTheme()

  const target = allocatedMinutesPerWeek
    ? allocatedMinutesPerWeek *
      (sum(allocation.filter((_, index) => index <= weekday)) / totalMinutes)
    : undefined

  return (
    <VStack gap={4}>
      <HStack fullWidth justifyContent="space-between">
        <Link href={Path.Capacity}>
          <Text as="div" size={14}>
            <LabeledValue name="Weekly goal">
              <Text as="span" weight="bold">
                {allocatedMinutesPerWeek > 0
                  ? formatDuration(allocatedMinutesPerWeek, 'min')
                  : '-'}
              </Text>
            </LabeledValue>
          </Text>
        </Link>
      </HStack>
      <Container
        style={{
          borderColor:
            allocatedMinutesPerWeek &&
            doneMinutesThisWeek >= allocatedMinutesPerWeek
              ? colors.success.toCssValue()
              : undefined,
        }}
      >
        <Fill
          style={{
            width: toPercents(
              allocatedMinutesPerWeek
                ? doneMinutesThisWeek / allocatedMinutesPerWeek
                : 0,
            ),
            background: colors.background.toCssValue(),
          }}
        />
        {doneMinutesThisWeek < allocatedMinutesPerWeek && (
          <Days>
            {allocation
              .filter((allocation) => allocation > 0)
              .slice(0, -1)
              .map((minutes, index) => (
                <Day
                  key={index}
                  style={{
                    width: toPercents(minutes / totalMinutes),
                    color: (index === weekday
                      ? colors.text
                      : colors.mistExtra
                    ).toCssValue(),
                  }}
                >
                  <Text size={14}>
                    {index === weekday && getShortWeekday(weekday)}
                  </Text>
                </Day>
              ))}
          </Days>
        )}
        <Distance
          style={{
            borderColor:
              doneMinutesThisWeek >= allocatedMinutesPerWeek
                ? 'transparent'
                : undefined,
            left:
              doneMinutesThisWeek < allocatedMinutesPerWeek
                ? toPercents(
                    target
                      ? doneMinutesThisWeek < target
                        ? doneMinutesThisWeek / allocatedMinutesPerWeek
                        : target / allocatedMinutesPerWeek
                      : 0,
                  )
                : undefined,
            right:
              doneMinutesThisWeek > allocatedMinutesPerWeek ? 6 : undefined,
            width: toPercents(
              target
                ? doneMinutesThisWeek < target
                  ? (target - doneMinutesThisWeek) / allocatedMinutesPerWeek
                  : (doneMinutesThisWeek - target) / allocatedMinutesPerWeek
                : 0,
            ),
            color: (target
              ? doneMinutesThisWeek < target
                ? colors.alert
                : colors.success
              : colors.mist
            ).toCssValue(),
          }}
        >
          {target
            ? allocatedMinutesPerWeek > doneMinutesThisWeek
              ? `${doneMinutesThisWeek > +target ? '+' : '-'} ${formatDuration(
                  Math.abs(target - doneMinutesThisWeek),
                  'min',
                )}`
              : `+ ${formatDuration(
                  doneMinutesThisWeek - allocatedMinutesPerWeek,
                  'min',
                )}`
            : ''}
        </Distance>
      </Container>
    </VStack>
  )
}

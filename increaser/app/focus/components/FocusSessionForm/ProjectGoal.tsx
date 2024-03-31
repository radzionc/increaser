import { useCurrentProject } from '@increaser/app/projects/components/ProjectView/CurrentProjectProvider'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import { toPercents } from '@lib/utils/toPercents'
import styled, { useTheme } from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { centerContent } from '@lib/ui/css/centerContent'
import { getShortWeekday } from '@lib/utils/time'
import { useWeekTimeAllocation } from '@increaser/app/weekTimeAllocation/hooks/useWeekTimeAllocation'
import Link from 'next/link'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { AppPath } from '@increaser/ui/navigation/AppPath'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  ${borderRadius.m};
  ${transition};
  height: 52px;
  background: ${getColor('foreground')};
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
  ${transition};
`

const Distance = styled.div`
  position: absolute;
  top: 0;
  color: ${({ theme }) => theme.colors.alert.toCssValue()};
  border-top: 1px solid;
  font-size: 14px;
  ${centerContent};
  overflow: visible;
  white-space: nowrap;
  justify-content: end;
  padding-right: 6px;
  ${transition};
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
      <UniformColumnGrid gap={20} minChildrenWidth={80} maxChildrenWidth={140}>
        <Text as="div" size={14}>
          <LabeledValue name="This week">
            <Text as="span" weight="bold">
              {doneMinutesThisWeek > 0
                ? formatDuration(doneMinutesThisWeek, 'min', {
                    maxUnit: 'h',
                  })
                : '-'}
            </Text>
          </LabeledValue>
        </Text>
        <Link href={AppPath.ProjectsBudget}>
          <Text as="div" size={14}>
            <LabeledValue name="Weekly goal">
              <Text as="span" weight="bold">
                {allocatedMinutesPerWeek > 0
                  ? formatDuration(allocatedMinutesPerWeek, 'min', {
                      maxUnit: 'h',
                    })
                  : '-'}
              </Text>
            </LabeledValue>
          </Text>
        </Link>
      </UniformColumnGrid>
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
                      : colors.textShy
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
                  { maxUnit: 'h' },
                )}`
              : `+ ${formatDuration(
                  doneMinutesThisWeek - allocatedMinutesPerWeek,
                  'min',
                  { maxUnit: 'h' },
                )}`
            : ''}
        </Distance>
      </Container>
    </VStack>
  )
}

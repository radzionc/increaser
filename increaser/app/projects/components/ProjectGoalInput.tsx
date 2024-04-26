import { useUpdateProjectMutation } from '@increaser/app/projects/api/useUpdateProjectMutation'
import { useCallback, useMemo } from 'react'
import { sum } from '@lib/utils/array/sum'
import styled from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { MIN_IN_HOUR, S_IN_HOUR } from '@lib/utils/time'

import { useCurrentProject } from './ProjectView/CurrentProjectProvider'
import { ShyCheckbox } from '@increaser/app/ui/ShyCheckbox'
import { StepInput } from '@increaser/app/ui/StepInput'
import { useFreeHours } from '../budget/hooks/useFreeHours'
import { convertDuration } from '@lib/utils/time/convertDuration'

const Checkbox = styled(ShyCheckbox)`
  flex: 1;
  padding: 20px;

  &:hover {
    background: ${({ theme }) => theme.colors.mist.toCssValue()};
  }

  ${borderRadius.m};
`

const Container = styled(HStack)`
  padding: 2px;
  width: 100%;
  ${borderRadius.m};
  background: ${({ theme }) => theme.colors.foreground.toCssValue()};
  overflow: hidden;

  > * {
    padding: 16px 20px;
  }
`

export const ProjectGoalInput = () => {
  const freeHours = useFreeHours()
  const { name, allocatedMinutesPerWeek, hslaColor, id, weeks } =
    useCurrentProject()

  const { mutate: updateProject } = useUpdateProjectMutation()

  const value = allocatedMinutesPerWeek / MIN_IN_HOUR

  const updateGoal = useCallback(
    (value: number) => {
      if (value < 0) return

      updateProject({
        id,
        fields: {
          allocatedMinutesPerWeek: value * MIN_IN_HOUR,
        },
      })
    },
    [id, updateProject],
  )

  const maxHours =
    (allocatedMinutesPerWeek + convertDuration(freeHours, 'h', 'min')) /
    MIN_IN_HOUR

  const defaultValue = useMemo(() => {
    if (weeks.length) {
      const value = sum(weeks.map(({ seconds }) => seconds)) / weeks.length
      const hours = Math.ceil(value / S_IN_HOUR)
      if (hours) {
        return Math.min(hours, maxHours)
      }
    }

    return Math.min(4, maxHours)
  }, [maxHours, weeks])

  const hasValue = value > 0

  return (
    <Container>
      <Checkbox
        value={!!allocatedMinutesPerWeek}
        onChange={(value) => updateGoal(value ? defaultValue : 0)}
        label={name}
        color={hslaColor}
      />
      {hasValue && (
        <>
          <Text style={{ whiteSpace: 'nowrap' }} weight="bold">
            {value} h
          </Text>

          <StepInput
            value={value}
            onChange={updateGoal}
            min={0}
            max={maxHours}
          />
        </>
      )}
    </Container>
  )
}

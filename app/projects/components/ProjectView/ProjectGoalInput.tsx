import { useUpdateProjectMutation } from 'projects/api/useUpdateProjectMutation'
import { useCallback, useMemo } from 'react'
import { sum } from '@increaser/utils/sum'
import styled, { useTheme } from 'styled-components'
import { Text } from '@increaser/ui/ui/Text'
import { MIN_IN_HOUR, S_IN_HOUR } from '@increaser/utils/time'
import { useWeekTimeAllocation } from 'weekTimeAllocation/hooks/useWeekTimeAllocation'

import { useCurrentProject } from './CurrentProjectProvider'
import { ShyCheckbox } from 'ui/ShyCheckbox'
import { CountInput } from 'ui/CountInput'

const Container = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 36px;
  align-items: center;
  gap: 20px;
  min-height: 40px;
`

export const ProjectGoalInput = () => {
  const { id, allocatedMinutesPerWeek, weeks, name, hslaColor } =
    useCurrentProject()

  const { colors } = useTheme()
  const color = colors.contrast

  const { freeMinutes } = useWeekTimeAllocation()

  const { mutate: updateProject } = useUpdateProjectMutation()

  const updateGoal = useCallback(
    (hours: number) => {
      updateProject({
        id,
        fields: {
          allocatedMinutesPerWeek: hours * MIN_IN_HOUR,
        },
      })
    },
    [id, updateProject],
  )

  const maxHours = (allocatedMinutesPerWeek + freeMinutes) / 60

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

  if (!allocatedMinutesPerWeek && !freeMinutes) {
    return null
  }

  const value = Math.round(allocatedMinutesPerWeek / MIN_IN_HOUR)

  return (
    <Container>
      <ShyCheckbox
        value={!!allocatedMinutesPerWeek}
        onChange={(value) => updateGoal(value ? defaultValue : 0)}
        label={name}
        color={hslaColor}
      />

      {!!value && (
        <>
          <CountInput
            value={value}
            color={color}
            max={maxHours}
            onChange={updateGoal}
            formatValue={(v) => `${v} h`}
          />
          <Text
            style={{ textAlign: 'end', justifySelf: 'end' }}
            size={16}
            weight="bold"
          >
            {value} h
          </Text>
        </>
      )}
    </Container>
  )
}

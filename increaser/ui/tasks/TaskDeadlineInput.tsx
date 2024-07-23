import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { matchColor } from '@lib/ui/theme/getters'
import { useMemo } from 'react'
import styled from 'styled-components'
import { endOfDay } from 'date-fns'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { formatTaskDeadline } from '@increaser/entities-utils/task/formatTaskDeadline'

const Icon = styled(IconWrapper)<{ isOverdue: boolean }>`
  color: ${matchColor('isOverdue', {
    true: 'idle',
    false: 'text',
  })};
`

export const TaskDeadlineInput = ({
  value,
  onChange,
}: InputProps<number | null>) => {
  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  const options = useMemo(() => {
    const today = endOfDay(now).getTime()
    return [null, today, today + convertDuration(1, 'd', 'ms')]
  }, [now])

  const isOverdue = value ? value < now : false

  return (
    <ExpandableSelector
      style={{ width: 160 }}
      openerContent={
        <HStack alignItems="center" gap={8}>
          <Icon isOverdue={isOverdue} style={{ fontSize: 14 }}>
            <CalendarIcon />
          </Icon>
          <Text>
            {formatTaskDeadline({
              deadlineAt: value,
              now,
            })}
          </Text>
        </HStack>
      }
      value={value}
      onChange={onChange}
      options={options}
      getOptionKey={(option) => formatTaskDeadline({ deadlineAt: option, now })}
    />
  )
}

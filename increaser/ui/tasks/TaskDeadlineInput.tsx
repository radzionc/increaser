import { getDeadlineTypes } from '@increaser/entities-utils/task/getDeadlineTypes'
import { DeadlineStatus, deadlineName } from '@increaser/entities/Task'
import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { matchColor } from '@lib/ui/theme/getters'
import { useMemo } from 'react'
import styled from 'styled-components'

const Icon = styled(IconWrapper)<{ isOverdue: boolean }>`
  color: ${matchColor('isOverdue', {
    true: 'idle',
    false: 'text',
  })};
`

export const TaskDeadlineInput = ({
  value,
  onChange,
}: InputProps<DeadlineStatus>) => {
  const deadlineTypes = useMemo(() => getDeadlineTypes(Date.now()), [])

  return (
    <ExpandableSelector
      style={{ width: 160 }}
      openerContent={
        <HStack alignItems="center" gap={8}>
          <Icon isOverdue={value === 'overdue'} style={{ fontSize: 14 }}>
            <CalendarIcon />
          </Icon>
          <Text>{deadlineName[value]}</Text>
        </HStack>
      }
      value={value}
      onChange={onChange}
      options={['none', ...deadlineTypes]}
      getOptionKey={(option) => option}
      renderOption={(option) => (
        <Text key={option}>{deadlineName[option]}</Text>
      )}
    />
  )
}

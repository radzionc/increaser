import {
  DeadlineStatus,
  deadlineName,
  deadlineTypes,
} from '@increaser/entities/Task'
import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'

export const TaskDeadlineInput = ({
  value,
  onChange,
}: InputProps<DeadlineStatus>) => {
  return (
    <ExpandableSelector
      style={{ width: 142 }}
      openerContent={
        <HStack alignItems="center" gap={8}>
          <IconWrapper style={{ fontSize: 14 }}>
            <CalendarIcon />
          </IconWrapper>
          <Text>{value === 'overdue' ? 'Deadline' : deadlineName[value]}</Text>
        </HStack>
      }
      value={value}
      onChange={onChange}
      options={deadlineTypes}
      getOptionKey={(option) => option}
      renderOption={(option) => (
        <Text key={option}>{deadlineName[option]}</Text>
      )}
    />
  )
}

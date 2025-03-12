import { HStack } from '@lib/ui/css/stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import {
  TaskStatus,
  taskStatuses,
  taskStatusName,
} from '@product/entities/Task'

import { taskStatusIcon } from '../status/taskStatusIcon'

type TaskStatusInputProps = InputProps<TaskStatus>

export const TaskStatusInput = ({ value, onChange }: TaskStatusInputProps) => {
  return (
    <ExpandableSelector
      value={value}
      onChange={onChange}
      options={taskStatuses}
      getOptionKey={capitalizeFirstLetter}
      showToggle={false}
      renderOption={(option) => (
        <HStack alignItems="center" gap={8}>
          <IconWrapper>{taskStatusIcon[option]}</IconWrapper>
          <Text>{taskStatusName[option]}</Text>
        </HStack>
      )}
    />
  )
}

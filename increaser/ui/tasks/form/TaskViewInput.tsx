import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { tasksView, TasksView, tasksViewIcon } from '../TasksView'

type TaskStatusInputProps = InputProps<TasksView>

export const TaskViewInput = ({ value, onChange }: TaskStatusInputProps) => {
  return (
    <ExpandableSelector
      style={{ width: 142 }}
      value={value}
      onChange={onChange}
      options={tasksView}
      getOptionKey={capitalizeFirstLetter}
      renderOption={(option) => (
        <HStack alignItems="center" gap={8}>
          <IconWrapper>{tasksViewIcon[option]}</IconWrapper>
          <Text>{capitalizeFirstLetter(option)}</Text>
        </HStack>
      )}
    />
  )
}

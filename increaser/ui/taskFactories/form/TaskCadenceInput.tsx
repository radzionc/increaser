import {
  TaskCadence,
  taskCadence,
  taskCadenceName,
} from '@increaser/entities/TaskFactory'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { RefreshIcon } from '@lib/ui/icons/RefreshIcon'
import { HStack } from '@lib/ui/css/stack'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'

export const TaskCadenceInput = ({
  value,
  onChange,
}: InputProps<TaskCadence>) => {
  return (
    <ExpandableSelector
      showToggle={false}
      openerContent={
        <HStack alignItems="center" gap={8}>
          <IconWrapper style={{ fontSize: 14 }}>
            <RefreshIcon />
          </IconWrapper>
          <Text>{taskCadenceName[value]}</Text>
        </HStack>
      }
      value={value}
      onChange={onChange}
      options={taskCadence}
      getOptionKey={(option) => option}
      getOptionName={(option) => taskCadenceName[option]}
      renderOption={(option) => (
        <Text key={option}>{taskCadenceName[option]}</Text>
      )}
    />
  )
}

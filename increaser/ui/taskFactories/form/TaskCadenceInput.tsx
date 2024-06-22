import {
  TaskCadence,
  taskCadence,
  taskCadenceName,
} from '@increaser/entities/TaskFactory'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { RefreshIcon } from '@lib/ui/icons/RefreshIcon'
import { HStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'

const Icon = styled(IconWrapper)``

export const TaskCadenceInput = ({
  value,
  onChange,
}: InputProps<TaskCadence>) => {
  return (
    <ExpandableSelector
      style={{ width: 168 }}
      openerContent={
        <HStack alignItems="center" gap={8}>
          <Icon style={{ fontSize: 14 }}>
            <RefreshIcon />
          </Icon>
          <Text>{taskCadenceName[value]}</Text>
        </HStack>
      }
      value={value}
      onChange={onChange}
      options={taskCadence}
      getOptionKey={(option) => option}
      renderOption={(option) => (
        <Text key={option}>{taskCadenceName[option]}</Text>
      )}
    />
  )
}

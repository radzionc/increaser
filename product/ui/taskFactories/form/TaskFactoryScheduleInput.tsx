import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { InputProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { TaskFactory } from '@product/entities/TaskFactory'
import { doesCadenceSupportDeadlineIndex } from '@product/entities-utils/taskFactory/doesCadenceSupportDeadlineIndex'

import { TaskCadenceInput } from './TaskCadenceInput'
import { TaskDeadlineIndexInput } from './TaskDeadlineIndexInput'

export const TaskFactoryScheduleInput: React.FC<
  InputProps<Pick<TaskFactory, 'cadence' | 'deadlineIndex'>>
> = ({ value, onChange }) => {
  return (
    <HStackSeparatedBy
      separator={<Text color="shy">on</Text>}
      gap={8}
      alignItems="center"
    >
      <TaskCadenceInput
        value={value.cadence}
        onChange={(cadence) => onChange({ ...value, cadence })}
      />
      {doesCadenceSupportDeadlineIndex(value.cadence) && (
        <TaskDeadlineIndexInput
          value={value.deadlineIndex ?? null}
          cadence={value.cadence}
          onChange={(deadlineIndex) => onChange({ ...value, deadlineIndex })}
        />
      )}
    </HStackSeparatedBy>
  )
}

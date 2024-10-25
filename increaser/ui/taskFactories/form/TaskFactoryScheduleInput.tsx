import { doesCadenceSupportDeadlineIndex } from '@increaser/entities-utils/taskFactory/doesCadenceSupportDeadlineIndex'
import { TaskFactory } from '@increaser/entities/TaskFactory'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { InputProps } from '@lib/ui/props'
import { TaskCadenceInput } from './TaskCadenceInput'
import { TaskDeadlineIndexInput } from './TaskDeadlineIndexInput'
import { Text } from '@lib/ui/text'

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

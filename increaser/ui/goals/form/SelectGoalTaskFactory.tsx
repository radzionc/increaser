import { FinishableComponentProps } from '@lib/ui/props'

type SelectGoalTaskFactoryProps = FinishableComponentProps<string | undefined>

export const SelectGoalTaskFactory = ({
  onFinish,
}: SelectGoalTaskFactoryProps) => {
  return <p>Select goal</p>
}

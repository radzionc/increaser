import { FinishableComponentProps } from '@lib/ui/props'

type AddGoalTaskFactoryProps = FinishableComponentProps<string | undefined>

export const AddGoalTaskFactory = ({ onFinish }: AddGoalTaskFactoryProps) => {
  return <p>add goal</p>
}

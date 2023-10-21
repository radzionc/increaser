import { FinishableComponentProps } from '@increaser/ui/props'

interface SyncSubscriptionProps extends FinishableComponentProps {
  subscriptionId: string
}

export const SyncSubscription = ({ onFinish, id }: SyncSubscriptionProps) => {
  return <div>SyncSubscription {id}</div>
}

import { HStack } from '@lib/ui/css/stack'
import { useUser } from '../../user/state/user'
import { IncludedItem } from '@lib/ui/inputs/IncludedItem'
import { WEEKDAYS } from '@lib/utils/time'
import { useUpdateUserMutation } from '../../user/mutations/useUpdateUserMutation'
import { without } from '@lib/utils/array/without'
import { order } from '@lib/utils/array/order'
import { AddWeekend } from './AddWeekend'
import { TextConnector } from '../TextConnector'

export const ManageWeekends = () => {
  const { weekends } = useUser()

  const { mutate } = useUpdateUserMutation()

  return (
    <HStack wrap="wrap" alignItems="center" gap={8}>
      <TextConnector>My weekends:</TextConnector>
      {order(weekends, (v) => v, 'asc').map((weekend) => (
        <IncludedItem
          key={weekend}
          onRemove={() => {
            mutate({ weekends: without(weekends, weekend) })
          }}
        >
          {WEEKDAYS[weekend]}
        </IncludedItem>
      ))}
      <AddWeekend />
    </HStack>
  )
}

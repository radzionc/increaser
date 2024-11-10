import { HStack } from '@lib/ui/css/stack'
import { useUser } from '../../user/state/user'
import { Text } from '@lib/ui/text'
import { IncludedItem } from '@lib/ui/inputs/IncludedItem'
import { WEEKDAYS } from '@lib/utils/time'
import { useUpdateUserMutation } from '../../user/mutations/useUpdateUserMutation'
import { without } from '@lib/utils/array/without'
import { order } from '@lib/utils/array/order'
import { AddWeekend } from './AddWeekend'

export const ManageWeekends = () => {
  const { weekends } = useUser()

  const { mutate } = useUpdateUserMutation()

  return (
    <HStack wrap="wrap" alignItems="center" gap={8}>
      <Text weight="600" color="supporting">
        My weekends:
      </Text>
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

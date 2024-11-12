import { HStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { range } from '@lib/utils/array/range'
import { useUser } from '@increaser/ui/user/state/user'
import { formatDailyEventTime } from '@lib/utils/time/formatDailyEventTime'
import { useUpdateUserMutation } from '../../../user/mutations/useUpdateUserMutation'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'

const dayMomentStep = 30

export const ManageFinishWorkAt = () => {
  const { mutate: updateUser } = useUpdateUserMutation()
  const { finishWorkAt } = useUser()

  const min = convertDuration(12, 'h', 'min')
  const max = convertDuration(24, 'h', 'min')

  const options = range(Math.round((max - min) / dayMomentStep) + 1).map(
    (step) => min + dayMomentStep * step,
  )

  return (
    <>
      <HStack wrap="wrap" alignItems="center" gap={8}>
        <Text weight="600" color="supporting">
          I want to finish work before
        </Text>
        <ExpandableSelector<number>
          value={finishWorkAt}
          onChange={(option) => {
            updateUser({ finishWorkAt: option })
          }}
          options={options}
          getOptionKey={(option) => option.toString()}
          getOptionName={formatDailyEventTime}
          showToggle={false}
        />
      </HStack>
    </>
  )
}

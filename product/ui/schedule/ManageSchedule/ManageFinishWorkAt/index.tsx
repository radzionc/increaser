import { HStack } from '@lib/ui/css/stack'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { range } from '@lib/utils/array/range'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDailyEventTime } from '@lib/utils/time/formatDailyEventTime'
import { useUser } from '@product/ui/user/state/user'

import { TextConnector } from '../../../preferences/TextConnector'
import { useUpdateUserMutation } from '../../../user/mutations/useUpdateUserMutation'

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
        <TextConnector>I want to finish work before</TextConnector>
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
        <TextConnector>
          to maintain a healthy work-life balance and unwind before sleep
        </TextConnector>
      </HStack>
    </>
  )
}

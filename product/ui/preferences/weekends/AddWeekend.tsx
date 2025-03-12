import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { range } from '@lib/utils/array/range'
import { without } from '@lib/utils/array/without'
import { D_IN_WEEK, WEEKDAYS } from '@lib/utils/time'
import { useMemo } from 'react'

import { useUpdateUserMutation } from '../../user/mutations/useUpdateUserMutation'
import { useUser } from '../../user/state/user'

export const AddWeekend = () => {
  const { weekends } = useUser()

  const { mutate } = useUpdateUserMutation()

  const options = useMemo(
    () => without(range(D_IN_WEEK), ...weekends),
    [weekends],
  )

  if (options.length < 2) return null

  return (
    <ExpandableSelector<number>
      value={null}
      onChange={(day) => mutate({ weekends: [...weekends, day] })}
      options={options}
      getOptionKey={(option) => option.toString()}
      getOptionName={(option) => WEEKDAYS[option]}
      openerContent="Add a weekend"
      showToggle={false}
    />
  )
}

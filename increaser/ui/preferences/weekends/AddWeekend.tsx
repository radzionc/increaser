import { useMemo } from 'react'
import { useUpdateUserMutation } from '../../user/mutations/useUpdateUserMutation'
import { useUser } from '../../user/state/user'
import { range } from '@lib/utils/array/range'
import { D_IN_WEEK, WEEKDAYS } from '@lib/utils/time'
import { without } from '@lib/utils/array/without'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'

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
    />
  )
}

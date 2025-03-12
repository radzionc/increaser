import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { range } from '@lib/utils/array/range'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { getUserAgeAt } from '@product/entities-utils/user/getUserAgeAt'
import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'

export const GoalDeadlineAgeInput = ({
  value,
  onChange,
}: InputProps<number>) => {
  const { dob } = useUser()
  const userAge = getUserAgeAt({
    dob: shouldBePresent(dob),
    at: Date.now(),
  })

  const options = useMemo(() => {
    const minValue = userAge + 1
    const maxValue = 100

    return range(maxValue - minValue + 1).map((value) => minValue + value)
  }, [userAge])

  return (
    <ExpandableSelector
      showToggle={false}
      options={options}
      value={value}
      onChange={onChange}
      renderOption={(option) => option}
      getOptionKey={(option) => option.toString()}
      getOptionName={(option) => option.toString()}
    />
  )
}

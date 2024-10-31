import { InputProps } from '@lib/ui/props'
import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { getUserAgeAt } from '@increaser/entities-utils/user/getUserAgeAt'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { range } from '@lib/utils/array/range'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'

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

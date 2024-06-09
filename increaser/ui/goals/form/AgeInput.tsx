import { InputProps } from '@lib/ui/props'
import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'
import { getUserAge } from '@increaser/entities-utils/user/getUserAge'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { range } from '@lib/utils/array/range'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'

export const AgeInput = ({ value, onChange }: InputProps<number>) => {
  const { dob } = useAssertUserState()
  const userAge = getUserAge(shouldBePresent(dob))

  const options = useMemo(() => {
    const minValue = userAge + 1
    const maxValue = 100

    return range(maxValue - minValue + 1).map((value) => minValue + value)
  }, [userAge])

  return (
    <ExpandableSelector
      style={{ minWidth: 80 }}
      options={options}
      value={value}
      onChange={onChange}
      renderOption={(option) => option}
      getOptionKey={(option) => option.toString()}
    />
  )
}

import { InputProps } from '@lib/ui/props'
import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'
import { getUserAge } from '@increaser/entities-utils/user/getUserAge'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { HStack } from '@lib/ui/layout/Stack'
import { range } from '@lib/utils/array/range'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { LabelText } from '@lib/ui/inputs/LabelText'

export const AgeInput = ({ value, onChange }: InputProps<number>) => {
  const { dob } = useAssertUserState()
  const minValue = useMemo(() => {
    const userAge = getUserAge(shouldBePresent(dob))
    return userAge + 1
  }, [dob])

  const options = useMemo(() => {
    const maxValue = 100

    return range(maxValue - minValue + 1).map((value) => minValue + value)
  }, [minValue])

  return (
    <HStack alignItems="center" gap={16}>
      <LabelText>Complete goal by age</LabelText>
      <ExpandableSelector
        style={{ minWidth: 80 }}
        options={options}
        value={value}
        onChange={onChange}
        renderOption={(option) => option}
        getOptionKey={(option) => option.toString()}
      />
    </HStack>
  )
}

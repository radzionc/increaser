import { HStack, VStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import styled from 'styled-components'
import { addYears } from 'date-fns'
import { DayInput } from '@lib/ui/time/DayInput'
import { dayToString, stringToDay, toDay } from '@lib/utils/time/Day'
import { RadioInput } from '@lib/ui/inputs/RadioInput'
import { GoalDeadlineType, goalDeadlineTypes } from '@increaser/entities/Goal'
import { useEffect, useMemo, useState } from 'react'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { useAssertUserState } from '../../user/UserStateContext'
import { EditDobPrompt } from './EditDobPrompt'
import { Match } from '@lib/ui/base/Match'
import { getUserAge } from '@increaser/entities-utils/user/getUserAge'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { DobForm } from './DobForm'
import { AgeInput } from './AgeInput'

const Container = styled(VStack)`
  gap: 20px;
`

const getMinDeadline = () => Date.now()
const getMaxDeadline = () => addYears(Date.now(), 50).getTime()

export const GoalDeadlineInput = ({
  value,
  onChange,
}: InputProps<string | number | null>) => {
  const { dob } = useAssertUserState()
  const [deadlineType, setDeadlineType] = useState<GoalDeadlineType>('age')

  const [isEditingDob, setIsEditingDob] = useState(false)

  const guardedValue = useMemo(() => {
    if (deadlineType === 'date' && typeof value !== 'string') {
      return dayToString(toDay(addYears(Date.now(), 1).getTime()))
    }

    if (deadlineType === 'age' && typeof value !== 'number') {
      if (!dob) {
        return null
      }
      const userAge = getUserAge(dob)

      return userAge + 1
    }

    return value
  }, [deadlineType, dob, value])

  useEffect(() => {
    if (guardedValue !== value) {
      onChange(guardedValue)
    }
  }, [guardedValue, onChange, value])

  return (
    <Container>
      <HStack fullWidth gap={20} justifyContent="space-between">
        <RadioInput
          minOptionHeight={40}
          options={goalDeadlineTypes}
          value={deadlineType}
          onChange={setDeadlineType}
          renderOption={(option) => `${capitalizeFirstLetter(option)} deadline`}
        />
        {dob && !isEditingDob && deadlineType === 'age' && (
          <EditDobPrompt onClick={() => setIsEditingDob(true)} />
        )}
      </HStack>
      <Match
        value={deadlineType}
        date={() => (
          <InputContainer style={{ gap: 8 }}>
            <LabelText>Choose your goal's deadline</LabelText>
            <DayInput
              min={toDay(getMinDeadline())}
              max={toDay(getMaxDeadline())}
              value={stringToDay(guardedValue as string)}
              onChange={(value) => onChange(dayToString(value))}
            />
          </InputContainer>
        )}
        age={() =>
          !dob || isEditingDob ? (
            <DobForm
              onFinish={() => {
                setIsEditingDob(false)
              }}
            />
          ) : (
            <AgeInput value={guardedValue as number} onChange={onChange} />
          )
        }
      />
    </Container>
  )
}

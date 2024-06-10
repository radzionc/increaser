import { HStack, VStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import styled from 'styled-components'
import { addYears } from 'date-fns'
import { DayInput } from '@lib/ui/time/DayInput'
import { dayToString, stringToDay, toDay } from '@lib/utils/time/Day'
import { GoalDeadlineType, goalDeadlineTypes } from '@increaser/entities/Goal'
import { useEffect, useMemo, useState } from 'react'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { useAssertUserState } from '../../user/UserStateContext'
import { Match } from '@lib/ui/base/Match'
import { getUserAgeAt } from '@increaser/entities-utils/user/getUserAgeAt'
import { AgeInput } from './AgeInput'
import { formatGoalTimeLeft } from '@increaser/entities-utils/goal/formatGoalTimeLeft'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { Text } from '@lib/ui/text'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { SetDobPromptButton } from '../dob/SetDobPromptButton'

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
  const [deadlineType, setDeadlineType] = useState<GoalDeadlineType>(() => {
    if (typeof value === 'string') {
      return 'date'
    }

    if (typeof value === 'number') {
      return 'age'
    }

    return 'age'
  })

  const guardedValue = useMemo(() => {
    const now = Date.now()
    if (deadlineType === 'date' && typeof value !== 'string') {
      return dayToString(toDay(addYears(now, 1).getTime()))
    }

    if (deadlineType === 'age' && typeof value !== 'number') {
      if (!dob) {
        return null
      }
      const userAge = getUserAgeAt({
        dob,
        at: now,
      })

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
      <InputContainer style={{ gap: 8 }} as="div">
        <LabelText>Should achieve before</LabelText>
        <HStack alignItems="center" gap={8}>
          <ExpandableSelector
            style={{ minWidth: 80 }}
            options={goalDeadlineTypes}
            value={deadlineType}
            onChange={setDeadlineType}
            renderOption={capitalizeFirstLetter}
            getOptionKey={(option) => option}
          />
          <Match
            value={deadlineType}
            date={() => (
              <DayInput
                min={toDay(getMinDeadline())}
                max={toDay(getMaxDeadline())}
                value={stringToDay(guardedValue as string)}
                onChange={(value) => onChange(dayToString(value))}
              />
            )}
            age={() =>
              dob ? (
                <AgeInput value={guardedValue as number} onChange={onChange} />
              ) : (
                <SetDobPromptButton />
              )
            }
          />
        </HStack>
      </InputContainer>

      {guardedValue && (
        <Text size={14} as="div" color="contrast">
          ~{' '}
          {formatGoalTimeLeft(
            getGoalDeadlineTimestamp({ value: guardedValue, dob }),
          )}
        </Text>
      )}
    </Container>
  )
}

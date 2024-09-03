import { HStack, VStack } from '@lib/ui/css/stack'
import { InputProps } from '@lib/ui/props'
import styled from 'styled-components'
import { addYears } from 'date-fns'
import { DayInput } from '@lib/ui/time/day/DayInput'
import { dayToString, stringToDay, toDay } from '@lib/utils/time/Day'
import {
  goalDeadlineName,
  GoalDeadlineType,
  goalDeadlineTypes,
} from '@increaser/entities/Goal'
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
import { without } from '@lib/utils/array/without'

const Container = styled(VStack)`
  gap: 20px;
`

const getMinDeadline = () => Date.now()
const getMaxDeadline = () => addYears(Date.now(), 50).getTime()

type GoalDeadlineInputProps = InputProps<string | number | null> & {
  isRequired?: boolean
}

export const GoalDeadlineInput = ({
  value,
  onChange,
  isRequired,
}: GoalDeadlineInputProps) => {
  const { dob } = useAssertUserState()
  const [deadlineType, setDeadlineType] = useState<GoalDeadlineType>(() => {
    if (typeof value === 'string') {
      return 'date'
    }

    if (typeof value === 'number' || isRequired) {
      return 'age'
    }

    return 'none'
  })

  useEffect(() => {
    if (isRequired && deadlineType === 'none') {
      setDeadlineType('age')
    }
  }, [deadlineType, isRequired])

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

    if (deadlineType === 'none' && value !== null) {
      return null
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
            options={
              isRequired
                ? without(goalDeadlineTypes, 'none')
                : goalDeadlineTypes
            }
            value={deadlineType}
            onChange={setDeadlineType}
            renderOption={capitalizeFirstLetter}
            getOptionKey={(option) => goalDeadlineName[option]}
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
            none={() => null}
          />
        </HStack>
      </InputContainer>

      {guardedValue && (
        <Text size={14} as="div" color="contrast">
          ~{' '}
          {formatGoalTimeLeft(
            getGoalDeadlineTimestamp({ deadlineAt: guardedValue, dob }),
          )}
        </Text>
      )}
    </Container>
  )
}

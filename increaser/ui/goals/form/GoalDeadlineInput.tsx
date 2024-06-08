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
import { DobForm } from './DobForm'
import { AgeInput } from './AgeInput'
import { formatGoalTimeLeft } from '@increaser/entities-utils/goal/formatGoalTimeLeft'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { Text } from '@lib/ui/text'
import { DeadlineInputContainer } from './DeadlineInputContainer'
import { LabeledValue } from '@lib/ui/text/LabeledValue'

const Container = styled(VStack)`
  gap: 40px;
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

    return 'date'
  })

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
      <HStack
        alignItems="center"
        fullWidth
        gap={20}
        justifyContent="space-between"
      >
        <Text color="contrast">Select deadline</Text>
        <RadioInput
          minOptionHeight={40}
          options={goalDeadlineTypes}
          value={deadlineType}
          onChange={setDeadlineType}
          renderOption={capitalizeFirstLetter}
        />
      </HStack>
      <VStack gap={20}>
        <Match
          value={deadlineType}
          date={() => (
            <DeadlineInputContainer>
              <DayInput
                min={toDay(getMinDeadline())}
                max={toDay(getMaxDeadline())}
                value={stringToDay(guardedValue as string)}
                onChange={(value) => onChange(dayToString(value))}
              />
            </DeadlineInputContainer>
          )}
          age={() =>
            !dob || isEditingDob ? (
              <DobForm
                onFinish={() => {
                  setIsEditingDob(false)
                }}
              />
            ) : (
              <HStack fullWidth justifyContent="space-between">
                <AgeInput value={guardedValue as number} onChange={onChange} />
                <EditDobPrompt onClick={() => setIsEditingDob(true)} />
              </HStack>
            )
          }
        />
        <Text size={14} as="div" color="contrast">
          {guardedValue && !isEditingDob && (
            <LabeledValue labelColor="supporting" name="Time Remaining">
              ~{' '}
              {formatGoalTimeLeft(
                getGoalDeadlineTimestamp({ value: guardedValue, dob }),
              )}
            </LabeledValue>
          )}
        </Text>
      </VStack>
    </Container>
  )
}

import { HStack } from '@lib/ui/css/stack'
import { InputProps } from '@lib/ui/props'
import styled from 'styled-components'
import { addYears } from 'date-fns'
import { dayToString, toDay } from '@lib/utils/time/Day'
import {
  goalDeadlineName,
  GoalDeadlineType,
  goalDeadlineTypes,
} from '@increaser/entities/Goal'
import { useEffect, useMemo, useState } from 'react'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { useAssertUserState } from '../../../user/UserStateContext'
import { Match } from '@lib/ui/base/Match'
import { getUserAgeAt } from '@increaser/entities-utils/user/getUserAgeAt'
import { GoalDeadlineAgeInput } from './GoalDeadlineAgeInput'
import { formatGoalTimeLeft } from '@increaser/entities-utils/goal/formatGoalTimeLeft'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { Text } from '@lib/ui/text'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { SetDobPromptButton } from '../../dob/SetDobPromptButton'
import { without } from '@lib/utils/array/without'
import { GoalDeadlineDateInput } from './GoalDeadlineDateInput'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { ArrowRightIcon } from '@lib/ui/icons/ArrowRightIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'

type GoalDeadlineInputProps = InputProps<string | number | null> & {
  isRequired?: boolean
}

const IconContainer = styled(IconWrapper)`
  color: ${({ theme }) =>
    theme.colors.foreground.getVariant({ l: () => 48 }).toCssValue()};
`
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
    <InputContainer style={{ gap: 8 }} as="div">
      <LabelText>Deadline</LabelText>
      <HStackSeparatedBy
        separator={
          <IconContainer>
            <ArrowRightIcon />
          </IconContainer>
        }
        fullWidth
        alignItems="center"
        wrap="wrap"
        gap={12}
      >
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
              <GoalDeadlineDateInput
                value={guardedValue as string}
                onChange={onChange}
              />
            )}
            age={() =>
              dob ? (
                <GoalDeadlineAgeInput
                  value={guardedValue as number}
                  onChange={onChange}
                />
              ) : (
                <SetDobPromptButton />
              )
            }
            none={() => null}
          />
        </HStack>
        {guardedValue && (
          <Text size={14} as="div">
            {formatGoalTimeLeft(
              getGoalDeadlineTimestamp({ deadlineAt: guardedValue, dob }),
            )}
          </Text>
        )}
      </HStackSeparatedBy>
    </InputContainer>
  )
}

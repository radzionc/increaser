import { hStack, vStack } from '@lib/ui/css/stack'
import { InputProps } from '@lib/ui/props'
import { addYears } from 'date-fns'
import { dayToString, toDay } from '@lib/utils/time/Day'
import {
  goalDeadlineName,
  GoalDeadlineType,
  goalDeadlineTypes,
} from '@increaser/entities/Goal'
import { useEffect, useMemo, useState } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { Match } from '@lib/ui/base/Match'
import { getUserAgeAt } from '@increaser/entities-utils/user/getUserAgeAt'
import { GoalDeadlineAgeInput } from './GoalDeadlineAgeInput'
import { formatGoalTimeLeft } from '@increaser/entities-utils/goal/formatGoalTimeLeft'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { Text } from '@lib/ui/text'
import { SetDobPromptButton } from '../../dob/SetDobPromptButton'
import { without } from '@lib/utils/array/without'
import { GoalDeadlineDateInput } from './GoalDeadlineDateInput'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled from 'styled-components'
import { panelFormConfig } from '../../../form/panel/config'
import { Switch } from '@lib/ui/inputs/Switch'

type GoalDeadlineInputProps = InputProps<string | number | null> & {
  isRequired?: boolean
}

const Container = styled.div`
  padding: 0;

  min-height: ${toSizeUnit(panelFormConfig.sectionMinHeight)};

  > * {
    &:first-child {
      ${horizontalPadding(panelDefaultPadding)};
    }

    &:only-child {
      flex: 1;
    }
  }

  ${hStack({ alignItems: 'stretch' })}
`

const TimeLeft = styled.div`
  ${vStack({
    justifyContent: 'center',
  })}
  justify-self: flex-end;
  padding-left: ${toSizeUnit(panelDefaultPadding)};
`

export const GoalDeadlineInput = ({
  value,
  onChange,
}: GoalDeadlineInputProps) => {
  const { dob } = useUser()
  const [deadlineType, setDeadlineType] = useState<GoalDeadlineType>(() => {
    if (typeof value === 'string') {
      return 'date'
    }

    if (typeof value === 'number') {
      return 'age'
    }

    return 'none'
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

  const hasDeadline = deadlineType !== 'none'

  return (
    <Container>
      <Switch
        size="s"
        label="Deadline"
        value={hasDeadline}
        onChange={(value) => setDeadlineType(value ? 'date' : 'none')}
      />
      {hasDeadline && (
        <HStackSeparatedBy
          alignItems="center"
          gap={8}
          separator={<Text color="shy">of</Text>}
        >
          <ExpandableSelector
            showToggle={false}
            options={without(goalDeadlineTypes, 'none')}
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
          />
        </HStackSeparatedBy>
      )}

      {guardedValue && (
        <TimeLeft>
          <Text color="primary" size={14}>
            {formatGoalTimeLeft(
              getGoalDeadlineTimestamp({ deadlineAt: guardedValue, dob }),
            )}
          </Text>
        </TimeLeft>
      )}
    </Container>
  )
}

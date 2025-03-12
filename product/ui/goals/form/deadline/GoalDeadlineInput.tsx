import { Match } from '@lib/ui/base/Match'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { vStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Switch } from '@lib/ui/inputs/Switch'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { without } from '@lib/utils/array/without'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { dayToString, toDay } from '@lib/utils/time/Day'
import {
  goalDeadlineName,
  GoalDeadlineType,
  goalDeadlineTypes,
} from '@product/entities/Goal'
import { formatGoalTimeLeft } from '@product/entities-utils/goal/formatGoalTimeLeft'
import { getGoalDeadlineTimestamp } from '@product/entities-utils/goal/getGoalDeadlineTimestamp'
import { getUserAgeAt } from '@product/entities-utils/user/getUserAgeAt'
import { useUser } from '@product/ui/user/state/user'
import { addYears } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { PanelFormSwitchPrefixedSection } from '../../../form/panel/PanelFormSwitchPrefixedSection'
import { SetDobPromptButton } from '../../dob/SetDobPromptButton'

import { GoalDeadlineAgeInput } from './GoalDeadlineAgeInput'
import { GoalDeadlineDateInput } from './GoalDeadlineDateInput'

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
}: InputProps<string | number | null>) => {
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
    <PanelFormSwitchPrefixedSection>
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
    </PanelFormSwitchPrefixedSection>
  )
}

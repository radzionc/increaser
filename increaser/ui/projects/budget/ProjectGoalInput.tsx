import { VStack } from '@lib/ui/css/stack'
import {
  ProjectGoal,
  goalOptionName,
  projectGoals,
} from '@increaser/entities/Project'
import { RadioInput } from '@lib/ui/inputs/RadioInput'
import { pluralize } from '@lib/utils/pluralize'
import { Text } from '@lib/ui/text'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { InputProps } from '@lib/ui/props'
import { Switch } from '@lib/ui/inputs/Switch'

type ProjectGoalInputProps = InputProps<ProjectGoal | null> & {
  hours: number
}

export const ProjectGoalInput = ({
  value,
  onChange,
  hours,
}: ProjectGoalInputProps) => {
  return (
    <VStack gap={20}>
      <Switch
        size="s"
        onChange={() => onChange(value ? null : 'doMore')}
        value={value !== null}
        label={`Set a goal ${value ? 'to work' : '...'}`}
      />
      {value !== null && (
        <>
          <RadioInput
            options={projectGoals}
            renderOption={(goal) => capitalizeFirstLetter(goalOptionName[goal])}
            value={value}
            onChange={(goal) => onChange(goal)}
          />
          <Text color="regular" size={14}>
            <Text as="span" weight="600" color="contrast">
              {capitalizeFirstLetter(goalOptionName[value])}
            </Text>{' '}
            {pluralize(hours, 'hour')} per week
          </Text>
        </>
      )}
    </VStack>
  )
}

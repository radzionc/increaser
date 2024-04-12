import { VStack } from '@lib/ui/layout/Stack'
import {
  ProjectGoal,
  goalOptionName,
  projectGoals,
} from '@increaser/entities/Project'
import { RadioInput } from '@lib/ui/inputs/RadioInput'
import { pluralize } from '@lib/utils/pluralize'
import { MinimalisticSwitch } from '@lib/ui/inputs/Switch/MinimalisticSwitch'
import { Text } from '@lib/ui/text'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { InputProps } from '@lib/ui/props'
import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'

type ProjectGoalInputProps = InputProps<ProjectGoal | null> & {
  project: EnhancedProject
  hours: number
}

export const ProjectGoalInput = ({
  value,
  onChange,
  project,
  hours,
}: ProjectGoalInputProps) => {
  return (
    <VStack gap={20}>
      <MinimalisticSwitch
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
            <Text as="span" weight="bold" color="contrast">
              {capitalizeFirstLetter(goalOptionName[value])}
            </Text>{' '}
            {pluralize(hours, 'hour')} of {project.name} per week
          </Text>
        </>
      )}
    </VStack>
  )
}

import { VStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { useCallback, useState } from 'react'
import { Fields } from '@lib/ui/inputs/Fields'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { HoursInput } from '@increaser/ui/weeklyGoals/HoursInput'
import { Field } from '@lib/ui/inputs/Field'
import { useUpdateProjectMutation } from '../api/useUpdateProjectMutation'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import {
  ProjectGoal,
  ProjectWorkingDays,
  projectGoals,
  projectWorkingDays,
} from '@increaser/entities/Project'
import { RadioInput } from '@lib/ui/inputs/RadioInput'
import { pluralize } from '@lib/utils/pluralize'
import { MinimalisticSwitch } from '@lib/ui/inputs/Switch/MinimalisticSwitch'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { WithHint } from '@lib/ui/tooltips/WithHint'
import { Text } from '@lib/ui/text'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { FinishableComponentProps } from '@lib/ui/props'
import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { Modal } from '@lib/ui/modal'
import { useFreeHours } from './hooks/useFreeHours'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'

type WeeklyGoalShape = {
  hours: number | null
  goal: ProjectGoal | null
  workingDays: ProjectWorkingDays
  hasBudget: boolean
}

const goalOptionName: Record<ProjectGoal, string> = {
  doMore: 'at least',
  doLess: 'no more than',
}

const workingDayOptionName: Record<ProjectWorkingDays, string> = {
  everyday: 'Every day',
  workdays: 'Monday to Friday',
}

type ManageProjectBudgetOverlayProps = FinishableComponentProps & {
  project: EnhancedProject
}

export const ManageProjectBudgetOverlay = ({
  onFinish,
  project,
}: ManageProjectBudgetOverlayProps) => {
  const getInitialValue = useCallback(
    (): WeeklyGoalShape => ({
      hours: convertDuration(project.allocatedMinutesPerWeek, 'min', 'h'),
      goal: project.goal ?? null,
      workingDays: project.workingDays,
      hasBudget: project.allocatedMinutesPerWeek > 0,
    }),
    [project.allocatedMinutesPerWeek, project.goal, project.workingDays],
  )

  const [value, setValue] = useState<WeeklyGoalShape>(getInitialValue)

  const freeHours =
    useFreeHours() +
    convertDuration(project.allocatedMinutesPerWeek, 'min', 'h')

  const { mutate: updateProject } = useUpdateProjectMutation()

  return (
    <Modal
      title={`${project.name} budget`}
      footer={
        <UniformColumnGrid gap={20}>
          <Button
            onClick={() => {
              setValue(getInitialValue())
            }}
            kind="secondary"
            size="l"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              updateProject({
                id: project.id,
                fields: {
                  allocatedMinutesPerWeek: convertDuration(
                    value.hours ?? 0,
                    'h',
                    'min',
                  ),
                  goal: value.goal,
                  workingDays: value.workingDays,
                },
              })

              onFinish()
            }}
            size="l"
          >
            Submit
          </Button>
        </UniformColumnGrid>
      }
      onClose={onFinish}
    >
      <SeparatedByLine gap={20}>
        <VStack gap={20}>
          <MinimalisticSwitch
            onChange={() => {
              if (value.hasBudget) {
                setValue((prev) => ({
                  ...prev,
                  hasBudget: false,
                  hours: null,
                  goal: null,
                }))
              } else {
                setValue((prev) => ({
                  ...prev,
                  hasBudget: true,
                }))
              }
            }}
            value={value.hasBudget}
            label={`Has budget`}
          />
          {value.hasBudget && (
            <Fields>
              <Field>
                <HoursInput
                  autoFocus
                  label={
                    <WithHint hint="Select the number of hours you aim to spend on this project each week.">
                      Budget
                    </WithHint>
                  }
                  placeholder="Enter hours"
                  max={freeHours}
                  value={value.hours}
                  onChange={(hours) => setValue((prev) => ({ ...prev, hours }))}
                />
              </Field>
              <Field>
                <InputContainer>
                  <LabelText>Working days</LabelText>
                  <RadioInput
                    options={projectWorkingDays}
                    renderOption={(option) => workingDayOptionName[option]}
                    value={value.workingDays}
                    onChange={(workingDays) =>
                      setValue((prev) => ({ ...prev, workingDays }))
                    }
                  />
                </InputContainer>
              </Field>
            </Fields>
          )}
        </VStack>
        {value.hours && (
          <VStack gap={20}>
            <MinimalisticSwitch
              onChange={() =>
                setValue((prev) => ({
                  ...prev,
                  goal: prev.goal === null ? 'doMore' : null,
                }))
              }
              value={value.goal !== null}
              label={`Set a goal ${value.goal ? 'to work' : '...'}`}
            />
            {value.goal !== null && (
              <>
                <RadioInput
                  options={projectGoals}
                  renderOption={(goal) =>
                    capitalizeFirstLetter(goalOptionName[goal])
                  }
                  value={value.goal}
                  onChange={(goal) => setValue((prev) => ({ ...prev, goal }))}
                />
                <Text color="regular" size={14}>
                  <Text as="span" weight="bold" color="contrast">
                    {capitalizeFirstLetter(goalOptionName[value.goal])}
                  </Text>{' '}
                  {pluralize(shouldBePresent(value.hours), 'hour')} of{' '}
                  {project.name} per week
                </Text>
              </>
            )}
          </VStack>
        )}
      </SeparatedByLine>
    </Modal>
  )
}

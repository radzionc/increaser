import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { Panel } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'
import { preventDefault } from '@lib/ui/utils/preventDefault'
import { Button } from '@lib/ui/buttons/Button'
import { useCallback, useMemo, useState } from 'react'
import { Fields } from '@lib/ui/inputs/Fields'
import { ProjectInput } from '@increaser/ui/projects/ProjectInput'
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
import { useFreeHours } from './hooks/useFreeHours'

type WeeklyGoalShape = {
  projectId: string | null
  hours: number | null
  goal: ProjectGoal | null
  workingDays: ProjectWorkingDays
}

const goalOptionName: Record<ProjectGoal, string> = {
  doMore: 'at least',
  doLess: 'no more than',
}

const workingDayOptionName: Record<ProjectWorkingDays, string> = {
  everyday: 'Every day',
  workdays: 'Monday to Friday',
}

export const AddBudgetForm = ({ onFinish }: FinishableComponentProps) => {
  const { activeProjects, projectsRecord } = useProjects()

  const options = useMemo(
    () => activeProjects.filter((p) => !p.allocatedMinutesPerWeek),
    [activeProjects],
  )

  const getInitialValue = useCallback(
    (): WeeklyGoalShape => ({
      projectId: options[0]?.id ?? null,
      hours: null,
      goal: null,
      workingDays: 'everyday',
    }),
    [options],
  )

  const [value, setValue] = useState<WeeklyGoalShape>(getInitialValue)

  const freeHours = useFreeHours()

  const { mutate: updateProject } = useUpdateProjectMutation()

  return (
    <InputContainer style={{ gap: 8 }} as="div">
      <LabelText>Add project budget</LabelText>
      <Panel
        as="form"
        onSubmit={preventDefault(() => {
          if (!value.projectId) return

          updateProject({
            id: shouldBePresent(value.projectId),
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
        })}
        withSections
        style={value.hours ? undefined : { background: 'transparent' }}
        kind="secondary"
      >
        <Fields>
          <Field>
            <ProjectInput
              label="Project"
              options={options}
              value={value.projectId ? projectsRecord[value.projectId] : null}
              onChange={(project) =>
                setValue((prev) => ({
                  ...prev,
                  projectId: project?.id ?? null,
                }))
              }
            />
          </Field>

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

        {value.projectId && value.hours && (
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
                  {projectsRecord[shouldBePresent(value.projectId)].name} per
                  week
                </Text>
              </>
            )}
          </VStack>
        )}
        {value.projectId && (
          <UniformColumnGrid gap={20}>
            <Button onClick={onFinish} kind="secondary" size="l">
              Cancel
            </Button>
            <Button size="l">Submit</Button>
          </UniformColumnGrid>
        )}
      </Panel>
    </InputContainer>
  )
}

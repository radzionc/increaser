import { VStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { useCallback, useMemo, useState } from 'react'
import { Fields } from '@lib/ui/inputs/Fields'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Field } from '@lib/ui/inputs/Field'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import {
  Project,
  ProjectGoal,
  ProjectWorkingDays,
} from '@increaser/entities/Project'
import { Text } from '@lib/ui/text'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { FinishableComponentProps } from '@lib/ui/props'
import { useFreeHours } from './hooks/useFreeHours'
import { Panel } from '@lib/ui/panel/Panel'
import { preventDefault } from '@lib/ui/utils/preventDefault'
import { BudgetHoursInput } from './BudgetHoursInput'
import { WorkdingDaysInput } from '@increaser/ui/projects/budget/WorkingDaysInput'
import { ProjectGoalInput } from './ProjectGoalInput'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'

type WeeklyGoalShape = {
  hours: number | null
  goal: ProjectGoal | null
  workingDays: ProjectWorkingDays
}

type ManageProjectBudgetOverlayProps = FinishableComponentProps & {
  project: Project
}

export const ManageProjectBudget = ({
  onFinish,
  project,
}: ManageProjectBudgetOverlayProps) => {
  const getInitialValue = useCallback(
    (): WeeklyGoalShape => ({
      hours: convertDuration(project.allocatedMinutesPerWeek, 'min', 'h'),
      goal: project.goal ?? null,
      workingDays: project.workingDays,
    }),
    [project.allocatedMinutesPerWeek, project.goal, project.workingDays],
  )

  const [value, setValue] = useState<WeeklyGoalShape>(getInitialValue)

  const freeHours =
    useFreeHours() +
    convertDuration(project.allocatedMinutesPerWeek, 'min', 'h')

  const { mutate: updateProject } = useUpdateUserEntityMutation('project')

  const errorMessage = useMemo(() => {
    if (!value.hours) return 'Please enter a budget'
  }, [value.hours])

  return (
    <Panel
      as="form"
      onSubmit={preventDefault(() => {
        updateProject({
          id: project.id,
          fields: {
            allocatedMinutesPerWeek: convertDuration(
              shouldBePresent(value.hours),
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
      <VStack gap={20}>
        <Text weight="500" color="contrast">
          {project.emoji} {project.name}
        </Text>
        <Fields>
          <Field>
            <BudgetHoursInput
              max={freeHours}
              value={value.hours}
              onChange={(hours) => setValue((prev) => ({ ...prev, hours }))}
            />
          </Field>
          <Field>
            <WorkdingDaysInput
              value={value.workingDays}
              onChange={(workingDays) =>
                setValue((prev) => ({ ...prev, workingDays }))
              }
            />
          </Field>
        </Fields>
      </VStack>
      {value.hours && (
        <ProjectGoalInput
          value={value.goal}
          onChange={(goal) => setValue((prev) => ({ ...prev, goal }))}
          project={project}
          hours={value.hours}
        />
      )}
      <UniformColumnGrid gap={20}>
        <Button
          onClick={() => {
            onFinish()
          }}
          type="button"
          kind="secondary"
          size="l"
        >
          Cancel
        </Button>
        <Button isDisabled={errorMessage} size="l">
          Submit
        </Button>
      </UniformColumnGrid>
    </Panel>
  )
}

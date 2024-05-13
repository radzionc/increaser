import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { Panel } from '@lib/ui/panel/Panel'
import { preventDefault } from '@lib/ui/utils/preventDefault'
import { Button } from '@lib/ui/buttons/Button'
import { useCallback, useMemo, useState } from 'react'
import { Fields } from '@lib/ui/inputs/Fields'
import { ProjectInput } from '@increaser/ui/projects/ProjectInput'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Field } from '@lib/ui/inputs/Field'
import { useUpdateProjectMutation } from '@increaser/ui/projects/api/useUpdateProjectMutation'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { ProjectGoal, ProjectWorkingDays } from '@increaser/entities/Project'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { FinishableComponentProps } from '@lib/ui/props'
import { useFreeHours } from './hooks/useFreeHours'
import { BudgetHoursInput } from './BudgetHoursInput'
import { WorkdingDaysInput } from '@increaser/ui/projects/budget/WorkingDaysInput'
import { ProjectGoalInput } from './ProjectGoalInput'

type WeeklyGoalShape = {
  projectId: string | null
  hours: number | null
  goal: ProjectGoal | null
  workingDays: ProjectWorkingDays
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

  const errorMessage = useMemo(() => {
    if (!value.projectId) return 'Please select a project'
    if (!value.hours) return 'Please enter a budget'
  }, [value.projectId, value.hours])

  const freeHours = useFreeHours()

  const { mutate: updateProject } = useUpdateProjectMutation()

  return (
    <InputContainer style={{ gap: 8 }} as="div">
      <LabelText>Add project budget</LabelText>
      <Panel
        as="form"
        onSubmit={preventDefault(() => {
          if (errorMessage) return

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

        {value.projectId && value.hours && (
          <ProjectGoalInput
            value={value.goal}
            onChange={(goal) => setValue((prev) => ({ ...prev, goal }))}
            project={projectsRecord[value.projectId]}
            hours={value.hours}
          />
        )}
        <UniformColumnGrid gap={20}>
          <Button type="button" onClick={onFinish} kind="secondary" size="l">
            Cancel
          </Button>
          <Button isDisabled={errorMessage} size="l">
            Submit
          </Button>
        </UniformColumnGrid>
      </Panel>
    </InputContainer>
  )
}

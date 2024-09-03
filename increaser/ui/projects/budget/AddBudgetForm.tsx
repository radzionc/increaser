import { Panel } from '@lib/ui/css/panel'
import { preventDefault } from '@lib/ui/utils/preventDefault'
import { Button } from '@lib/ui/buttons/Button'
import { useCallback, useMemo, useState } from 'react'
import { Fields } from '@lib/ui/inputs/Fields'
import { ProjectInput } from '@increaser/ui/projects/ProjectInput'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Field } from '@lib/ui/inputs/Field'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { ProjectGoal, ProjectWorkingDays } from '@increaser/entities/Project'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { UniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import { FinishableComponentProps } from '@lib/ui/props'
import { useFreeHours } from './hooks/useFreeHours'
import { BudgetHoursInput } from './BudgetHoursInput'
import { WorkdingDaysInput } from '@increaser/ui/projects/budget/WorkingDaysInput'
import { ProjectGoalInput } from './ProjectGoalInput'
import { useActiveProjects } from '../hooks/useActiveProjects'
import { useAssertUserState } from '../../user/UserStateContext'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'

type WeeklyGoalShape = {
  projectId: string | null
  hours: number | null
  goal: ProjectGoal | null
  workingDays: ProjectWorkingDays
}

export const AddBudgetForm = ({ onFinish }: FinishableComponentProps) => {
  const activeProjects = useActiveProjects()
  const { projects } = useAssertUserState()

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

  const { mutate: updateProject } = useUpdateUserEntityMutation('project')

  return (
    <InputContainer style={{ gap: 8 }} as="div">
      <LabelText>Add a project budget</LabelText>
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
              value={value.projectId ? projects[value.projectId] : null}
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
            project={projects[value.projectId]}
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

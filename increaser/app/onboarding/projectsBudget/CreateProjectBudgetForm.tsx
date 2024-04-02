import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { Panel } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'
import { preventDefault } from '@lib/ui/utils/preventDefault'
import { Button } from '@lib/ui/buttons/Button'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { useCallback, useEffect, useState } from 'react'
import { Fields } from '@lib/ui/inputs/Fields'
import { ProjectInput } from '@increaser/ui/projects/ProjectInput'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { sum } from '@lib/utils/array/sum'
import { HoursInput } from '@increaser/ui/weeklyGoals/HoursInput'
import { Field } from '@lib/ui/inputs/Field'
import { useUpdateProjectMutation } from '../../projects/api/useUpdateProjectMutation'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { findBy } from '@lib/utils/array/findBy'
import {
  ProjectGoal,
  ProjectWorkingDays,
  projectGoals,
  projectWorkingDays,
} from '@increaser/entities/Project'
import { RadioInput } from '@lib/ui/inputs/RadioInput'
import { match } from '@lib/utils/match'
import { pluralize } from '@lib/utils/pluralize'
import { Switch } from '@lib/ui/inputs/Switch/Switch'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'

type WeeklyGoalShape = {
  projectId: string | null
  hours: number | null
  goal: ProjectGoal | null
  workingDays: ProjectWorkingDays
}

const workingDayOptionName: Record<ProjectWorkingDays, string> = {
  everyday: 'Every day',
  workdays: 'Monday to Friday',
}

export const CreateProjectBudgetForm = () => {
  const { activeProjects } = useProjects()
  const projectsWithoutGoal = activeProjects.filter(
    (project) => !project.allocatedMinutesPerWeek,
  )

  const { weekTimeAllocation } = useAssertUserState()
  const totalWorkHours = convertDuration(sum(weekTimeAllocation), 'min', 'h')
  const allocatedHours = convertDuration(
    sum(activeProjects.map((p) => p.allocatedMinutesPerWeek)),
    'min',
    'h',
  )
  const freeHours = totalWorkHours - allocatedHours

  const getInitialValue = useCallback(
    (): WeeklyGoalShape => ({
      projectId: isEmpty(projectsWithoutGoal)
        ? null
        : projectsWithoutGoal[0].id,
      hours: null,
      goal: null,
      workingDays: 'everyday',
    }),
    [projectsWithoutGoal],
  )

  const [value, setValue] = useState<WeeklyGoalShape>(getInitialValue)

  useEffect(() => {
    if (!value.projectId) return

    const project = findBy(activeProjects, 'id', value.projectId)
    if (!project || project.allocatedMinutesPerWeek) {
      setValue(getInitialValue())
    }
  }, [activeProjects, getInitialValue, value.projectId])

  const { mutate: updateProject } = useUpdateProjectMutation()

  const isValid = value.projectId !== null && value.hours !== null

  return (
    <Panel kind="secondary" style={{ width: '100%' }}>
      <VStack
        gap={28}
        as="form"
        onSubmit={preventDefault(() => {
          if (!isValid) return

          updateProject({
            id: shouldBePresent(value.projectId),
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
        })}
      >
        <Fields>
          <Field>
            <ProjectInput
              label="Project"
              options={projectsWithoutGoal}
              value={
                projectsWithoutGoal.find(
                  (project) => project.id === value.projectId,
                ) ?? null
              }
              onChange={(project) => {
                setValue((prev) => ({
                  ...prev,
                  projectId: project?.id ?? null,
                }))
              }}
            />
          </Field>
          <Field>
            <HoursInput
              autoFocus
              label="Budget"
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
                style={{
                  flexDirection: 'column',
                  gap: 8,
                }}
                options={projectWorkingDays}
                renderOption={(option) => workingDayOptionName[option]}
                value={value.workingDays}
                onChange={(workingDays) =>
                  setValue((prev) => ({ ...prev, workingDays }))
                }
              />
            </InputContainer>
          </Field>
          {value.hours !== null && (
            <VStack gap={12}>
              <Switch
                onChange={() =>
                  setValue((prev) => ({
                    ...prev,
                    goal: prev.goal === null ? 'doMore' : null,
                  }))
                }
                value={value.goal !== null}
                label={`Set a goal to work ...`}
              />
              {value.goal !== null && (
                <RadioInput
                  style={{
                    flexDirection: 'column',
                    gap: 8,
                  }}
                  options={projectGoals}
                  renderOption={(goal) =>
                    match(goal, {
                      doMore: () =>
                        `At least ${pluralize(
                          shouldBePresent(value.hours),
                          'hour',
                        )} / week`,
                      doLess: () =>
                        `No more than ${pluralize(
                          shouldBePresent(value.hours),
                          'hour',
                        )} / week`,
                    })
                  }
                  value={value.goal}
                  onChange={(goal) => setValue((prev) => ({ ...prev, goal }))}
                />
              )}
            </VStack>
          )}
        </Fields>

        <Button isDisabled={!isValid} kind="secondary" size="l">
          Create
        </Button>
      </VStack>
    </Panel>
  )
}

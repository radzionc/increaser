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

type WeeklyGoalShape = {
  projectId: string | null
  hours: number | null
}

export const CreateWeeklyGoalForm = () => {
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
    () => ({
      projectId: isEmpty(projectsWithoutGoal)
        ? null
        : projectsWithoutGoal[0].id,
      hours: null,
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
              label="Weekly goal"
              placeholder="Enter hours"
              max={freeHours}
              value={value.hours}
              onChange={(hours) => setValue((prev) => ({ ...prev, hours }))}
            />
          </Field>
        </Fields>

        <Button isDisabled={!isValid} kind="secondary" size="l">
          Create
        </Button>
      </VStack>
    </Panel>
  )
}

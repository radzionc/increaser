import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
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
import { pluralize } from '@lib/utils/pluralize'
import { MinimalisticSwitch } from '@lib/ui/inputs/Switch/MinimalisticSwitch'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { WithHint } from '@lib/ui/tooltips/WithHint'
import { Text } from '@lib/ui/text'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { TargetIcon } from '@lib/ui/icons/TargetIcon'
import { match } from '@lib/utils/match'
import { useTheme } from 'styled-components'

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

export const CreateProjectBudgetForm = () => {
  const { activeProjects, projectsRecord } = useProjects()
  const projectsWithoutGoal = activeProjects.filter(
    (project) => !project.allocatedMinutesPerWeek,
  )

  const { colors } = useTheme()

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
    <Panel
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
      withSections
      kind="secondary"
      style={{ width: '100%' }}
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
      {value.hours !== null && value.projectId !== null && (
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
              <HStack alignItems="center" gap={8}>
                <IconWrapper
                  style={{
                    color: match(value.goal, {
                      doMore: () => colors.success,
                      doLess: () => colors.alert,
                    }).toCssValue(),
                  }}
                >
                  <TargetIcon />
                </IconWrapper>
                <Text color="regular" size={14}>
                  <Text as="span" weight="bold" color="contrast">
                    {capitalizeFirstLetter(goalOptionName[value.goal])}
                  </Text>{' '}
                  {pluralize(value.hours, 'hour')} of{' '}
                  {projectsRecord[value.projectId].name} per week
                </Text>
              </HStack>
            </>
          )}
        </VStack>
      )}
      <VStack>
        <Button isDisabled={!isValid} size="l">
          Create
        </Button>
      </VStack>
    </Panel>
  )
}

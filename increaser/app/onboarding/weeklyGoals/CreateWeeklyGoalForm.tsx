import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { Panel } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'
import { preventDefault } from '@lib/ui/utils/preventDefault'
import { Button } from '@lib/ui/buttons/Button'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { useState } from 'react'
import { Fields } from '@lib/ui/inputs/Fields'
import { ProjectInput } from '@increaser/ui/projects/ProjectInput'

type WeeklyGoalShape = {
  projectId: string | null
  hours: number | null
}

export const CreateWeeklyGoalForm = () => {
  const { activeProjects } = useProjects()
  const projectsWithoutGoal = activeProjects.filter(
    (project) => !project.allocatedMinutesPerWeek,
  )

  const [value, setValue] = useState<WeeklyGoalShape>({
    projectId: isEmpty(projectsWithoutGoal) ? null : projectsWithoutGoal[0].id,
    hours: null,
  })

  return (
    <InputContainer style={{ gap: 8 }} as="div">
      <LabelText size={16}>New weekly goal</LabelText>
      <Panel kind="secondary" style={{ width: '100%' }}>
        <VStack
          gap={28}
          as="form"
          onSubmit={preventDefault(() => {
            console.log('here!')
          })}
        >
          <Fields>
            <ProjectInput
              label="Project"
              options={projectsWithoutGoal}
              value={
                projectsWithoutGoal.find(
                  (project) => project.id === value.projectId,
                ) ?? null
              }
              onChange={(project) =>
                setValue((prev) => ({
                  ...prev,
                  projectId: project?.id ?? null,
                }))
              }
            />
          </Fields>

          <Button kind="secondary" size="l">
            Create
          </Button>
        </VStack>
      </Panel>
    </InputContainer>
  )
}

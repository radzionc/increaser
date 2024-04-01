import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { ProjectBudgetItem } from '../../projects/budget/ProjectBudgetItem'
import { CreateProjectBudgetForm } from './CreateProjectBudgetForm'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { sum } from '@lib/utils/array/sum'
import { ProjectsBudgetOverview } from '../../projects/budget/ProjectsBudgetOverview'
import { order } from '@lib/utils/array/order'

export const ProjectsBudgetOnboardingStep = () => {
  const { activeProjects } = useProjects()
  const { weekTimeAllocation } = useAssertUserState()
  const totalMinutesAvailable = sum(weekTimeAllocation)
  const allocatedMinutes = sum(
    activeProjects.map((p) => p.allocatedMinutesPerWeek),
  )

  const projectsWithGoals = activeProjects.filter(
    (project) => project.allocatedMinutesPerWeek,
  )

  return (
    <VStack style={{ maxWidth: 400 }} gap={40}>
      {allocatedMinutes < totalMinutesAvailable ? (
        <InputContainer style={{ gap: 8 }} as="div">
          <LabelText>Add project budget</LabelText>
          <CreateProjectBudgetForm />
        </InputContainer>
      ) : (
        <ShyInfoBlock>You've allocated all your time!</ShyInfoBlock>
      )}
      <VStack gap={20}>
        <ProjectsBudgetOverview />
        <VStack gap={8}>
          {order(
            projectsWithGoals,
            (p) => p.allocatedMinutesPerWeek,
            'desc',
          ).map((value) => (
            <ProjectBudgetItem value={value} key={value.id} />
          ))}
        </VStack>
      </VStack>
    </VStack>
  )
}

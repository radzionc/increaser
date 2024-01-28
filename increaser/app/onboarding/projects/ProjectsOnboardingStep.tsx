import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { OnboardingStepView } from '../OnboardingStepView'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { CreateProjectForm } from './CreateProjectForm'
import { VStack } from '@lib/ui/layout/Stack'
import { ProjectItem } from './ProjectItem'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { Text } from '@lib/ui/text'

export const ProjectsOnboardingStep = () => {
  const { activeProjects } = useProjects()

  return (
    <OnboardingStepView isDisabled={isEmpty(activeProjects)}>
      <VStack gap={40}>
        <Text height="large">
          Begin by adding projects to track various work activities such as
          studying, remote work, freelancing, business, and more. This step is
          essential to effectively monitor and analyze your productivity across
          different types of work.
        </Text>
        <CreateProjectForm />
        {!isEmpty(activeProjects) && (
          <InputContainer as="div" style={{ gap: 8 }}>
            <LabelText size={16}>Your projects</LabelText>
            <UniformColumnGrid
              gap={16}
              minChildrenWidth={200}
              maxChildrenWidth={240}
            >
              {activeProjects.map((value) => (
                <ProjectItem value={value} key={value.id} />
              ))}
            </UniformColumnGrid>
          </InputContainer>
        )}
      </VStack>
    </OnboardingStepView>
  )
}

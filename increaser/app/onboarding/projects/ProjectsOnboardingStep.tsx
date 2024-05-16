import { isEmpty } from '@lib/utils/array/isEmpty'
import { CreateProjectForm } from './CreateProjectForm'
import { VStack } from '@lib/ui/layout/Stack'
import { ProjectItem } from './ProjectItem'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'

export const ProjectsOnboardingStep = () => {
  const activeProjects = useActiveProjects()

  return (
    <VStack style={{ maxWidth: 440 }} gap={40}>
      <CreateProjectForm />
      <InputContainer as="div" style={{ gap: 8 }}>
        <LabelText size={16}>Your projects</LabelText>
        {isEmpty(activeProjects) ? (
          <ShyInfoBlock>Add at least one project to get started.</ShyInfoBlock>
        ) : (
          <UniformColumnGrid gap={16} minChildrenWidth={160}>
            {activeProjects.map((value) => (
              <ProjectItem value={value} key={value.id} />
            ))}
          </UniformColumnGrid>
        )}
      </InputContainer>
    </VStack>
  )
}

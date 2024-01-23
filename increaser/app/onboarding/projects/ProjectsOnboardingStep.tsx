import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { OnboardingStepView } from '../OnboardingStepView'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { ProjectItem } from './Projectitem'

export const ProjectsOnboardingStep = () => {
  const { activeProjects } = useProjects()

  return (
    <OnboardingStepView isDisabled={isEmpty(activeProjects)}>
      {activeProjects.map((project) => (
        <ProjectItem key={project.id} {...project} />
      ))}
    </OnboardingStepView>
  )
}

import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { ProjectPreviousWeeks } from '../ProjectPreviousWeeks'
import { useBudgetedProjects } from '../hooks/useBudgetedProjects'

export const PreviousWeeksProgress = () => {
  const projectsWithGoals = useBudgetedProjects()

  return (
    <>
      {projectsWithGoals.map((project) => (
        <CurrentProjectProvider value={project} key={project.id}>
          <ProjectPreviousWeeks />
        </CurrentProjectProvider>
      ))}
    </>
  )
}

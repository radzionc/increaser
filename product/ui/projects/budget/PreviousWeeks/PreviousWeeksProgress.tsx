import { CurrentProjectProvider } from '@product/ui/projects/CurrentProjectProvider'

import { useBudgetedProjects } from '../hooks/useBudgetedProjects'
import { ProjectPreviousWeeks } from '../ProjectPreviousWeeks'

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

import { Project } from 'projects/Project'
import { sum } from 'shared/utils/sum'

import { ProjectView } from './ProjectView'
import { CurrentProjectProvider } from './ProjectView/CurrentProjectProvider'

const sortProjects = (projects: Project[]) => {
  return [...projects].sort((a, b) => {
    const currentWeekDiff = b.doneMinutesThisWeek - a.doneMinutesThisWeek

    if (currentWeekDiff !== 0) {
      return currentWeekDiff
    }

    const weeksDiff =
      sum(b.weeks.map((week) => week.seconds)) -
      sum(a.weeks.map((week) => week.seconds))

    if (weeksDiff !== 0) {
      return weeksDiff
    }

    return b.total - a.total
  })
}

interface Props {
  projects: Project[]
}

export const ProjectList = ({ projects }: Props) => {
  return (
    <>
      {sortProjects(projects).map((project) => (
        <CurrentProjectProvider key={project.id} value={project}>
          <ProjectView />
        </CurrentProjectProvider>
      ))}
    </>
  )
}

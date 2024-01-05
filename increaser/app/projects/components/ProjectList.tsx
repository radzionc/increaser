import { sum } from '@lib/utils/array/sum'

import { ProjectView } from './ProjectView'
import { CurrentProjectProvider } from './ProjectView/CurrentProjectProvider'
import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'

const sortProjects = (projects: EnhancedProject[]) => {
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
  projects: EnhancedProject[]
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

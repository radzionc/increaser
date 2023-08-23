import { toProject } from 'projects/helpers/toProject'
import { Project, ProjectStatus } from 'projects/Project'
import { createContext, useMemo } from 'react'
import { useCurrentWeekSets } from 'sets/hooks/useCurrentWeekSets'
import { useStartOfWeek } from 'shared/hooks/useStartOfWeek'
import { ComponentWithChildrenProps } from 'shared/props'
import { areSameWeek } from '@increaser/utils/areSameWeek'
import { getRecord } from '@increaser/utils/getRecord'
import { range } from '@increaser/utils/range'
import { splitBy } from '@increaser/utils/splitBy'
import { toWeek } from '@increaser/utils/toWeek'
import { useTheme } from 'styled-components'
import { useAssertUserState } from 'user/state/UserStateContext'
import { MS_IN_WEEK } from 'utils/time'

export const weeksToDisplay = 4

export interface WeekSummaryProject {
  seconds: number
  id: string
}
export interface WeekSummary {
  year: number
  week: number
  projects: WeekSummaryProject[]
}

interface ProjectsState {
  projects: Project[]
  activeProjects: Project[]
  inactiveProjects: Project[]
  allocatedProjects: Project[]
  projectsRecord: Record<string, Project>
  weeks: WeekSummary[]
}

const getProjectSortingNumber = ({
  allocatedMinutesPerWeek,
  doneMinutesThisWeek,
  status,
}: Project) => {
  if (status !== ProjectStatus.Active) return 100000000000
  if (!allocatedMinutesPerWeek && !doneMinutesThisWeek) return 1000000000
  if (!allocatedMinutesPerWeek) return doneMinutesThisWeek

  return doneMinutesThisWeek / allocatedMinutesPerWeek
}

export const ProjectsContext = createContext<ProjectsState | undefined>(
  undefined,
)

export const ProjectsProvider = ({ children }: ComponentWithChildrenProps) => {
  const state = useAssertUserState()

  const sets = useCurrentWeekSets()

  const theme = useTheme()

  const projects = useMemo(
    () =>
      state.projects
        .map((project) => toProject(project, sets, theme))
        .sort(
          (one, another) =>
            getProjectSortingNumber(one) - getProjectSortingNumber(another),
        ),
    [sets, state.projects, theme],
  )

  const [activeProjects, inactiveProjects] = useMemo(
    () => splitBy(projects, ({ status }) => (status === 'ACTIVE' ? 0 : 1)),
    [projects],
  )

  const allocatedProjects = useMemo(
    () =>
      projects.filter(
        ({ allocatedMinutesPerWeek }) => allocatedMinutesPerWeek > 0,
      ),
    [projects],
  )

  const projectsRecord = useMemo(
    () => getRecord(projects, (project) => project.id),
    [projects],
  )

  const startOfWeek = useStartOfWeek()

  const weeks: WeekSummary[] = useMemo(() => {
    return range(weeksToDisplay).map((index) => {
      const week = toWeek(startOfWeek - (weeksToDisplay - index) * MS_IN_WEEK)
      const projectsWithWeek = [] as WeekSummaryProject[]
      projects.forEach((project) => {
        const projectWeek = project.weeks.find((partialWeek) =>
          areSameWeek(partialWeek, week),
        )
        if (projectWeek) {
          projectsWithWeek.push({
            seconds: projectWeek.seconds,
            id: project.id,
          })
        }
      })

      return {
        ...week,
        projects: projectsWithWeek.sort((a, b) => a.seconds - b.seconds),
      }
    })
  }, [projects, startOfWeek])

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        activeProjects,
        inactiveProjects,
        allocatedProjects,
        projectsRecord,
        weeks,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

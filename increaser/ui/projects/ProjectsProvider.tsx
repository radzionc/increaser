import { createContext, useMemo } from 'react'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { areSameWeek } from '@lib/utils/time/areSameWeek'
import { getRecord } from '@lib/utils/record/getRecord'
import { range } from '@lib/utils/array/range'
import { splitBy } from '@lib/utils/array/splitBy'
import { toWeek } from '@lib/utils/time/toWeek'
import { useTheme } from 'styled-components'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { MS_IN_WEEK } from '@lib/utils/time'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { EnhancedProject } from './EnhancedProject'
import { useCurrentWeekSets } from '../sets/hooks/useCurrentWeekSets'
import { enhanceProject } from './utils/enhanceProject'

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
  projects: EnhancedProject[]
  activeProjects: EnhancedProject[]
  inactiveProjects: EnhancedProject[]
  allocatedProjects: EnhancedProject[]
  projectsRecord: Record<string, EnhancedProject>
  weeks: WeekSummary[]
}

const getProjectSortingNumber = ({
  allocatedMinutesPerWeek,
  doneMinutesThisWeek,
  status,
}: EnhancedProject) => {
  if (status !== 'ACTIVE') return 100000000000
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
        .map((project) => enhanceProject(project, sets, theme))
        .sort(
          (one, another) =>
            getProjectSortingNumber(one) - getProjectSortingNumber(another),
        ),
    [sets, state.projects, theme],
  )

  console.log(projects)

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

export const useProjects = createContextHook(ProjectsContext, 'ProjectsContext')

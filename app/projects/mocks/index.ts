import { startOfWeek } from 'date-fns'
import { weeksToDisplay } from 'projects/components/ProjectsProvider'
import { ProjectResponse, ProjectStatus } from 'projects/Project'
import { toWeek } from 'shared/utils/toWeek'
import { MIN_IN_HOUR, MS_IN_WEEK, S_IN_HOUR } from 'utils/time'

const defaultProjectParams = {
  status: ProjectStatus.Active,
  total: 0,
  allocatedMinutesPerWeek: 0,
}

export enum MockProjectId {
  Job = 'job',
  Business = 'business',
  DesignStudy = 'design-study',
  ProgrammingStudy = 'programming-study',
  Content = 'content',
  Music = 'music',
  Planning = 'planning',
  Language = 'spanish',
  Research = 'research',
}

// TODO: move everything to the LandingUserStateProvider
const weekStartedAt = startOfWeek(new Date()).getTime()

export const allocatedMockProjects: ProjectResponse[] = [
  {
    ...defaultProjectParams,
    id: MockProjectId.Job,
    name: 'Remote job',
    color: 0,
    emoji: '👨‍💻',
    total: 620 * S_IN_HOUR,
    months: [],
    allocatedMinutesPerWeek: 22 * MIN_IN_HOUR,
    weeks: [
      {
        ...toWeek(weekStartedAt - weeksToDisplay * MS_IN_WEEK),
        seconds: 24 * S_IN_HOUR,
      },
      {
        ...toWeek(weekStartedAt - (weeksToDisplay - 1) * MS_IN_WEEK),
        seconds: 21 * S_IN_HOUR,
      },
      {
        ...toWeek(weekStartedAt - (weeksToDisplay - 2) * MS_IN_WEEK),
        seconds: 19 * S_IN_HOUR,
      },
      {
        ...toWeek(weekStartedAt - (weeksToDisplay - 3) * MS_IN_WEEK),
        seconds: 18 * S_IN_HOUR,
      },
    ],
  },
  {
    ...defaultProjectParams,
    id: MockProjectId.Business,
    name: 'Online Business',
    color: 7,
    emoji: '🤑',
    allocatedMinutesPerWeek: 5 * MIN_IN_HOUR,
    months: [],
    weeks: [],
  },
  {
    ...defaultProjectParams,
    id: MockProjectId.ProgrammingStudy,
    name: 'Study code',
    color: 9,
    emoji: '🦄',
    allocatedMinutesPerWeek: 2 * MIN_IN_HOUR,
    months: [],
    weeks: [],
  },
  {
    ...defaultProjectParams,
    id: MockProjectId.Content,
    name: 'Content Creation',
    color: 2,
    emoji: '🎥',
    allocatedMinutesPerWeek: 2 * MIN_IN_HOUR,
    months: [],
    weeks: [],
  },
  {
    ...defaultProjectParams,
    id: MockProjectId.Language,
    name: 'Spanish',
    color: 3,
    emoji: '🇪🇸',
    allocatedMinutesPerWeek: 2 * MIN_IN_HOUR,
    months: [],
    weeks: [],
  },
]

export const mockProjects: ProjectResponse[] = [
  ...allocatedMockProjects,
  {
    ...defaultProjectParams,
    id: MockProjectId.Planning,
    name: 'Planning',
    color: 5,
    emoji: '📅',
    months: [],
    weeks: [],
  },
  {
    ...defaultProjectParams,
    id: MockProjectId.Research,
    name: 'Research',
    color: 6,
    emoji: '🔬',
    weeks: [],
    months: [],
  },
]

import { TaskFactory } from '@increaser/entities/TaskFactory'
import { DemoProject } from './projects'
import { otherProjectId } from '@increaser/entities/Project'

export type DemoTaskFactoryId = 'upload-video' | 'taxes' | 'jobs' | 'invest'

export const demoTaskFactories: Record<DemoTaskFactoryId, TaskFactory> = {
  'upload-video': {
    id: 'upload-video',
    task: {
      name: 'Release a YouTube video',
      projectId: DemoProject.Content,
      links: [],
      checklist: [],
    },
    cadence: 'week',
  },
  jobs: {
    id: 'jobs',
    task: {
      name: 'Apply for better jobs',
      projectId: DemoProject.Content,
      links: [],
      checklist: [],
    },
    cadence: 'week',
  },
  invest: {
    id: 'invest',
    task: {
      name: 'Invest my income in ETFs',
      projectId: DemoProject.Content,
      links: [],
      checklist: [],
    },
    cadence: 'month',
  },
  taxes: {
    id: 'taxes',
    task: {
      name: 'Pay taxes',
      projectId: otherProjectId,
      links: [],
      checklist: [],
    },
    cadence: 'month',
  },
}

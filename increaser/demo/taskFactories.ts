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
      links: [
        {
          url: 'https://youtu.be/PXad8WzI0L0',
          name: 'video',
        },
      ],
      checklist: [
        {
          id: '1',
          name: 'Choose a title',
          completed: false,
          order: 3,
        },
        {
          id: '1',
          name: 'Write a description',
          completed: false,
          order: 2,
        },
        {
          id: '1',
          name: 'Make a thumbnail',
          completed: false,
          order: 2,
        },
        {
          id: '1',
          name: 'Promote on social media',
          completed: false,
          order: 2,
        },
      ],
    },
    cadence: 'week',
  },
  jobs: {
    id: 'jobs',
    task: {
      name: 'Apply for better jobs',
      projectId: DemoProject.Job,
      links: [],
      checklist: [],
    },
    cadence: 'week',
  },
  invest: {
    id: 'invest',
    task: {
      name: 'Invest my income in ETFs',
      projectId: DemoProject.Planning,
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

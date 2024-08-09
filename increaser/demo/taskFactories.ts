import { TaskFactory } from '@increaser/entities/TaskFactory'
import { DemoProject } from './projects'

type DemoTaskFactoryId = 'upload-video' | 'taxes' | 'jobs' | 'invest'

export const demoTaskFactories: Record<DemoTaskFactoryId, TaskFactory> = {
  'upload-video': {
    id: 'upload-video',
    task: {
      name: 'Release a YouTube video',
      description: '',
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
      description: '',
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
      description: '',
      name: 'Invest my income in ETFs',
      projectId: DemoProject.Finances,
      links: [],
      checklist: [],
    },
    cadence: 'month',
  },
  taxes: {
    id: 'taxes',
    task: {
      description: '',
      name: 'Pay taxes',
      projectId: DemoProject.Finances,
      links: [],
      checklist: [
        {
          id: 'review',
          name: 'Review income and expenses',
          completed: false,
          order: 1,
        },
        {
          id: 'calculate',
          name: 'Calculate the due amount',
          completed: false,
          order: 2,
        },
        {
          id: 'submit',
          name: 'Submit the tax form',
          completed: false,
          order: 3,
        },
        {
          id: 'pay',
          name: 'Send money to the treasury',
          completed: false,
          order: 4,
        },
      ],
    },
    cadence: 'month',
  },
}

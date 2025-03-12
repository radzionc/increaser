import { TaskFactory } from '@product/entities/TaskFactory'

import { DemoProject } from './projects'

type DemoTaskFactoryId = 'upload-video' | 'taxes' | 'jobs' | 'invest' | 'plan'

export const demoTaskFactories: Record<DemoTaskFactoryId, TaskFactory> = {
  plan: {
    id: 'plan',
    name: 'Plan the day',
    description: '',
    projectId: DemoProject.Planning,
    links: [],
    checklist: [],
    cadence: 'day',
  },
  'upload-video': {
    id: 'upload-video',
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
    cadence: 'week',
    deadlineIndex: 2,
  },
  jobs: {
    id: 'jobs',
    description: '',
    name: 'Apply for better jobs',
    projectId: DemoProject.Job,
    links: [],
    checklist: [],
    cadence: 'week',
    deadlineIndex: 3,
  },
  invest: {
    id: 'invest',
    description: '',
    name: 'Invest my income in ETFs',
    projectId: DemoProject.Finances,
    links: [],
    checklist: [],
    cadence: 'month',
    deadlineIndex: 5,
  },
  taxes: {
    id: 'taxes',
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
    cadence: 'month',
    deadlineIndex: 8,
  },
}

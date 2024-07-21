import { DemoProject } from '@increaser/demo/projects'
import { TaskTemplate } from '@increaser/entities/TaskTemplate'

export type DemoTaskTemplateId =
  | 'weekly-report'
  | 'new-blog-post'
  | 'client-meeting'
  | 'monthly-budget'

export const demoTaskTemplates: Record<DemoTaskTemplateId, TaskTemplate> = {
  'weekly-report': {
    id: 'weekly-report',
    name: 'Prepare weekly report',
    description: 'Compile and summarize weekly activities and progress.',
    projectId: DemoProject.Planning,
    links: [
      {
        url: 'https://docs.example.com/weekly-report-template',
        name: 'Report Template',
      },
    ],
    checklist: [
      {
        id: '1',
        name: 'Gather data from the week',
        completed: false,
        order: 1,
      },
      {
        id: '2',
        name: 'Analyze performance metrics',
        completed: false,
        order: 2,
      },
      {
        id: '3',
        name: 'Summarize key achievements',
        completed: false,
        order: 3,
      },
      {
        id: '4',
        name: 'Identify areas for improvement',
        completed: false,
        order: 4,
      },
    ],
  },
  'new-blog-post': {
    id: 'new-blog-post',
    name: 'Write a new blog post',
    description: 'Create engaging content for the blog.',
    projectId: DemoProject.Content,
    links: [
      {
        url: 'https://docs.example.com/blog-post-guidelines',
        name: 'Blog Post Guidelines',
      },
    ],
    checklist: [
      {
        id: '1',
        name: 'Choose a topic',
        completed: false,
        order: 1,
      },
      {
        id: '2',
        name: 'Draft the post',
        completed: false,
        order: 2,
      },
      {
        id: '3',
        name: 'Edit and proofread',
        completed: false,
        order: 3,
      },
      {
        id: '4',
        name: 'Publish the post',
        completed: false,
        order: 4,
      },
    ],
  },
  'client-meeting': {
    id: 'client-meeting',
    name: 'Prepare for client meeting',
    description: 'Get ready for an upcoming client meeting.',
    projectId: DemoProject.Business,
    links: [],
    checklist: [
      {
        id: '1',
        name: 'Review client requirements',
        completed: false,
        order: 1,
      },
      {
        id: '2',
        name: 'Prepare presentation materials',
        completed: false,
        order: 2,
      },
      {
        id: '3',
        name: 'Schedule the meeting',
        completed: false,
        order: 3,
      },
      {
        id: '4',
        name: 'Send meeting agenda to client',
        completed: false,
        order: 4,
      },
    ],
  },
  'monthly-budget': {
    id: 'monthly-budget',
    name: 'Plan monthly budget',
    description: 'Organize finances for the upcoming month.',
    projectId: DemoProject.Finances,
    links: [],
    checklist: [
      {
        id: '1',
        name: "Review last month's spending",
        completed: false,
        order: 1,
      },
      {
        id: '2',
        name: 'Set budget for each category',
        completed: false,
        order: 2,
      },
      {
        id: '3',
        name: 'Allocate funds accordingly',
        completed: false,
        order: 3,
      },
      {
        id: '4',
        name: 'Adjust based on expected income',
        completed: false,
        order: 4,
      },
    ],
  },
}

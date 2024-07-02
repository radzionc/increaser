import { TaskFactory } from '@increaser/entities/TaskFactory'
import { DemoProject } from './projects'
import { otherProjectId } from '@increaser/entities/Project'

export type DemoTaskFactoryId = 'upload-video' | 'taxes'

export const demoTaskFactories: Record<DemoTaskFactoryId, TaskFactory> = {
  'upload-video': {
    id: 'upload-video',
    task: {
      name: 'Publish a new video on YouTube',
      projectId: DemoProject.Content,
      links: [],
      checklist: [],
    },
    cadence: 'week',
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

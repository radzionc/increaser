import { recordFromItems } from '@lib/utils/record/recordFromItems'
import { Idea, Ideas } from '@product/entities/Idea'

import { DemoProject } from './projects'

const items: Omit<
  Idea,
  'id' | 'updatedAt' | 'links' | 'checklist' | 'order'
>[] = [
  {
    name: 'Improve Website SEO',
    description:
      'Research and implement SEO best practices to increase organic traffic.',
    projectId: DemoProject.Business,
  },
  {
    name: 'Create Content Calendar',
    description:
      'Develop a content calendar to streamline content creation and posting.',
    projectId: DemoProject.Content,
  },
  {
    name: 'Revise Budget',
    description:
      'Review and adjust the budget for the next quarter to ensure financial stability.',
    projectId: DemoProject.Finances,
  },
  {
    name: 'Team Meeting Agenda',
    description:
      'Prepare the agenda for the upcoming team meeting to ensure all topics are covered.',
    projectId: DemoProject.Planning,
  },
]

export const getDemoIdeas = (): Ideas => {
  return recordFromItems(
    items.map((item, order) => ({
      ...item,
      id: item.name,
      order,
      updatedAt: Date.now(),
      links: [],
      checklist: [],
    })),
    (item) => item.id,
  )
}

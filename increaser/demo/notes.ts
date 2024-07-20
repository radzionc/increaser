import { Note, Notes } from '@increaser/entities/Note'
import { toRecord } from '@lib/utils/record/toRecord'
import { DemoProject } from './projects'

const items: Omit<Note, 'id' | 'updatedAt'>[] = [
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

export const getDemoNotes = (): Notes => {
  return toRecord(
    items.map((item, order) => ({
      ...item,
      id: item.name,
      order,
      updatedAt: Date.now(),
    })),
    (item) => item.id,
  )
}

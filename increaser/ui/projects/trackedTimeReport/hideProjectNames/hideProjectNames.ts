import { order } from '@lib/utils/array/order'
import { sum } from '@lib/utils/array/sum'
import { recordMap } from '@lib/utils/record/recordMap'
import { TrackedProjects } from '../projects/TrackedProjectsProvider'

export const hideProjectNames = (projects: TrackedProjects) => {
  const orderedProjects = order(
    Object.values(projects),
    (p) => sum(p.months.map((m) => m.seconds)),
    'desc',
  )

  return recordMap(projects, (project) => {
    const projectIndex = orderedProjects.findIndex((p) => p.id === project.id)
    const name = `Project #${projectIndex + 1}`

    return {
      ...project,
      name,
    }
  })
}

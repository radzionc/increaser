import { Project } from '@increaser/entities/Project'
import { HSLA } from '@lib/ui/colors/HSLA'
import { ThemeColors } from '@lib/ui/theme/ThemeColors'
import { findBy } from '@lib/utils/array/findBy'

type GetProjectColorInput = {
  projects: Project[]
  colors: ThemeColors
  id?: string
}

export const getProjectColor = ({
  projects,
  colors,
  id,
}: GetProjectColorInput): HSLA => {
  const project = findBy(projects, 'id', id)

  return project ? colors.getLabelColor(project.color) : colors.mist
}

import { useMemo } from 'react'
import { range } from '@lib/utils/array/range'
import { labelColorsCount } from '@lib/ui/colors/generateLabelColorGetter'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'

export const useFreeProjectColors = () => {
  const { projects } = useProjects()

  const freeColors = useMemo(() => {
    const usedColors = new Set(projects.map((project) => project.color))
    return range(labelColorsCount).filter((index) => !usedColors.has(index))
  }, [projects])

  return freeColors
}

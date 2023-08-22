import { useMemo } from 'react'
import { range } from '@increaser/utils/range'
import { labelColorsCount } from '@increaser/ui/ui/colors/generateLabelColorGetter'

import { useProjects } from './useProjects'

export const useFreeProjectColors = () => {
  const { projects } = useProjects()

  const freeColors = useMemo(() => {
    const usedColors = new Set(projects.map((project) => project.color))
    return range(labelColorsCount).filter((index) => !usedColors.has(index))
  }, [projects])

  return freeColors
}

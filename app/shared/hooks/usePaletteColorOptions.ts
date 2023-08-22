import { EntityWithColor } from 'shared/entities'
import { getRandomElement } from 'shared/utils/getRandomElement'
import { range } from '@increaser/utils/range'
import { labelColorsCount } from '@increaser/ui/ui/colors/generateLabelColorGetter'

export const usePaletteColorOptions = (items: EntityWithColor[]) => {
  const usedColorsSet = new Set(items.map((item) => item.color))

  const freeColors = range(labelColorsCount).filter(
    (index) => !usedColorsSet.has(index),
  )
  const usedColors = Array.from(usedColorsSet)

  return {
    freeColors,
    usedColors,
    defaultColorOption:
      getRandomElement(freeColors.length ? freeColors : usedColors) ??
      usedColors[0],
  }
}

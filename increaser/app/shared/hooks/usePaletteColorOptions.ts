import { getRandomElement } from '@lib/utils/array/getRandomElement'
import { range } from '@lib/utils/array/range'
import { labelColorsCount } from '@lib/ui/colors/generateLabelColorGetter'
import { EntityWithColor } from '@lib/utils/entities/EntityWithColor'

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

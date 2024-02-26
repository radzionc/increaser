import { habitRecord } from '@increaser/app/habits/data/habits'
import { HabitTreeNode, habitTree } from '@increaser/app/habits/data/habitTree'
import { useMemo, useState } from 'react'
import { getTreeNode, getTreeValues } from '@lib/utils/tree'
import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'
import styled from 'styled-components'
import { HStack } from '@lib/ui/layout/Stack'

import { HabitItem } from './HabitItem'

const Container = styled(HStack)`
  width: 100%;
  flex-wrap: wrap;
  gap: 40px;
  align-items: start;
`

// turn into tree helper
const getCategoriesColors = (
  { value, children }: HabitTreeNode,
  parentColor?: number,
): Record<string, number | undefined> => {
  const color = value.color ?? parentColor

  return {
    [value.id]: color,
    ...children.reduce(
      (acc, child) => ({
        ...acc,
        ...getCategoriesColors(child, color),
      }),
      {},
    ),
  }
}

const defaultColor = 3

export const CuratedHabits = () => {
  const [path] = useState<number[]>([])

  const node = getTreeNode(habitTree, path)

  const nodes = useMemo(() => getTreeValues(habitTree), [])
  const categoryColorRecord = useMemo(() => getCategoriesColors(habitTree), [])

  const habits = withoutDuplicates(
    getTreeValues(node).flatMap((value) => value.habits || []),
  )
    .map((id) => ({
      id,
      ...habitRecord[id],
    }))
    .map((habit) => ({
      ...habit,
      tags: nodes
        .filter((value) => value.habits?.includes(habit.id))
        .map((value) => ({
          name: value.id,
          color: categoryColorRecord[value.id] ?? defaultColor,
        })),
    }))

  return (
    <Container>
      {habits.map((habit) => (
        <HabitItem {...habit} key={habit.id} />
      ))}
    </Container>
  )
}

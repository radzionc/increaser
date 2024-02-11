import { habitRecord } from '@increaser/app/habits/data/habits'
import { HabitTreeNode, habitTree } from '@increaser/app/habits/data/habitTree'
import { useMemo, useState } from 'react'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { getTreeNode, getTreeValues } from '@lib/utils/tree'
import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'
import styled from 'styled-components'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { TreeFilter } from '@lib/ui/tree/TreeFilter'

import { HabitItem } from './HabitItem'
import { useIsScreenWidthLessThan } from '@lib/ui/hooks/useIsScreenWidthLessThan'

const Container = styled(HStack)`
  width: 100%;
  flex-wrap: wrap;
  gap: 40px;
  align-items: start;
`

const Content = styled(VStack)`
  gap: 20px;
  flex: 1;
`

const FilterWrapper = styled.div`
  position: sticky;
  top: 0;
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
  const [path, setPath] = useState<number[]>([])

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

  const isSmallScreen = useIsScreenWidthLessThan(800)

  return (
    <Container>
      {!isSmallScreen && (
        <FilterWrapper>
          <TreeFilter
            tree={habitTree}
            renderName={(value) => capitalizeFirstLetter(value.id)}
            value={path}
            onChange={setPath}
          />
        </FilterWrapper>
      )}
      <Content>
        <Text weight="bold" size={24}>
          {capitalizeFirstLetter(node.value.id)} habits{' '}
          <Text as="span" color="supporting">
            ({habits.length})
          </Text>
        </Text>
        {habits.map((habit) => (
          <HabitItem {...habit} key={habit.id} />
        ))}
      </Content>
    </Container>
  )
}

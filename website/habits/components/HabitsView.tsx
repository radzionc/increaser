import { getViewSetup } from '@increaser/ui/view/getViewSetup'
import styled, { css } from 'styled-components'
import { transition } from '@increaser/ui/css/transition'
import { UnstyledButton } from '@increaser/ui/buttons/UnstyledButton'
import { HStackSeparatedBy } from '@increaser/ui/layout/StackSeparatedBy'
import { Text } from '@increaser/ui/text'

export const habitViews = ['my', 'explore'] as const
export type HabitsView = (typeof habitViews)[number]

export const {
  ViewProvider: HabitsViewProvider,
  useView: useHabitsView,
  RenderView: RenderHabitsView,
} = getViewSetup<HabitsView>('my', 'explore')

const habitViewName: Record<HabitsView, string> = {
  my: 'My Habits',
  explore: 'Curated Habits',
}

const ViewOption = styled(UnstyledButton)<{ isSelected: boolean }>`
  color: ${({ isSelected, theme }) =>
    (isSelected ? theme.colors.text : theme.colors.textShy).toCssValue()};

  ${transition}

  ${({ isSelected, theme }) =>
    !isSelected &&
    css`
      :hover {
        color: ${theme.colors.textSupporting.toCssValue()};
      }
    `}
`

export const HabitsViewSelector = () => {
  const { view, setView } = useHabitsView()

  return (
    <HStackSeparatedBy separator={<Text color="shy">|</Text>}>
      {habitViews.map((v) => (
        <ViewOption
          onClick={() => setView(v)}
          isSelected={v === view}
          key={view}
        >
          {habitViewName[v]}
        </ViewOption>
      ))}
    </HStackSeparatedBy>
  )
}

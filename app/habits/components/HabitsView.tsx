import { getViewSetup } from 'shared/utils/getViewSetup'
import styled, { css } from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { UnstyledButton } from '@increaser/ui/ui/buttons/UnstyledButton'
import { HStackSeparatedBy } from '@increaser/ui/ui/StackSeparatedBy'
import { Text } from '@increaser/ui/ui/Text'

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

  ${defaultTransitionCSS}

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

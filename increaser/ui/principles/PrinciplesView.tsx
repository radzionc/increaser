import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ListIcon } from '@lib/ui/icons/ListIcon'
import { ScrollIcon } from '@lib/ui/icons/ScrollIcon'
import { HStack } from '@lib/ui/layout/Stack'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { Text } from '@lib/ui/text'
import { getViewSetup } from '@lib/ui/view/getViewSetup'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { ReactNode, useId } from 'react'

export const principlesView = ['principles', 'categories'] as const
export type PrinciplesView = (typeof principlesView)[number]

export const principlesViewName: Record<PrinciplesView, string> = {
  principles: 'Principles',
  categories: 'Categories',
}

export const principlesViewIcon: Record<PrinciplesView, ReactNode> = {
  principles: <ScrollIcon />,
  categories: <ListIcon />,
}

export const {
  ViewProvider: PrinciplesViewProvider,
  useView: usePrinciplesView,
  RenderView: RenderPrinciplesView,
} = getViewSetup<PrinciplesView>({
  defaultView: 'principles',
  name: 'principles',
})

export const PrinciplesViewSelector = () => {
  const { view, setView } = usePrinciplesView()
  const id = useId()

  return (
    <HStack gap={4}>
      {principlesView.map((value) => (
        <TabNavigationItem
          isSelected={value === view}
          onSelect={() => setView(value)}
          value={value}
          key={value}
          groupName={id}
        >
          <HStack alignItems="center" gap={8}>
            <IconWrapper>{principlesViewIcon[value]}</IconWrapper>
            <Text>{capitalizeFirstLetter(value)}</Text>
          </HStack>
        </TabNavigationItem>
      ))}
    </HStack>
  )
}

import { getViewSetup } from '@lib/ui/view/getViewSetup'
import {
  ProductFeatureStatus,
  productFeatureStatuses,
} from '@increaser/entities/ProductFeature'
import { LightBulbIcon } from '@lib/ui/icons/LightBulbIcon'
import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HStack } from '@lib/ui/layout/Stack'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { Text } from '@lib/ui/text'
import { useId } from 'react'

export const {
  ViewProvider: ProductFeaturesViewProvider,
  useView: useProductFeaturesView,
  RenderView: RenderProductFeaturesView,
} = getViewSetup<ProductFeatureStatus>({
  defaultView: 'idea',
  name: 'productFeatures',
})

const featuresViewName: Record<ProductFeatureStatus, string> = {
  idea: 'Ideas',
  done: 'Done',
}

const featuresViewIcon: Record<ProductFeatureStatus, React.ReactNode> = {
  idea: <LightBulbIcon />,
  done: <CheckSquareIcon />,
}

export const ProductFeaturesViewSelector = () => {
  const { view, setView } = useProductFeaturesView()
  const id = useId()

  return (
    <HStack gap={4}>
      {productFeatureStatuses.map((value) => (
        <TabNavigationItem
          isSelected={value === view}
          onSelect={() => setView(value)}
          value={value}
          key={value}
          groupName={id}
        >
          <HStack alignItems="center" gap={8}>
            <IconWrapper>{featuresViewIcon[value]}</IconWrapper>
            <Text>{featuresViewName[value]}</Text>
          </HStack>
        </TabNavigationItem>
      ))}
    </HStack>
  )
}

import { getViewSetup } from '@lib/ui/view/getViewSetup'
import { TabNavigation } from '@lib/ui/navigation/TabNavigation'
import {
  ProductFeatureStatus,
  productFeatureStatuses,
} from '@increaser/entities/ProductFeature'

export const {
  ViewProvider: ProductFeaturesViewProvider,
  useView: useProductFeaturesView,
  RenderView: RenderProductFeaturesView,
} = getViewSetup<ProductFeatureStatus>({
  defaultView: 'idea',
  name: 'productFeatures',
})

const taskViewName: Record<ProductFeatureStatus, string> = {
  idea: 'Ideas',
  done: 'Done',
}

export const ProductFeaturesViewSelector = () => {
  const { view, setView } = useProductFeaturesView()

  return (
    <TabNavigation
      views={productFeatureStatuses}
      getViewName={(view) => taskViewName[view]}
      activeView={view}
      onSelect={setView}
    />
  )
}

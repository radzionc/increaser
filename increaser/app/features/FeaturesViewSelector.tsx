import {
  AppPageFeaturesView,
  appPageViews,
  getAppPath,
} from '@increaser/ui/navigation/app'
import { PageTitleNavigation } from '@lib/ui/navigation/PageTitleNavigation'
import { useRouter } from 'next/router'
import { useCurrentPageView } from '../navigation/hooks/useCurrentPageView'

const featuresViewName: Record<AppPageFeaturesView, string> = {
  updates: 'What’s New',
  requests: 'Requests',
}

export const FeaturesViewSelector = () => {
  const view = useCurrentPageView('features')
  const { push } = useRouter()

  return (
    <PageTitleNavigation
      value={view}
      options={appPageViews.features}
      onChange={(view) => push(getAppPath('features', view))}
      getOptionName={(option) => featuresViewName[option]}
    />
  )
}

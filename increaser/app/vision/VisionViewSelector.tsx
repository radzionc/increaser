import {
  AppPageVisionView,
  appPageViews,
  getAppPath,
} from '@increaser/ui/navigation/app'
import { PageTitleNavigation } from '@lib/ui/navigation/PageTitleNavigation'
import { useRouter } from 'next/router'
import { useCurrentPageView } from '../navigation/hooks/useCurrentPageView'

const visionViewName: Record<AppPageVisionView, string> = {
  my: 'Vision',
  ideas: 'Explore',
}

export const VisionViewSelector = () => {
  const view = useCurrentPageView('vision')
  const { push } = useRouter()

  return (
    <PageTitleNavigation
      value={view}
      options={appPageViews.vision}
      onChange={(view) => push(getAppPath('vision', view))}
      getOptionName={(option) => visionViewName[option]}
    />
  )
}

import { PageTitleNavigation } from '@lib/ui/navigation/PageTitleNavigation'
import {
  appPageViewName,
  appPageViews,
  AppPageWithView,
  getAppPath,
} from '@product/ui/navigation/app'
import { useRouter } from 'next/router'

import { useCurrentPage } from '../hooks/useCurrentPage'
import { useCurrentPageView } from '../hooks/useCurrentPageView'
import { useLastPageView } from '../hooks/useLastPageView'

export const PageViewNavigation = () => {
  const rootPage = useCurrentPage() as AppPageWithView
  const view = useCurrentPageView(rootPage)
  const { push } = useRouter()
  const [, setLastPageView] = useLastPageView()

  return (
    <PageTitleNavigation
      value={view}
      options={appPageViews[rootPage]}
      onChange={(view) => {
        setLastPageView((prev) => ({ ...prev, [rootPage]: view }))
        push(getAppPath(rootPage, view))
      }}
      getOptionName={(option) => (appPageViewName[rootPage] as any)[option]}
    />
  )
}

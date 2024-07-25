import {
  AppPagePrinciplesView,
  appPageViews,
  getAppPath,
} from '@increaser/ui/navigation/app'
import { PageTitleNavigation } from '@lib/ui/navigation/PageTitleNavigation'
import { useRouter } from 'next/router'
import { useCurrentPageView } from '../navigation/hooks/useCurrentPageView'

const principlesViewName: Record<AppPagePrinciplesView, string> = {
  my: 'My principles',
  ideas: 'Explore principles',
}

export const PrinciplesViewSelector = () => {
  const view = useCurrentPageView('principles')
  const { push } = useRouter()

  return (
    <PageTitleNavigation
      value={view}
      options={appPageViews.principles}
      onChange={(view) => push(getAppPath('principles', view))}
      getOptionName={(option) => principlesViewName[option]}
    />
  )
}

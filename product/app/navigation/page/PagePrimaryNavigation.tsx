import { PageTitle } from '@lib/ui/text/PageTitle'
import {
  appPageEmoji,
  appPageName,
  appPageViews,
  AppPageWithView,
} from '@product/ui/navigation/app'

import { PageDocumentTitle } from '../../ui/page/PageDocumentTitle'
import { useCurrentPage } from '../hooks/useCurrentPage'

import { PageViewNavigation } from './PageViewNavigation'

export const PagePrimaryNavigation = () => {
  const rootPage = useCurrentPage() as AppPageWithView

  if (rootPage in appPageViews) {
    return <PageViewNavigation />
  }
  return (
    <>
      <PageDocumentTitle
        emoji={appPageEmoji[rootPage]}
        title={appPageName[rootPage]}
      />
      {rootPage in appPageViews ? (
        <PageViewNavigation />
      ) : (
        <PageTitle>{appPageName[rootPage]}</PageTitle>
      )}
    </>
  )
}

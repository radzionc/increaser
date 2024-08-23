import {
  appPageEmoji,
  appPageName,
  appPageViews,
  AppPageWithView,
} from '@increaser/ui/navigation/app'
import { useCurrentPage } from '../hooks/useCurrentPage'
import { PageViewNavigation } from './PageViewNavigation'
import { PageDocumentTitle } from '../../ui/page/PageDocumentTitle'
import { PageTitle } from '@lib/ui/text/PageTitle'

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

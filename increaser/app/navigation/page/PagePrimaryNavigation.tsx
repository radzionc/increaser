import {
  appPageEmoji,
  appPageName,
  appPageViews,
  AppPageWithView,
} from '@increaser/ui/navigation/app'
import { useCurrentPage } from '../hooks/useCurrentPage'
import { PageTitleNavigation } from '@lib/ui/navigation/PageTitleNavigation'
import { PageViewNavigation } from './PageViewNavigation'
import { PageDocumentTitle } from '../../ui/page/PageDocumentTitle'

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
        <PageTitleNavigation
          value={rootPage}
          options={[rootPage]}
          onChange={() => {}}
          getOptionName={(option) => appPageName[option]}
        />
      )}
    </>
  )
}

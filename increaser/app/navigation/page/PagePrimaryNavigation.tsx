import {
  appPageEmoji,
  appPageName,
  appPageViews,
  AppPageWithView,
} from '@increaser/ui/navigation/app'
import { useCurrentPage } from '../hooks/useCurrentPage'
import { PageViewNavigation } from './PageViewNavigation'
import { PageDocumentTitle } from '../../ui/page/PageDocumentTitle'
import styled from 'styled-components'
import { centerContent } from '@lib/ui/css/centerContent'
import { getColor } from '@lib/ui/theme/getters'

const Title = styled.h1`
  font-size: 14px;
  font-weight: 600;
  height: 100%;
  ${centerContent};
  color: ${getColor('contrast')};
`

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
        <Title>{appPageName[rootPage]}</Title>
      )}
    </>
  )
}

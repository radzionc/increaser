import { ValueProp } from '@lib/ui/props'
import {
  AppNavigationPage,
  appPageViews,
  AppPageWithView,
  getAppPath,
  getPageDefaultPath,
} from '@product/ui/navigation/app'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { useCurrentPage } from '../hooks/useCurrentPage'
import { useLastPageView } from '../hooks/useLastPageView'
import { navigationPathInfo } from '../navigationPathInfo'

import { NavigationItem, NavigationItemProps } from './NavigationItem'

type NavigationToInternalPageProps = ValueProp<AppNavigationPage> &
  Pick<NavigationItemProps, 'decoration'>

export const NavigationToInternalPage = ({
  value,
  ...rest
}: NavigationToInternalPageProps) => {
  const currentPage = useCurrentPage()

  const [lastPageView] = useLastPageView()

  const { push } = useRouter()

  const { name, icon } = navigationPathInfo[value]

  const isActive = currentPage === value

  const href = useMemo(() => {
    if (value in appPageViews) {
      const rootPage = value as AppPageWithView
      const view = lastPageView[rootPage]

      if (view) {
        return getAppPath(rootPage, view)
      }
    }

    return getPageDefaultPath(value)
  }, [lastPageView, value])

  return (
    <NavigationItem
      onClick={() => {
        push(href)
      }}
      {...rest}
      icon={icon}
      name={name}
      isActive={isActive}
    />
  )
}

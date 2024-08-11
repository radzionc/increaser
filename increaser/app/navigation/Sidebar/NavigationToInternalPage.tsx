import { NavigationItem, NavigationItemProps } from './NavigationItem'
import Link from 'next/link'
import { ComponentWithValueProps } from '@lib/ui/props'
import {
  AppNavigationPage,
  appPageViews,
  AppPageWithView,
  getAppPath,
  getPageDefaultPath,
} from '@increaser/ui/navigation/app'
import { navigationPathInfo } from '../navigationPathInfo'
import { useCurrentPage } from '../hooks/useCurrentPage'
import { useLastPageView } from '../hooks/useLastPageView'
import { useMemo } from 'react'

type NavigationToInternalPageProps =
  ComponentWithValueProps<AppNavigationPage> &
    Pick<NavigationItemProps, 'decoration'>

export const NavigationToInternalPage = ({
  value,
  ...rest
}: NavigationToInternalPageProps) => {
  const currentPage = useCurrentPage()

  const [lastPageView] = useLastPageView()

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
    <Link href={href}>
      <NavigationItem {...rest} icon={icon} name={name} isActive={isActive} />
    </Link>
  )
}

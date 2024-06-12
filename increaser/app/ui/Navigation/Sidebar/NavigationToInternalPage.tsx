import { navigationPathInfo } from '@increaser/app/ui/Navigation/navigationPathInfo'
import { NavigationItem, NavigationItemProps } from './NavigationItem'
import Link from 'next/link'
import { ComponentWithValueProps } from '@lib/ui/props'
import {
  AppNavigationPage,
  getPageDefaultPath,
} from '@increaser/ui/navigation/app'
import { useCurrentPage } from '../../../navigation/hooks/useCurrentPage'

type NavigationToInternalPageProps =
  ComponentWithValueProps<AppNavigationPage> &
    Pick<NavigationItemProps, 'decoration'>

export const NavigationToInternalPage = ({
  value,
  ...rest
}: NavigationToInternalPageProps) => {
  const currentPage = useCurrentPage()

  const { name, icon } = navigationPathInfo[value]

  const isActive = currentPage === value

  return (
    <Link href={getPageDefaultPath(value)}>
      <NavigationItem {...rest} icon={icon} name={name} isActive={isActive} />
    </Link>
  )
}

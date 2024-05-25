import { navigationPathInfo } from '@increaser/app/ui/Navigation/navigationPathInfo'
import { NavigationItem, NavigationItemProps } from './NavigationItem'
import Link from 'next/link'
import { useRouter } from 'next/router'

type NavigationToInternalPageProps = Pick<NavigationItemProps, 'decoration'> & {
  path: keyof typeof navigationPathInfo
}

export const NavigationToInternalPage = ({
  path,
  ...rest
}: NavigationToInternalPageProps) => {
  const { pathname } = useRouter()

  const { name, icon } = navigationPathInfo[path]

  const isActive = pathname === path

  return (
    <Link href={path}>
      <NavigationItem {...rest} icon={icon} name={name} isActive={isActive} />
    </Link>
  )
}

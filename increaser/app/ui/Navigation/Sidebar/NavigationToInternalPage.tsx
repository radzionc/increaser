import { navigationPathInfo } from '@increaser/app/ui/Navigation/navigationPathInfo'
import { NavigationItem } from './NavigationItem'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
  path: keyof typeof navigationPathInfo
}

export const NavigationToInternalPage = ({ path }: Props) => {
  const { pathname } = useRouter()

  const { name, icon } = navigationPathInfo[path]

  const isActive = pathname === path

  return (
    <Link href={path}>
      <NavigationItem icon={icon} name={name} isActive={isActive} />
    </Link>
  )
}

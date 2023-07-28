import { navigationPathInfo } from 'ui/Navigation/navigationPathInfo'
import { NavigationItem } from './NavigationItem'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
  path: keyof typeof navigationPathInfo
}

export const NavigationToInternalPage = ({ path }: Props) => {
  const { pathname } = useRouter()

  const { name, icon } = navigationPathInfo[path]

  return (
    <Link href={path}>
      <NavigationItem
        icon={icon}
        name={name}
        isActive={pathname.includes(path)}
      />
    </Link>
  )
}

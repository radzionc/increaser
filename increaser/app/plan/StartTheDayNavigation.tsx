import { useRouter } from 'next/router'
import { AppPath } from '@increaser/ui/navigation/AppPath'
import Link from 'next/link'
import { NavigationItem } from '../ui/Navigation/Sidebar/NavigationItem'
import { navigationPathInfo } from '../ui/Navigation/navigationPathInfo'
import { useIsStartDaySetupCompleted } from './useIsStartDaySetupCompleted'
import { AnimatedCoffeeIcon } from './AnimatedCoffeeIcon'

export const StartTheDayNavigation = () => {
  const { pathname } = useRouter()

  const isCompleted = useIsStartDaySetupCompleted()

  const path = AppPath.Plan
  const { name } = navigationPathInfo[path]

  const isActive = pathname === path

  if (isCompleted) {
    return null
  }

  return (
    <Link href={path}>
      <NavigationItem
        icon={<AnimatedCoffeeIcon />}
        name={name}
        isActive={isActive}
      />
    </Link>
  )
}

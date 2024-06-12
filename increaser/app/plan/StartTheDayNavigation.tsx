import Link from 'next/link'
import { NavigationItem } from '../ui/Navigation/Sidebar/NavigationItem'
import { navigationPathInfo } from '../ui/Navigation/navigationPathInfo'
import { useIsStartDaySetupCompleted } from './useIsStartDaySetupCompleted'
import { AnimatedCoffeeIcon } from './AnimatedCoffeeIcon'
import { useCurrentPage } from '../navigation/hooks/useCurrentPage'
import { getAppPath } from '@increaser/ui/navigation/app'

export const StartTheDayNavigation = () => {
  const isCompleted = useIsStartDaySetupCompleted()

  const page = useCurrentPage()
  const { name } = navigationPathInfo.plan

  const isActive = page === 'plan'

  if (isCompleted) {
    return null
  }

  return (
    <Link href={getAppPath('plan')}>
      <NavigationItem
        icon={<AnimatedCoffeeIcon />}
        name={name}
        isActive={isActive}
      />
    </Link>
  )
}

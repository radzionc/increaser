import Link from 'next/link'
import { NavigationItem } from '../../ui/Navigation/Sidebar/NavigationItem'
import { navigationPathInfo } from '../../ui/Navigation/navigationPathInfo'
import { AnimatedCoffeeIcon } from './AnimatedCoffeeIcon'
import { useCurrentPage } from '../../navigation/hooks/useCurrentPage'
import { getAppPath } from '@increaser/ui/navigation/app'
import { useIsTodayPlanned } from './hooks/useIsTodayPlanned'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { borderRadius } from '@lib/ui/css/borderRadius'

const Container = styled(NavigationItem)`
  color: ${getColor('success')};
`

const Outline = styled.div`
  ${absoluteOutline(1, 1)};
  border: 1px dashed ${getColor('success')};
  ${borderRadius.s};
`

export const StartTheDayNavigation = () => {
  const isCompleted = useIsTodayPlanned()

  const page = useCurrentPage()
  const { name } = navigationPathInfo.plan

  const isActive = page === 'plan'

  if (isCompleted) {
    return null
  }

  return (
    <Link href={getAppPath('plan')}>
      <Container
        icon={<AnimatedCoffeeIcon />}
        name={name}
        isActive={isActive}
        decoration={<Outline />}
      />
    </Link>
  )
}

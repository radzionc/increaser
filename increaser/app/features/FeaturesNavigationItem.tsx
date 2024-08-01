import Link from 'next/link'
import { useCurrentPage } from '../navigation/hooks/useCurrentPage'
import { getAppPath } from '@increaser/ui/navigation/app'
import { useUserState } from '@increaser/ui/user/UserStateContext'
import { useMemo } from 'react'
import { productUpdates } from '@increaser/changelog/productUpdates'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { round } from '@lib/ui/css/round'
import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { navigationPathInfo } from '../navigation/navigationPathInfo'
import { NavigationItem } from '../navigation/Sidebar/NavigationItem'

const Pill = styled.div`
  position: absolute;
  right: 8px;
  background: ${getColor('primary')};
  ${round};
  font-weight: 500;
  font-size: 12px;
  color: ${getColor('contrast')};
  ${centerContent};
  min-width: 20px;
  min-height: 20px;
  ${horizontalPadding(4)}
`

export const FeaturesNavigationItem = () => {
  const currentPage = useCurrentPage()
  const { state: user } = useUserState()
  const newFeaturesCount = useMemo(() => {
    if (!user) {
      return
    }

    const viewedNewFeaturesAt =
      user.viewedNewFeaturesAt || user.registrationDate

    return productUpdates.filter(
      (update) => update.releasedAt > viewedNewFeaturesAt,
    ).length
  }, [user])

  const rootPage = 'features'
  const { name, icon } = navigationPathInfo[rootPage]

  const isActive = currentPage === rootPage

  return (
    <Link
      href={getAppPath('features', newFeaturesCount ? 'updates' : 'requests')}
    >
      <NavigationItem
        icon={icon}
        name={name}
        isActive={isActive}
        decoration={
          newFeaturesCount ? <Pill>{newFeaturesCount}</Pill> : undefined
        }
      />
    </Link>
  )
}

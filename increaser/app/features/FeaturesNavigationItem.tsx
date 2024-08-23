import Link from 'next/link'
import { getAppPath } from '@increaser/ui/navigation/app'
import { useUserState } from '@increaser/ui/user/UserStateContext'
import { useMemo } from 'react'
import { productUpdates } from '@increaser/changelog/productUpdates'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { round } from '@lib/ui/css/round'
import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { BellIcon } from '@lib/ui/icons/BellIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HeaderActionButton } from '../navigation/HeaderActionButton'

const Pill = styled.div`
  position: absolute;
  right: -12px;
  top: -10px;
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

const Wrapper = styled(IconWrapper)`
  position: relative;
  overflow: visible;
`

export const FeaturesNavigationItem = () => {
  const { state: user } = useUserState()
  const newFeaturesCount = useMemo(() => {
    if (!user) {
      return 0
    }

    const viewedNewFeaturesAt =
      user.viewedNewFeaturesAt || user.registrationDate

    return productUpdates.filter(
      (update) => update.releasedAt > viewedNewFeaturesAt,
    ).length
  }, [user])

  return (
    <Link href={getAppPath('updates')}>
      <HeaderActionButton>
        <Wrapper>
          <BellIcon />
          {newFeaturesCount > 0 && <Pill>{newFeaturesCount}</Pill>}
        </Wrapper>
      </HeaderActionButton>
    </Link>
  )
}

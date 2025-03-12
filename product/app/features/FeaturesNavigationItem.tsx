import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { round } from '@lib/ui/css/round'
import { BellIcon } from '@lib/ui/icons/BellIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { getColor } from '@lib/ui/theme/getters'
import { productUpdates } from '@product/changelog/productUpdates'
import { getAppPath } from '@product/ui/navigation/app'
import { useUser } from '@product/ui/user/state/user'
import Link from 'next/link'
import { useMemo } from 'react'
import styled from 'styled-components'

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
  const user = useUser()
  const newFeaturesCount = useMemo(() => {
    if (!user) {
      return 0
    }

    const viewedNewFeaturesAt =
      user.viewedNewFeaturesAt || user.registrationDate

    return productUpdates.filter(
      (update) => update.releasedAt && update.releasedAt > viewedNewFeaturesAt,
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

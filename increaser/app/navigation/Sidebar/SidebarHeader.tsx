import { HStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { navigationConfig } from './config'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { ProductIcon } from '@increaser/ui/icon/ProductIcon'
import { Text } from '@lib/ui/text'
import { productName } from '@increaser/config'
import { FeaturesNavigationItem } from '../../features/FeaturesNavigationItem'
import { ManageAccount } from '../../user/components/ManageAccount'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { borderRadius } from '@lib/ui/css/borderRadius'

const Container = styled(HStack)`
  ${horizontalPadding(navigationConfig.itemHorizontalPadding)};
  padding-right: 0;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  svg {
    font-size: 20px;
  }
`

const Logo = styled(HStack)`
  align-items: center;
  gap: 12px;

  font-weight: 500;
  font-size: 14px;

  ${borderRadius.s};
  padding-left: 4px;
  height: 32px;

  svg {
    font-size: 16px;
  }
`

export const SidebarHeader = () => {
  return (
    <Container>
      <Logo>
        <ProductIcon />
        <Text weight="600">{productName.toLowerCase()}</Text>
      </Logo>
      <UserStateOnly>
        <HStack alignItems="center" gap={4}>
          <ManageAccount />
          <FeaturesNavigationItem />
        </HStack>
      </UserStateOnly>
    </Container>
  )
}

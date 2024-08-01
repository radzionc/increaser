import { HStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { navigationConfig } from './config'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { NavigationItemContentFrame } from './NavigationItemContentFrame'
import { ProductIcon } from '@increaser/ui/icon/ProductIcon'
import { Text } from '@lib/ui/text'
import { productName } from '@increaser/config'
import { FeaturesNavigationItem } from '../../features/FeaturesNavigationItem'

const Container = styled(HStack)`
  ${horizontalPadding(navigationConfig.itemHorizontalPadding)};
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  svg {
    font-size: 20px;
  }
`

const Logo = styled(NavigationItemContentFrame)``

export const SidebarHeader = () => {
  return (
    <Container>
      <Logo>
        <ProductIcon />
        <Text color="contrast" weight="bold">
          {productName.toLowerCase()}
        </Text>
      </Logo>
      <FeaturesNavigationItem />
    </Container>
  )
}

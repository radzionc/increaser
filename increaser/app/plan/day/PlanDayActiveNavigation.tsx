import { navigationPathInfo } from '../../ui/Navigation/navigationPathInfo'
import { AnimatedCoffeeIcon } from './AnimatedCoffeeIcon'
import styled from 'styled-components'
import { PlanDayOverview } from './PlanDayOverview'
import { VStack } from '@lib/ui/layout/Stack'
import { PlanDayPromptOutline } from './PlanDayPromptOutline'
import { NavigationItemContentFrame } from '../../ui/Navigation/Sidebar/NavigationItemContentFrame'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'
import { navigationConfig } from '../../ui/Navigation/Sidebar/config'
import { verticalPadding } from '@lib/ui/css/verticalPadding'

const Wrapper = styled(VStack)`
  position: relative;
  gap: 8px;
  ${verticalPadding(toSizeUnit(navigationConfig.itemVerticalPadding))}
  > * {
    ${horizontalPadding(navigationConfig.itemHorizontalPadding)};
  }
`

const Header = styled(VStack)`
  justify-content: center;
  color: ${getColor('success')};
`

export const PlanDayActiveNavigation = () => {
  const { name } = navigationPathInfo.plan

  return (
    <Wrapper>
      <Header>
        <NavigationItemContentFrame>
          <AnimatedCoffeeIcon />
          {name}
        </NavigationItemContentFrame>
      </Header>
      <PlanDayOverview />
      <PlanDayPromptOutline />
    </Wrapper>
  )
}

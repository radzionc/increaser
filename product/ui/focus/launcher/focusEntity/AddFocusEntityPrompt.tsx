import { Hoverable } from '@lib/ui/base/Hoverable'
import { HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { OnClickProp, ChildrenProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

const Container = styled(Hoverable)``

const Content = styled(HStack)`
  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};
  ${verticalPadding(tightListItemConfig.verticalPadding)};

  color: ${getColor('textSupporting')};

  svg {
    color: ${getColor('textPrimary')};
  }

  &:hover {
    color: ${getColor('textPrimary')};
  }
`

export const AddFocusEntityPrompt = ({
  onClick,
  children,
}: OnClickProp & ChildrenProp) => {
  return (
    <Container
      horizontalOffset={tightListItemConfig.horizontalOffset}
      verticalOffset={0}
    >
      <Content alignItems="center" gap={8} onClick={onClick}>
        <IconWrapper>
          <PlusIcon />
        </IconWrapper>
        {children}
      </Content>
    </Container>
  )
}

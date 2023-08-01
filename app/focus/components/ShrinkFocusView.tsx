import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { MinimizeIcon } from '@increaser/ui/ui/icons/MinimizeIcon'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { getVerticalPaddingCSS } from '@increaser/ui/ui/utils/getVerticalPaddingCSS'
import Link from 'next/link'
import { Path } from 'router/Path'
import styled from 'styled-components'

const Container = styled(Panel)`
  ${getVerticalPaddingCSS(16)}
  color: ${getColor('text')};
  font-weight: 500;

  ${defaultTransitionCSS};

  :hover {
    color: ${getColor('contrast')};
  }
`

export const ShrinkFocusView = () => {
  return (
    <Link href={Path.Home}>
      <Container>
        <HStack fullWidth alignItems="center" justifyContent="space-between">
          <Text>Exit full screen</Text>
          <MinimizeIcon />
        </HStack>
      </Container>
    </Link>
  )
}

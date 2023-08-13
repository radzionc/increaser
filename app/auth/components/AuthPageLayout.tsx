import { ComponentWithChildrenProps } from '@increaser/ui/shared/props'
import { VStack } from '@increaser/ui/ui/Stack'
import { defaultBorderRadiusCSS } from '@increaser/ui/ui/borderRadius'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { Topbar } from 'landing/components/Topbar'
import styled from 'styled-components'

const Wrapper = styled(VStack)`
  background: ${getColor('foreground')};
  min-height: 100%;

  align-items: center;
  gap: 120px;
`

const Content = styled(VStack)`
  max-width: 400px;
  width: 100%;
  padding: 26px;
  ${defaultBorderRadiusCSS};
  background: ${getColor('background')};
`

export const AuthPageLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <Wrapper>
      <Topbar />
      <Content>{children}</Content>
    </Wrapper>
  )
}

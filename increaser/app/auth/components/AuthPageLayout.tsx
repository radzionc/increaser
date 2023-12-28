import { ComponentWithChildrenProps } from '@lib/ui/props'
import { VStack } from '@lib/ui/layout/Stack'
import { getColor } from '@lib/ui/theme/getters'
import { Topbar } from '@increaser/app/landing/components/Topbar'
import styled from 'styled-components'
import { UnauthenticatedOnly } from './UnauthenticatedOnly'
import { borderRadius } from '@lib/ui/css/borderRadius'

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
  ${borderRadius.m};
  background: ${getColor('background')};
`

export const AuthPageLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <UnauthenticatedOnly>
      <Wrapper>
        <Topbar />
        <Content>{children}</Content>
      </Wrapper>
    </UnauthenticatedOnly>
  )
}

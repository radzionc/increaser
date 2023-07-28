import { Topbar } from 'landing/components/Topbar'
import Head from 'next/head'
import { ComponentWithChildrenProps } from 'shared/props'
import styled from 'styled-components'
import { LandingSlice } from '@increaser/ui/ui/landing/LandingSlice'
import { Spacer } from '@increaser/ui/ui/Spacer'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

const FullHeightContainer = styled(VStack)`
  background: ${({ theme }) => theme.colors.background.toCssValue()};
  min-height: 100vh;
`

interface LegalPageProps extends ComponentWithChildrenProps {
  title: string
}

export const LegalPage = ({ title, children }: LegalPageProps) => {
  return (
    <FullHeightContainer gap={20}>
      <Head>
        <title>{title}</title>
      </Head>
      <Topbar />
      <LandingSlice>
        <VStack alignItems="center" gap={80}>
          <Text as="h1">{title}</Text>
          <VStack style={{ maxWidth: 800 }} gap={40}>
            <>{children}</>
          </VStack>
        </VStack>
      </LandingSlice>
      <Spacer height={40} />
    </FullHeightContainer>
  )
}

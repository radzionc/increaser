import Head from 'next/head'
import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { LandingSlice } from '@increaser/ui/landing/LandingSlice'
import { Spacer } from '@increaser/ui/layout/Spacer'
import { VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'

interface LegalPageProps extends ComponentWithChildrenProps {
  title: string
}

export const LegalPage = ({ title, children }: LegalPageProps) => {
  return (
    <VStack>
      <Head>
        <title>{title}</title>
      </Head>
      <LandingSlice>
        <VStack alignItems="center" gap={80}>
          <Text as="h1">{title}</Text>
          <VStack style={{ maxWidth: 800 }} gap={40}>
            <>{children}</>
          </VStack>
        </VStack>
      </LandingSlice>
      <Spacer height={40} />
    </VStack>
  )
}

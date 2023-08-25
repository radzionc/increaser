import Head from 'next/head'
import { ComponentWithChildrenProps } from 'shared/props'
import { LandingSlice } from '@increaser/ui/ui/landing/LandingSlice'
import { Spacer } from '@increaser/ui/ui/Spacer'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

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

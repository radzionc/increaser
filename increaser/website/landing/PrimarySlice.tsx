import { Text } from '@lib/ui/text'
import { VStack } from '@lib/ui/layout/Stack'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { signUpUrl } from '../config'
import { Button } from '@lib/ui/buttons/Button'
import styled from 'styled-components'
import { centeredContentColumn } from '@lib/ui/css/slice'
import { websiteConfig } from '@lib/ui/website/config'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { verticalPadding } from '@lib/ui/css/verticalPadding'

const Container = styled.div`
  ${centeredContentColumn({
    contentMaxWidth: websiteConfig.contentMaxWidth,
  })}
  min-height: calc(100vh - ${toSizeUnit(websiteConfig.headerHeight)});
  ${verticalPadding(20)};
`

export const PrimarySlice = () => (
  <Container>
    <VStack
      gap={40}
      fullWidth
      fullHeight
      justifyContent="center"
      alignItems="center"
    >
      <VStack alignItems="center" gap={8}>
        <Text centered height="large" color="contrast" as="h1">
          From Chaos to Clarity
          <br /> Transforms Your Workday
          <br /> into Productive Bliss
        </Text>
        <Text centered>
          Crafted with Remote Workers&apos; Needs at the Forefront
        </Text>
      </VStack>
      <ExternalLink to={signUpUrl}>
        <Button as="div" kind="primary" size="xl">
          Start now
        </Button>
      </ExternalLink>
    </VStack>
  </Container>
)

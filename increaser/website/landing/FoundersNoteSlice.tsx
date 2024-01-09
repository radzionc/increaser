import { HStack, VStack } from '@lib/ui/layout/Stack'

import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { FounderSignature } from './FounderSignature'
import { CoverImage } from '@lib/ui/images/CoverImage'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { round } from '@lib/ui/css/round'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'

const Container = styled(VStack)`
  gap: 16px;
  max-width: 620px;
  line-height: 1.5;
`

const Image = styled(CoverImage)`
  ${sameDimensions(64)}
  ${round};
  border: 2px solid ${getColor('primary')};
  @media (max-width: 600px) {
    ${sameDimensions(36)}
  }
`

const SignutureWrapper = styled(IconWrapper)`
  color: ${getColor('contrast')};
  font-size: 32px;
  @media (max-width: 600px) {
    font-size: 24px;
  }
`

export const FoundersNoteSlice = () => {
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader title="Welcome to Your Productivity Partner Increaser" />
        <Container>
          <Text>
            I'm Radzion, the creator of Increaser. This project started as my
            own quest to tackle the productivity challenges that knowledge
            workers and students face in today's digital age. As a software
            engineer, I too struggled to find that perfect balance between work
            and life, which led me to develop Increaser.
          </Text>
          <Text>
            Increaser is built on a straightforward yet effective concept: using
            structured time to enhance focus and productivity. It's not just
            about managing your tasks; it's about optimizing the way you work
            and live. This tool is my solution to the common pitfalls of remote
            work and the distractions of a hyper-connected world.
          </Text>
          <Text>
            As a web app accessible on any device, Increaser is a personal
            assistant for your work life. It's an extension of my own practices,
            refined over years of balancing a full-time job with the development
            of this app.
          </Text>
          <Text>
            As a web app accessible on any device, Increaser is a personal
            assistant for your work life. It's an extension of my own practices,
            refined over years of balancing a full-time job with the development
            of this app.
          </Text>
          <Text>
            I invite you to try Increaser, not just as a tool but as a new
            approach to productivity. Your feedback is invaluable, helping shape
            Increaser's future and ensuring it continues to meet your needs.
          </Text>
          <Text>
            Join us in this journey to smarter, more efficient work habits.
            Together, let's make every minute productive.
          </Text>
          <HStack gap={20} alignItems="center">
            <SafeImage
              fallback={null}
              src="/images/founder-avatar.webp"
              render={(props) => <Image alt="Founder" {...props} />}
            />
            <SignutureWrapper>
              <FounderSignature />
            </SignutureWrapper>
          </HStack>
        </Container>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}

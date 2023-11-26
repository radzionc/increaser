import styled, { useTheme } from 'styled-components'
import { IntersectionAware } from '@increaser/ui/IntersectionAware'
import { LandingSlice } from '@increaser/ui/landing/LandingSlice'
import { VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { HighlightedText } from '@increaser/ui/text/HighlightedText'

import { CTA } from './CTA'

const Wrapper = styled(LandingSlice)`
  padding-top: 80px;
`

const Container = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  margin-top: 40px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(200px, 1fr);
  }
`

const FounderImage = styled.div`
  min-height: 620px;
  height: 100%;
  background-image: url('/images/memoji-smile.webp');
  background-size: 400px;
  background-repeat: no-repeat;
  background-position: center;
`

export const FounderNote = () => {
  const {
    colors: { getLabelColor },
  } = useTheme()

  return (
    <IntersectionAware<HTMLDivElement>
      render={({ ref, wasIntersected }) => (
        <Wrapper ref={ref}>
          <Container>
            {wasIntersected && <FounderImage />}
            <VStack alignItems="start" gap={40}>
              <Text weight="bold" size={24}>
                Hello 👋 I'm Radzion,
                <br />{' '}
                <Text as="span" color="supporting">
                  Founder at Increaser
                </Text>
              </Text>
              <Text as="div" size={20} color="supporting" weight="semibold">
                <VStack fullWidth gap={16}>
                  <Text>
                    I've been working as a{' '}
                    <HighlightedText as="em" $color={getLabelColor(0)}>
                      remote programmer
                    </HighlightedText>{' '}
                    for a few years now. While freedom from an office gave me
                    more flexibility, I{' '}
                    <HighlightedText as="em" $color={getLabelColor(1)}>
                      failed to improve my lifestyle
                    </HighlightedText>
                    . I couldn't balance my job and projects, and I didn't have
                    the consistency to move things forward. Instead of having a
                    quality chill time, I procrastinated, dragged work until
                    late, and had trouble falling asleep.
                  </Text>
                  <Text>
                    I tried time tracking and the Pomodoro timer to fix my work
                    habits. While those tools made me more time-aware, it wasn't
                    enough. I needed a holistic solution that doesn't only make
                    you more productive but also helps you live a{' '}
                    <HighlightedText as="em" $color={getLabelColor(2)}>
                      happier, balanced life
                    </HighlightedText>
                    .
                  </Text>
                  <Text>
                    Now I'm working on Increaser - an evolving{' '}
                    <HighlightedText as="em" $color={getLabelColor(3)}>
                      toolkit for remote people with ambitions
                    </HighlightedText>
                    . Our goal is to give you the necessary tools and guidance
                    for a better, more productive lifestyle. Let's go after it!
                  </Text>
                </VStack>
              </Text>
              <CTA />
              <div />
            </VStack>
          </Container>
        </Wrapper>
      )}
    />
  )
}

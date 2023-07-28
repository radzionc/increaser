import { ReactNode } from 'react'
import styled from 'styled-components'

import { LandingSlice } from './LandingSlice'
import { reverseIf } from '../../shared/utils/reverseIf'
import { IntersectionAware } from '../IntersectionAware'
import { VStack } from '../Stack'
import { Text } from '../Text'
import { getColor } from '../theme/getters'

type StartsWith = 'preview' | 'info'

interface Props {
  title: ReactNode
  description?: ReactNode
  cta: ReactNode
  renderPreview: () => ReactNode
  startsWith: StartsWith
}

const Wrapper = styled(LandingSlice)`
  padding: 40px 0;
  /* min-height: 100vh; */
`

const Container = styled.div<{ isInfoFirst: boolean }>`
  display: grid;
  grid-gap: 40px;
  align-items: center;
  grid-template-columns: ${({ isInfoFirst }) =>
    reverseIf(['3fr', '2fr'], isInfoFirst).join(' ')};

  > * {
    :last-child {
      justify-self: end;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(200px, 1fr);
  }
`

const LandingText = styled(Text)`
  text-transform: uppercase;
  b {
    color: ${getColor('primary')};
  }
`

export const LandingFeatureSlice = ({
  title,
  description,
  renderPreview,
  startsWith,
  cta,
}: Props) => {
  const info = (
    <VStack key="info" alignItems="start" gap={40}>
      <LandingText
        style={{ textTransform: 'uppercase' }}
        height="large"
        weight="bold"
        size={32}
        as="h2"
        color="contrast"
      >
        {title}
        <br />
        <Text as="span" color="supporting">
          {description}
        </Text>
      </LandingText>
      {cta}
    </VStack>
  )

  const isInfoFirst = startsWith === 'info'

  return (
    <IntersectionAware<HTMLDivElement>
      render={({ ref, isIntersecting }) => {
        const content = reverseIf(
          [isIntersecting ? renderPreview() : null, info],
          isInfoFirst,
        )

        return (
          <Wrapper ref={ref}>
            <Container isInfoFirst={isInfoFirst}>{content}</Container>
          </Wrapper>
        )
      }}
    />
  )
}

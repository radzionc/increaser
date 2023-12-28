import { ReactNode } from 'react'
import styled from 'styled-components'
import { HSLA } from '@lib/ui/colors/HSLA'
import { Panel } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { S_IN_HOUR } from '@lib/utils/time'
import { EmojiHeavyBlock } from '@increaser/app/ui/EmojiHeavyBlock'

interface Props {
  name?: string
  total: number
  color: HSLA
  emoji: string
  optionsOpener?: ReactNode
}

const OptionsWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

const Container = styled(Panel)`
  overflow: hidden;
  position: relative;
`

const Color = styled.div<{ $color: HSLA }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 8px;
  background: ${({ $color }) => $color.toCssValue()};
`

export const ProjectCard = ({
  total,
  emoji,
  name,
  optionsOpener,
  color,
}: Props) => {
  return (
    <Container width="100%">
      <Color $color={color} />
      <VStack style={{ position: 'relative' }} fullWidth gap={4}>
        <OptionsWrapper>{optionsOpener}</OptionsWrapper>
        <EmojiHeavyBlock
          emoji={emoji}
          title={name}
          subtitle={
            <>
              <Text as="span" weight="bold" color="regular">
                {Math.round(total / S_IN_HOUR)} hours
              </Text>{' '}
              total
            </>
          }
        />
      </VStack>
    </Container>
  )
}

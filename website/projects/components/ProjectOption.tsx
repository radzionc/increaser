import { formatDuration } from '@increaser/utils/time/formatDuration'
import styled from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { UnstyledButton } from '@increaser/ui/ui/buttons/UnstyledButton'
import { ArrowRightIcon } from '@increaser/ui/ui/icons/ArrowRightIcon'
import { inputBorderRadiusCSS } from '@increaser/ui/ui/inputs/config'
import { HStack } from '@increaser/ui/ui/Stack'
import { EmojiHeavyBlock } from 'ui/EmojiHeavyBlock'

interface Props {
  name: string
  emoji: string
  onClick: () => void
  minutes?: number
}

const Container = styled(UnstyledButton)`
  ${inputBorderRadiusCSS}
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
  padding: 8px 16px;

  ${defaultTransitionCSS};

  :hover {
    background: ${({ theme }) => theme.colors.mistExtra.toCssValue()};
  }
`

const IconWrapper = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};
  font-size: 24px;
`

export const ProjectOption = ({ name, emoji, onClick, minutes = 0 }: Props) => {
  return (
    <Container onClick={onClick}>
      <HStack
        gap={8}
        alignItems="center"
        fullWidth
        justifyContent="space-between"
      >
        <HStack alignItems="center" gap={8}>
          <EmojiHeavyBlock
            emoji={emoji}
            title={name}
            subtitle={formatDuration(minutes, 'min')}
          />
        </HStack>
        <IconWrapper>
          <ArrowRightIcon />
        </IconWrapper>
      </HStack>
    </Container>
  )
}

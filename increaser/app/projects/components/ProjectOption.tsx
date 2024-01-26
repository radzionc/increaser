import { formatDuration } from '@lib/utils/time/formatDuration'
import styled from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { ArrowRightIcon } from '@lib/ui/icons/ArrowRightIcon'
import { HStack } from '@lib/ui/layout/Stack'
import { EmojiHeavyBlock } from '@increaser/app/ui/EmojiHeavyBlock'
import { borderRadius } from '@lib/ui/css/borderRadius'

interface Props {
  name: string
  emoji: string
  onClick: () => void
  minutes?: number
}

const Container = styled(UnstyledButton)`
  ${borderRadius.s}
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
  padding: 8px 16px;

  ${transition};

  &:hover {
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
            subtitle={formatDuration(minutes, 'min', { maxUnit: 'h' })}
          />
        </HStack>
        <IconWrapper>
          <ArrowRightIcon />
        </IconWrapper>
      </HStack>
    </Container>
  )
}

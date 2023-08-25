import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { formatDurationAsADigitalClock } from '@increaser/utils/formatDuration'
import styled, { css, keyframes } from 'styled-components'

interface Props {
  getSeconds: (now: number) => number
}

const CharacterContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
`

const getAnimation = (id: string) => keyframes`
  0% {
    --id: ${id};
    bottom: 0%;
  }
`

const Character = styled(Text)<{ animationId?: string }>`
  position: absolute;
  bottom: -100%;
  ${({ animationId }) =>
    animationId &&
    css`
      animation: ${getAnimation(animationId)} 640ms ease-in-out;
    `}
`

export const SlidingTime = ({ getSeconds }: Props) => {
  const now = useRhythmicRerender()

  const seconds = getSeconds(now)
  const timeString = formatDurationAsADigitalClock(seconds)
  const previousTimeString = formatDurationAsADigitalClock(
    Math.max(0, seconds - 1),
  )

  return (
    <HStack>
      {timeString.split('').map((character, index) => {
        const previousCharacter = previousTimeString[index]
        const animationId =
          previousCharacter !== character
            ? `${previousCharacter}${character}`
            : undefined
        const color = index > timeString.length - 4 ? 'supporting' : 'regular'

        return (
          <CharacterContainer key={index}>
            <Text style={{ visibility: 'hidden' }}>{character}</Text>
            <Character as="div" color={color} animationId={animationId}>
              <Text>{character}</Text>
              <Text>{previousCharacter}</Text>
            </Character>
          </CharacterContainer>
        )
      })}
    </HStack>
  )
}

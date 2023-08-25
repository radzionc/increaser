import { useFocus } from 'focus/hooks/useFocus'
import { useProjects } from 'projects/hooks/useProjects'
import { toPercents } from '@increaser/utils/toPercents'
import styled from 'styled-components'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { CheckIcon } from '@increaser/ui/ui/icons/CheckIcon'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { getSameDimensionsCSS } from '@increaser/ui/ui/utils/getSameDimensionsCSS'
import { roundedCSS } from '@increaser/ui/ui/utils/roundedCSS'
import { AbsolutelyCentered } from 'ui/AbsolutelyCentered'
import { useCurrentFocus } from './CurrentFocusProvider'

const Wrapper = styled.div`
  position: absolute;
  left: -16px;
`

const Container = styled.div<{ $color: HSLA }>`
  ${roundedCSS}
  ${getSameDimensionsCSS(32)};
  background: ${({ theme }) => theme.colors.background.toCssValue()};

  border: 2px solid ${({ $color }) => $color.toCssValue()};

  ${centerContentCSS};
  font-size: 14px;
  position: relative;
`

export const FocusSuccess = () => {
  const { initialFocusDuration, focusDuration } = useFocus()
  const { projectId } = useCurrentFocus()
  const { projectsRecord } = useProjects()
  const project = projectsRecord[projectId]

  if (initialFocusDuration >= focusDuration) return null

  return (
    <AbsolutelyCentered top={toPercents(initialFocusDuration / focusDuration)}>
      <Wrapper>
        <HStack alignItems="center" gap={4}>
          <Container $color={project.hslaColor}>
            <CheckIcon />
          </Container>
          <Text weight="semibold" size={14} nowrap>
            {initialFocusDuration} min
          </Text>
        </HStack>
      </Wrapper>
    </AbsolutelyCentered>
  )
}

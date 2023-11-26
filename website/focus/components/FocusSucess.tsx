import { useFocus } from 'focus/hooks/useFocus'
import { useProjects } from 'projects/hooks/useProjects'
import { toPercents } from '@increaser/utils/toPercents'
import styled from 'styled-components'
import { HSLA } from '@increaser/ui/colors/HSLA'
import { CheckIcon } from '@increaser/ui/icons/CheckIcon'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { centerContent } from '@increaser/ui/css/centerContent'
import { sameDimensions } from '@increaser/ui/css/sameDimensions'
import { round } from '@increaser/ui/css/round'
import { AbsolutelyCentered } from 'ui/AbsolutelyCentered'
import { useCurrentFocus } from './CurrentFocusProvider'

const Wrapper = styled.div`
  position: absolute;
  left: -16px;
`

const Container = styled.div<{ $color: HSLA }>`
  ${round}
  ${sameDimensions(32)};
  background: ${({ theme }) => theme.colors.background.toCssValue()};

  border: 2px solid ${({ $color }) => $color.toCssValue()};

  ${centerContent};
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

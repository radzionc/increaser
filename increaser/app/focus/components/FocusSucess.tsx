import { useFocus } from '@increaser/app/focus/hooks/useFocus'
import { useProjects } from '@increaser/app/projects/hooks/useProjects'
import { toPercents } from '@lib/utils/toPercents'
import styled from 'styled-components'
import { HSLA } from '@lib/ui/colors/HSLA'
import { CheckIcon } from '@lib/ui/icons/CheckIcon'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { round } from '@lib/ui/css/round'
import { AbsolutelyCentered } from '@increaser/app/ui/AbsolutelyCentered'
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

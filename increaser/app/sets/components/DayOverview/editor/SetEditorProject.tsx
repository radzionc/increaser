import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import styled from 'styled-components'
import { useActiveSet } from '../ActiveSetProvider'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useActiveSetType } from '../hooks/useActiveSetType'
import { ProjectSelector } from '@increaser/ui/projects/ProjectSelector'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { headerHeightInPx } from '../config'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { getColor } from '@lib/ui/theme/getters'
import { HStack } from '@lib/ui/layout/Stack'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'

const Toggle = styled(CollapsableStateIndicator)`
  font-size: 16px;
`

const Container = styled(UnstyledButton)`
  ${verticalPadding(0)};
  font-size: 14px;
  font-weight: 500;
  height: ${toSizeUnit(headerHeightInPx)};
  position: relative;

  outline: none;

  &:hover {
    color: ${getColor('contrast')};
    background: ${getColor('foreground')};
  }
`

export const SetEditorProject = () => {
  const [activeSet, setActiveSet] = useActiveSet()
  const { projects } = useAssertUserState()
  const { projectId } = shouldBePresent(activeSet)

  const { emoji, name } = projects[projectId]

  const type = useActiveSetType()

  return (
    <ProjectSelector
      floatingOptionsWidthSameAsOpener={true}
      renderOpener={(props) => (
        <Container type="button" {...props}>
          <HStack fullWidth alignItems="center" justifyContent="space-between">
            <Text>
              <EmojiTextPrefix emoji={emoji} /> {name}
            </Text>
            <Toggle isOpen={props.isActive} />
          </HStack>
        </Container>
      )}
      value={projectId}
      onChange={(projectId) =>
        setActiveSet((prev) => ({ ...shouldBePresent(prev), projectId }))
      }
      autoFocus={type === 'new'}
    />
  )
}

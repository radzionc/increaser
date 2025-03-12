import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { ExpandableSelectorToggle } from '@lib/ui/select/ExpandableSelectorToggle'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { ProjectSelector } from '@product/ui/projects/ProjectSelector'
import { useUser } from '@product/ui/user/state/user'

import { useActiveSet } from '../ActiveSetProvider'
import { useActiveSetType } from '../overview/hooks/useActiveSetType'

export const SetEditorProject = () => {
  const [activeSet, setActiveSet] = usePresentState(useActiveSet())
  const { projects } = useUser()

  const { emoji, name } = projects[activeSet.projectId]

  const type = useActiveSetType()

  return (
    <ProjectSelector
      renderOpener={(props) => (
        <ExpandableSelectorContainer style={{ maxWidth: 160 }} {...props}>
          <OptionContent>
            <Text>
              <EmojiTextPrefix emoji={emoji} /> {name}
            </Text>
          </OptionContent>
          <ExpandableSelectorToggle isOpen={!!props.isActive} />
        </ExpandableSelectorContainer>
      )}
      value={activeSet.projectId}
      onChange={(projectId) =>
        setActiveSet((prev) => ({ ...shouldBePresent(prev), projectId }))
      }
      autoFocus={type === 'new'}
    />
  )
}

import { Text } from '@lib/ui/text'
import { useTrackTime } from './state/TrackTimeContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { ProjectSelector } from '@increaser/ui/projects/ProjectSelector'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { ExpandableSelectorToggle } from '@lib/ui/select/ExpandableSelectorToggle'

export const TrackProjectSelector = () => {
  const { currentSet, setState } = useTrackTime()
  const { projectId } = shouldBePresent(currentSet)
  const { projects } = useAssertUserState()

  return (
    <ProjectSelector
      renderOpener={(props) => (
        <ExpandableSelectorContainer {...props}>
          <OptionContent>
            <>
              <Text color="contrast">{projects[projectId].emoji}</Text>
              <Text>{projects[projectId].name}</Text>
            </>
          </OptionContent>
          <ExpandableSelectorToggle isOpen={props.isActive} />
        </ExpandableSelectorContainer>
      )}
      value={projectId}
      onChange={(projectId) => {
        setState((state) => ({
          ...state,
          currentSet: {
            ...shouldBePresent(state.currentSet),
            projectId,
          },
        }))
      }}
    />
  )
}

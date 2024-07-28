import { InputProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '../user/UserStateContext'
import { ExpandableInputOpener } from '@lib/ui/inputs/ExpandableInputOpener'
import { ProjectSelector } from '@increaser/ui/projects/ProjectSelector'

export const TaskProjectSelector = ({
  value,
  onChange,
  autoFocus = false,
}: InputProps<string> & { autoFocus?: boolean }) => {
  const { projects } = useAssertUserState()

  return (
    <ProjectSelector
      renderOpener={(props) => (
        <ExpandableInputOpener type="button" {...props}>
          <Text color="contrast" size={32}>
            {projects[value].emoji}
          </Text>
        </ExpandableInputOpener>
      )}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
    />
  )
}

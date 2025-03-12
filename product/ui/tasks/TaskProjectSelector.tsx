import { ExpandableInputOpener } from '@lib/ui/inputs/ExpandableInputOpener'
import { InputProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { ProjectSelector } from '@product/ui/projects/ProjectSelector'
import { useUser } from '@product/ui/user/state/user'

export const TaskProjectSelector = ({
  value,
  onChange,
  autoFocus = false,
}: InputProps<string> & { autoFocus?: boolean }) => {
  const { projects } = useUser()

  return (
    <ProjectSelector
      renderOpener={(props) => (
        <ExpandableInputOpener {...props}>
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

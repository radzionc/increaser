import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '../user/UserStateContext'
import { useActiveProjects } from '../projects/hooks/useActiveProjects'

export const TaskProjectSelector = ({
  value,
  onChange,
}: InputProps<string>) => {
  const { projects } = useAssertUserState()
  const activeProjects = useActiveProjects()

  return (
    <ExpandableSelector
      style={{ width: 142 }}
      value={value}
      onChange={onChange}
      options={activeProjects.map((project) => project.id)}
      getOptionKey={(option) => option}
      returnFocus
      renderOption={(option) => (
        <>
          <Text color="contrast">{projects[option].emoji}</Text>
          <Text>{option ? projects[option].name : 'No project'}</Text>
        </>
      )}
    />
  )
}

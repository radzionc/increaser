import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { InputProps, UIComponentProps } from '@lib/ui/props'
import { useAssertUserState } from '../user/UserStateContext'
import { useActiveProjects } from './hooks/useActiveProjects'

export const ActiveProjectSelector = (
  props: InputProps<string> & UIComponentProps,
) => {
  const { projects } = useAssertUserState()
  const activeProjects = useActiveProjects()

  return (
    <ExpandableSelector
      {...props}
      options={activeProjects.map((project) => project.id)}
      getOptionKey={(option) => option}
      getOptionName={(option) => projects[option].name}
      renderOption={(option) => (
        <>
          <Text color="contrast">{projects[option].emoji}</Text>
          <Text>{projects[option].name}</Text>
        </>
      )}
    />
  )
}

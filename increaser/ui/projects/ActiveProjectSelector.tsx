import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { InputProps, UIComponentProps } from '@lib/ui/props'

export const ActiveProjectSelector = (
  props: InputProps<string> & UIComponentProps,
) => {
  const { activeProjects, projectsRecord } = useProjects()

  return (
    <ExpandableSelector
      {...props}
      options={activeProjects.map((project) => project.id)}
      getOptionKey={(option) => option}
      renderOption={(option) => (
        <>
          <Text color="contrast">{projectsRecord[option].emoji}</Text>
          <Text>{projectsRecord[option].name}</Text>
        </>
      )}
    />
  )
}

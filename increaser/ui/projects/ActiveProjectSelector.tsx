import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { InputProps } from '@lib/ui/props'

export const ActiveProjectSelector = ({
  value,
  onChange,
}: InputProps<string>) => {
  const { activeProjects, projectsRecord } = useProjects()

  return (
    <ExpandableSelector
      style={{ width: 142 }}
      value={value}
      onChange={onChange}
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

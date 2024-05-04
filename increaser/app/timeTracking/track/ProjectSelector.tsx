import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'

export const ProjectSelector = ({ value, onChange }: InputProps<string>) => {
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
          <Text>{option ? projectsRecord[option].name : 'All projects'}</Text>
        </>
      )}
    />
  )
}

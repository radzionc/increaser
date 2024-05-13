import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'

export const TaskProjectSelector = ({
  value,
  onChange,
}: InputProps<string | null>) => {
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
          {option && (
            <Text color="contrast">{projectsRecord[option].emoji}</Text>
          )}
          <Text>{option ? projectsRecord[option].name : 'No project'}</Text>
        </>
      )}
    />
  )
}

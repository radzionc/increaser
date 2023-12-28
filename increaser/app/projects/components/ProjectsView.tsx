import { useProjects } from '@increaser/app/projects/hooks/useProjects'
import { getViewSetup } from '@lib/ui/view/getViewSetup'
import { ViewSelector } from '@lib/ui/inputs/Select/ViewSelector'

export const habitViews = ['active', 'inactive'] as const
export type ProjectsView = (typeof habitViews)[number]

export const {
  ViewProvider: ProjectsViewProvider,
  useView: useProjectsView,
  RenderView: RenderProjectsView,
} = getViewSetup<ProjectsView>('active', 'ProjectsView')

const habitViewName: Record<ProjectsView, string> = {
  active: 'Active',
  inactive: 'Inactive',
}

export const ProjectsViewSelector = () => {
  const { view, setView } = useProjectsView()
  const { activeProjects, inactiveProjects } = useProjects()

  return (
    <ViewSelector
      options={habitViews}
      getName={(option) => {
        const count =
          option === 'active' ? activeProjects.length : inactiveProjects.length
        return `${habitViewName[option]}${count ? ` (${count})` : ''}`
      }}
      selectedOption={view}
      onSelect={setView}
      groupName="habit-view"
    />
  )
}

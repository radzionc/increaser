import { makeProjectsPage } from '@increaser/app/layout/makeProjectsPage'
import { useRouter } from 'next/router'
import { ProjectView } from '@increaser/app/projects/components/ProjectView'
import { CurrentProjectProvider } from '@increaser/app/projects/components/ProjectView/CurrentProjectProvider'
import { useEffect } from 'react'
import { AppPath } from '@increaser/ui/navigation/AppPath'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'

interface ProjectPageParams {
  id?: string
}

export default makeProjectsPage(() => {
  const { projectsRecord } = useProjects()
  const router = useRouter()

  const projectId = (router.query as ProjectPageParams).id
  const project = projectId ? projectsRecord[projectId] : undefined

  useEffect(() => {
    if (!project) {
      router.push(AppPath.Projects)
    }
  }, [project, router])

  if (!project) return null

  return (
    <CurrentProjectProvider value={project}>
      <ProjectView />
    </CurrentProjectProvider>
  )
})

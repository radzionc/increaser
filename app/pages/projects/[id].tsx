import { Page } from 'components/Page'
import { useRouter } from 'next/router'
import { ProjectView } from 'projects/components/ProjectView'
import { CurrentProjectProvider } from 'projects/components/ProjectView/CurrentProjectProvider'
import { ProjectsLayout } from 'projects/components/ProjectsLayout'
import { useProjects } from 'projects/hooks/useProjects'
import { useEffect } from 'react'
import { Path } from 'router/Path'

interface ProjectPageParams {
  id?: string
}

const ProjectPage: Page = () => {
  const { projectsRecord } = useProjects()
  const router = useRouter()

  const projectId = (router.query as ProjectPageParams).id
  const project = projectId ? projectsRecord[projectId] : undefined

  useEffect(() => {
    if (!project) {
      router.push(Path.Projects)
    }
  }, [project, router])

  if (!project) return null

  return (
    <CurrentProjectProvider value={project}>
      <ProjectView />
    </CurrentProjectProvider>
  )
}

export default ProjectPage

ProjectPage.getLayout = function getLayout(page) {
  return <ProjectsLayout>{page}</ProjectsLayout>
}

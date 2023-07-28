import { Page } from 'components/Page'
import { useRouter } from 'next/router'
import { ProjectsLayout } from 'projects/components/ProjectsLayout'
import { useProjects } from 'projects/hooks/useProjects'
import { useEffect } from 'react'
import { Path, getProjectPath } from 'router/Path'

const ProjectsPage: Page = () => {
  const { projects } = useProjects()
  const router = useRouter()

  useEffect(() => {
    if (projects.length === 0) {
      router.replace(Path.CreateProject)
    } else {
      router.replace(getProjectPath(projects[0].id))
    }
  }, [projects, router])

  return null
}

export default ProjectsPage

ProjectsPage.getLayout = function getLayout(page) {
  return <ProjectsLayout>{page}</ProjectsLayout>
}

import { makeProjectsPage } from '@increaser/app/layout/makeProjectsPage'
import { useRouter } from 'next/router'
import { useProjects } from '@increaser/app/projects/hooks/useProjects'
import { useEffect } from 'react'
import { AppPath, getProjectPath } from '@increaser/ui/navigation/AppPath'

export default makeProjectsPage(() => {
  const { projects } = useProjects()
  const router = useRouter()

  useEffect(() => {
    if (projects.length === 0) {
      router.replace(AppPath.CreateProject)
    } else {
      router.replace(getProjectPath(projects[0].id))
    }
  }, [projects, router])

  return null
})

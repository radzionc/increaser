import { Page } from 'components/Page'
import { CreateProjectView } from 'projects/components/ProjectsExplorer/CreateProjectView'
import { ProjectsLayout } from 'projects/components/ProjectsLayout'

const CreateProjectPage: Page = () => {
  return <CreateProjectView />
}

export default CreateProjectPage

CreateProjectPage.getLayout = function getLayout(page) {
  return <ProjectsLayout>{page}</ProjectsLayout>
}

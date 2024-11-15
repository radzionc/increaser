import { Page } from '@lib/next-ui/Page'
import { Ideas } from '@increaser/ui/ideas/Ideas'
import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { AddIdea } from '@increaser/ui/ideas/AddIdea'

export const IdeasPage: Page = () => {
  return (
    <>
      <PageHeaderControlsArea>
        <AddIdea />
      </PageHeaderControlsArea>
      <Ideas />
    </>
  )
}

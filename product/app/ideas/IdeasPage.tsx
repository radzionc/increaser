import { Page } from '@lib/next-ui/Page'
import { PageHeaderControlsArea } from '@product/app/ui/page/header/PageHeaderControlsAreaProvider'
import { AddIdea } from '@product/ui/ideas/AddIdea'
import { Ideas } from '@product/ui/ideas/Ideas'

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

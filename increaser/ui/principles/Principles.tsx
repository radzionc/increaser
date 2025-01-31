import { AddPrinciple } from './AddPrinciple'
import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { PrincipleCategoryFilter } from './categoryFilter/PrincipleCategoryFilter'

import { PrinciplesPageContent } from './PrinciplesPageContent'

export const Principles = () => {
  return (
    <>
      <PageHeaderControlsArea>
        <PrincipleCategoryFilter />
        <AddPrinciple />
      </PageHeaderControlsArea>
      <PrinciplesPageContent />
    </>
  )
}

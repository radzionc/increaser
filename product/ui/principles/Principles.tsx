import { PageHeaderControlsArea } from '@product/app/ui/page/header/PageHeaderControlsAreaProvider'

import { AddPrinciple } from './AddPrinciple'
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

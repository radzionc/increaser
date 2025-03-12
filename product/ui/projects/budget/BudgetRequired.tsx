import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { ChildrenProp } from '@lib/ui/props'
import { isEmpty } from '@lib/utils/array/isEmpty'

import { useBudgetedProjects } from './hooks/useBudgetedProjects'

export const BudgetRequired = ({ children }: ChildrenProp) => {
  const budgetedProjects = useBudgetedProjects()

  return (
    <>
      {isEmpty(budgetedProjects) ? (
        <ShyInfoBlock>
          Set budget for your projects to track their progress
        </ShyInfoBlock>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

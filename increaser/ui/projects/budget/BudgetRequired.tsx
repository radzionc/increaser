import { isEmpty } from '@lib/utils/array/isEmpty'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useBudgetedProjects } from './hooks/useBudgetedProjects'

export const BudgetRequired = ({ children }: ComponentWithChildrenProps) => {
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

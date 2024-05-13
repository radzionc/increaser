import { isEmpty } from '@lib/utils/array/isEmpty'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { useProjectsWithGoals } from './hooks/useProjectsWithGoals'
import { ComponentWithChildrenProps } from '@lib/ui/props'

export const GoalsRequired = ({ children }: ComponentWithChildrenProps) => {
  const projectsWithGoals = useProjectsWithGoals()

  return (
    <>
      {isEmpty(projectsWithGoals) ? (
        <ShyInfoBlock>
          Set goals for your projects to track their progress
        </ShyInfoBlock>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

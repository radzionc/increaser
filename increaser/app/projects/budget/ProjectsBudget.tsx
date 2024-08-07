import { ManageProjectsBudget } from '@increaser/ui/projects/budget/ManageProjectsBudget'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { ProjectsBudgetReport } from '@increaser/ui/projects/budget/ProjectsBudgetReport'
import React from 'react'

export const ProjectsBudget = () => {
  return (
    <UniformColumnGrid fullWidth minChildrenWidth={320} gap={40}>
      <ManageProjectsBudget />
      <ProjectsBudgetReport />
    </UniformColumnGrid>
  )
}

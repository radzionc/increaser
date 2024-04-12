import React, { useMemo, useState } from 'react'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { Text } from '@lib/ui/text'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { VStack } from '@lib/ui/layout/Stack'
import { toPercents } from '@lib/utils/toPercents'
import { useBudgetedProjects } from '../hooks/useBudgetedProjects'
import { BreakdownContainer } from '../../../timeTracking/report/ProjectsDistributionBreakdown/BreakdownContainer'
import { InteractiveRow } from '../../../timeTracking/report/ProjectsDistributionBreakdown/InteractiveRow'
import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { BudgetBreakdownRowContent } from './BudgetBreakdownRowContent'
import { BudgetBreakdownHeader } from './BudgetBreakdownHeader'
import { ProjectIndicator } from '../../../timeTracking/report/ProjectsDistributionBreakdown/ProjectIndicator'
import { BreakdownValue } from '../../../timeTracking/report/ProjectsDistributionBreakdown/BreakdownValue'
import { sum } from '@lib/utils/array/sum'
import { ProjectGoalShyIndicator } from '../ProjectGoalShyIndicator'
import { ManageProjectBudgetOverlay } from '../ManageProjectBudgetOverlay'

export const BudgetBreakdown = () => {
  const projects = useBudgetedProjects()

  const total = useMemo(
    () => sum(projects.map((p) => p.allocatedMinutesPerWeek)),
    [projects],
  )

  const [activeProject, setActiveProject] = useState<EnhancedProject | null>(
    null,
  )

  return (
    <>
      {activeProject && (
        <ManageProjectBudgetOverlay
          project={activeProject}
          onFinish={() => setActiveProject(null)}
        />
      )}
      <BreakdownContainer>
        <BudgetBreakdownHeader />
        <SeparatedByLine fullWidth gap={12}>
          <VStack gap={2}>
            {projects.map((project) => {
              return (
                <InteractiveRow
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  isActive={false}
                >
                  <BudgetBreakdownRowContent>
                    <ProjectIndicator
                      style={{
                        background: project.hslaColor.toCssValue(),
                      }}
                    />
                    <Text cropped>{project.name}</Text>
                    <Text>
                      {project.goal ? (
                        <ProjectGoalShyIndicator value={project.goal} />
                      ) : (
                        '-'
                      )}
                    </Text>
                    <BreakdownValue
                      value={formatDuration(
                        project.allocatedMinutesPerWeek,
                        'min',
                        {
                          maxUnit: 'h',
                          minUnit: 'h',
                        },
                      )}
                    />
                    <BreakdownValue
                      value={toPercents(
                        project.allocatedMinutesPerWeek / total,
                        'round',
                      )}
                    />
                  </BudgetBreakdownRowContent>
                </InteractiveRow>
              )
            })}
          </VStack>
        </SeparatedByLine>
      </BreakdownContainer>
    </>
  )
}

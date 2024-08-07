import { useId } from 'react'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import {
  projectsBudgetReportViewName,
  projectsBudgetReportViews,
  useProjectsBudgetReportView,
} from './useProjectsBudgetReportView'

export const ProjectsBudgetReportViewSelector = () => {
  const id = useId()
  const [view, setView] = useProjectsBudgetReportView()

  return (
    <HStack gap={4}>
      {projectsBudgetReportViews.map((value) => (
        <TabNavigationItem
          isSelected={value === view}
          onSelect={() => setView(value)}
          value={value}
          key={value}
          groupName={id}
        >
          <Text>{projectsBudgetReportViewName[value]}</Text>
        </TabNavigationItem>
      ))}
    </HStack>
  )
}

import { VStack } from '@lib/ui/layout/Stack'
import { usePlanDayCompletion } from './hooks/usePlanDayCompletion'
import { FlowNavigationItem } from '@lib/ui/flow/FlowNavigationItem'
import { useCurrentPageView } from '../../navigation/hooks/useCurrentPageView'
import { appPageViews, getAppPath } from '@increaser/ui/navigation/app'
import { planDayViewName } from './PlanDayStep'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Item = styled(FlowNavigationItem)`
  font-size: 14px;
`

export const PlanDayOverview = () => {
  const currentStep = useCurrentPageView('plan')
  const completion = usePlanDayCompletion()
  const { push } = useRouter()

  return (
    <VStack>
      {appPageViews.plan.map((step) => {
        const isCompleted = completion[step]
        const isCurrent = currentStep === step

        return (
          <Item
            key={step}
            isActive={isCurrent}
            isCompleted={isCompleted}
            isEnabled={true}
            onClick={() => push(getAppPath('plan', step))}
            name={planDayViewName[step]}
          />
        )
      })}
    </VStack>
  )
}

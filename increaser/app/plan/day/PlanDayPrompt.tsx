import Link from 'next/link'
import { NavigationItem } from '../../ui/Navigation/Sidebar/NavigationItem'
import { navigationPathInfo } from '../../ui/Navigation/navigationPathInfo'
import { AnimatedCoffeeIcon } from './AnimatedCoffeeIcon'
import { useCurrentPage } from '../../navigation/hooks/useCurrentPage'
import { getAppPath } from '@increaser/ui/navigation/app'
import { useIsTodayPlanned } from './hooks/useIsTodayPlanned'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { getCurrentPlanDayStep } from './utils/getCurrentPlanDayStep'
import { usePlanDayCompletion } from './hooks/usePlanDayCompletion'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { PlanDayActiveNavigation } from './PlanDayActiveNavigation'
import { PlanDayPromptOutline } from './PlanDayPromptOutline'

const Container = styled(NavigationItem)`
  color: ${getColor('success')};
`

export const PlanDayPrompt = () => {
  const completion = usePlanDayCompletion()

  const isCompleted = useIsTodayPlanned()

  const page = useCurrentPage()
  const { name } = navigationPathInfo.plan

  const isActive = page === 'plan'

  if (isCompleted) {
    return null
  }

  if (isActive) {
    return <PlanDayActiveNavigation />
  }

  return (
    <Link
      href={getAppPath(
        'plan',
        shouldBePresent(getCurrentPlanDayStep(completion)),
      )}
    >
      <Container
        icon={<AnimatedCoffeeIcon />}
        name={name}
        isActive={isActive}
        decoration={<PlanDayPromptOutline />}
      />
    </Link>
  )
}

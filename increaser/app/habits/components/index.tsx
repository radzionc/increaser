import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'
import { ErrorBoundary } from '@increaser/app/errors/components/ErrorBoundary'
import { ErrorFallbackCard } from '@increaser/app/errors/components/ErrorFallbackCard'
import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { VStack } from '@lib/ui/layout/Stack'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'

import { ActiveHabits } from './ActiveHabits'
import { CheckTodayHabitsCard } from './CheckTodayHabitsCard'
import { CheckYesterdayHabits } from './CheckYesterdayHabits'
import { CuratedHabits } from './CuratedHabits'
import {
  HabitsViewProvider,
  HabitsViewSelector,
  RenderHabitsView,
} from './HabitsView'
import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { RequiresOnboarding } from '../../onboarding/RequiresOnboarding'

export const HabitsPage: Page = () => {
  return (
    <FixedWidthContent>
      <HabitsViewProvider>
        <PageTitle documentTitle={`🧘‍♀️ Habits`} title={<HabitsViewSelector />} />
        <VStack gap={40}>
          <ErrorBoundary fallback={<ErrorFallbackCard />}>
            <UserStateOnly>
              <RequiresOnboarding>
                <RenderHabitsView
                  my={() => (
                    <UniformColumnGrid
                      style={{ alignItems: 'start' }}
                      gap={40}
                      maxColumns={2}
                      minChildrenWidth={320}
                    >
                      <VStack gap={20}>
                        <CheckTodayHabitsCard />
                        <CheckYesterdayHabits />
                      </VStack>
                      <ActiveHabits />
                    </UniformColumnGrid>
                  )}
                  explore={() => <CuratedHabits />}
                />
              </RequiresOnboarding>
            </UserStateOnly>
          </ErrorBoundary>
        </VStack>
      </HabitsViewProvider>
    </FixedWidthContent>
  )
}

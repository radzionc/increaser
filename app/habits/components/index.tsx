import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { ErrorBoundary } from 'errors/components/ErrorBoundary'
import { ErrorFallbackCard } from 'errors/components/ErrorFallbackCard'
import { UniformColumnGrid } from '@increaser/ui/Layout/UniformColumnGrid'
import { VStack } from '@increaser/ui/layout/Stack'
import { UserStateOnly } from 'user/state/UserStateOnly'

import { ActiveHabits } from './ActiveHabits'
import { CheckTodayHabitsCard } from './CheckTodayHabitsCard'
import { CheckYesterdayHabits } from './CheckYesterdayHabits'
import { CuratedHabits } from './CuratedHabits'
import { HabitsEducationBanner } from './HabitsEducationBanner'
import {
  HabitsViewProvider,
  HabitsViewSelector,
  RenderHabitsView,
} from './HabitsView'
import { PageTitle } from 'ui/PageTitle'
import { Page } from 'layout/Page'

export const HabitsPage: Page = () => {
  return (
    <FixedWidthContent>
      <HabitsViewProvider>
        <PageTitle documentTitle={`🧘‍♀️ Habits`} title={<HabitsViewSelector />} />
        <VStack gap={40}>
          <HabitsEducationBanner />
          <ErrorBoundary fallback={<ErrorFallbackCard />}>
            <UserStateOnly>
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
            </UserStateOnly>
          </ErrorBoundary>
        </VStack>
      </HabitsViewProvider>
    </FixedWidthContent>
  )
}

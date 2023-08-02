import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { ErrorBoundary } from 'errors/components/ErrorBoundary'
import { ErrorFallbackCard } from 'errors/components/ErrorFallbackCard'
import { SameWidthChildrenRow } from '@increaser/ui/ui/Layout/SameWidthChildrenRow'
import { VStack } from '@increaser/ui/ui/Stack'
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
import { Page } from 'components/Page'

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
                  <SameWidthChildrenRow
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
                  </SameWidthChildrenRow>
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

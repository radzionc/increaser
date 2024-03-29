import { VStack } from '@lib/ui/layout/Stack'
import { Panel } from '@lib/ui/panel/Panel'
import { TrackedTimeReportHeader } from './TrackedTimeReportHeader'
import { BasedOnScreenWidth } from '@lib/ui/layout/BasedOnScreenWidth'
import { TrackedTimeReportContent } from './TrackedTimeReportContent'

export const TrackedTimeReport = () => {
  return (
    <VStack gap={16}>
      <TrackedTimeReportHeader />
      <BasedOnScreenWidth
        value={600}
        more={() => (
          <Panel kind="secondary">
            <TrackedTimeReportContent />
          </Panel>
        )}
        less={() => <TrackedTimeReportContent />}
      />
    </VStack>
  )
}

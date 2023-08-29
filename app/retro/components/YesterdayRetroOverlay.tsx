import { analytics } from 'analytics'
import { useEffect } from 'react'
import { ClosableComponentProps } from '@increaser/ui/props'
import { Modal } from '@increaser/ui/ui/Modal'
import { VStack } from '@increaser/ui/ui/Stack'

import { ReviewYesterdayHabits } from './ReviewYesterdayHabits'
import { YesterdayPerformance } from './YesterdayPerformance'
import { ContinueButton } from 'ui/ContinueButton'

export const YesterdayRetroOverlay = ({ onClose }: ClosableComponentProps) => {
  useEffect(() => {
    analytics.trackEvent('Show yesterday retro')
  }, [])

  return (
    <Modal
      onClose={onClose}
      title="Yesterday Retro"
      width={400}
      footer={<ContinueButton onClick={onClose} />}
      renderContent={() => {
        return (
          <VStack gap={40}>
            <YesterdayPerformance />
            <ReviewYesterdayHabits />
          </VStack>
        )
      }}
    />
  )
}

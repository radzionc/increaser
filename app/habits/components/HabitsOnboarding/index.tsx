import { Modal } from '@increaser/ui/ui/Modal'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { CuratedHabits } from '../CuratedHabits'
import { ContinueButton } from 'ui/ContinueButton'

interface Props {
  onNext: () => void
}

export const HabitsOnboarding = ({ onNext }: Props) => {
  return (
    <Modal
      width={600}
      title={
        <VStack gap={4}>
          <Text>Build daily habits</Text>
          <Text size={16} color="supporting">
            Pick science-based habits to improve your overall well-being.
          </Text>
        </VStack>
      }
      hasImplicitClose={false}
      placement="top"
      footer={<ContinueButton onClick={onNext} />}
      renderContent={() => <CuratedHabits />}
    />
  )
}

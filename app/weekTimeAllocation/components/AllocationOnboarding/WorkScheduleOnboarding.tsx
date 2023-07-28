import { ManageWorkSchedule } from 'sets/components/ManageWorkSchedule'
import { Modal } from '@increaser/ui/ui/Modal'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { ContinueButton } from 'ui/ContinueButton'

interface Props {
  onNext: () => void
}

export const WorkScheduleOnboarding = ({ onNext }: Props) => {
  return (
    <Modal
      title={
        <VStack gap={4}>
          <Text>Finish work early</Text>
          <Text size={16} color="supporting">
            Start work early and relax in the evening for a better mood and
            sleep
          </Text>
        </VStack>
      }
      hasImplicitClose={false}
      placement="top"
      footer={<ContinueButton onClick={onNext} />}
      renderContent={() => <ManageWorkSchedule />}
    />
  )
}

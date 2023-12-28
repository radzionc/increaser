import { CuratedHabits } from '../CuratedHabits'
import { ContinueButton } from '@increaser/app/ui/ContinueButton'
import { Modal } from '@lib/ui/modal'
import { ClosableComponentProps } from '@lib/ui/props'

interface Props extends ClosableComponentProps {
  onNext: () => void
}

export const HabitsOnboarding = ({ onNext, onClose }: Props) => {
  return (
    <Modal
      width={600}
      onClose={onClose}
      title="Build daily habits"
      subTitle="Pick science-based habits to improve your overall well-being."
      placement="top"
      footer={<ContinueButton onClick={onNext} />}
    >
      <CuratedHabits />
    </Modal>
  )
}

import { CuratedHabits } from '../CuratedHabits'
import { ContinueButton } from 'ui/ContinueButton'
import { Modal } from '@increaser/ui/modal'
import { ClosableComponentProps } from '@increaser/ui/props'

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

import { PanelPrompt } from '@lib/ui/panel/PanelPrompt'
import { useAssertUserState } from '../../user/UserStateContext'
import { Opener } from '@lib/ui/base/Opener'
import { SetDobForm } from './SetDobForm'
import { DobOverview } from '../DobOverview'

export const ManageDob = () => {
  const { dob } = useAssertUserState()

  if (dob) {
    return <DobOverview />
  }

  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <PanelPrompt
            onClick={onOpen}
            title="Set your birthdate for age-based goals"
          >
            Customize goals by setting milestones based on your age.
          </PanelPrompt>
        )
      }
      renderContent={({ onClose }) => <SetDobForm onFinish={onClose} />}
    />
  )
}

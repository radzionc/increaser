import { Opener } from '@lib/ui/base/Opener'
import { AddBudgetForm } from './AddBudgetForm'
import { useFreeHours } from './hooks/useFreeHours'
import { pluralize } from '@lib/utils/pluralize'
import { PanelPrompt } from '@lib/ui/panel/PanelPrompt'

export const BudgetFreeTimePrompt = () => {
  const freeHours = useFreeHours()

  if (!freeHours) {
    return null
  }

  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        !isOpen && (
          <PanelPrompt
            title={`You have ${pluralize(freeHours, 'free hour')}!`}
            onClick={onOpen}
          >
            Tap here to allocate time for a project with no budget or adjust the
            budget for the projects listed below.
          </PanelPrompt>
        )
      }
      renderContent={({ onClose }) => <AddBudgetForm onFinish={onClose} />}
    />
  )
}

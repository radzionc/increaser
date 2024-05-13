import { Opener } from '@lib/ui/base/Opener'
import { AddBudgetForm } from './AddBudgetForm'
import { useFreeHours } from './hooks/useFreeHours'
import { pluralize } from '@lib/utils/pluralize'
import { PanelPrompt } from '@lib/ui/panel/PanelPrompt'
import { ShyWarningBlock } from '@lib/ui/status/ShyWarningBlock'
import Link from 'next/link'
import { AppPath } from '@increaser/ui/navigation/AppPath'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { transition } from '@lib/ui/css/transition'

const BudgetLink = styled(Link)`
  color: ${getColor('text')};
  font-weight: 500;
  border-bottom: 1px dashed ${getColor('text')};
  ${transition};
  &:hover {
    color: ${getColor('contrast')};
  }
`

export const ManageTimePrompt = () => {
  const freeHours = useFreeHours()

  if (freeHours === 0) {
    return null
  }

  if (freeHours < 0) {
    return (
      <ShyWarningBlock title="Exceeding Work Budget">
        You have allocated {pluralize(-freeHours, 'hour')} more than your
        current work budget allows. Please adjust the budget for the projects
        listed below or{' '}
        <BudgetLink href={AppPath.WorkBudget}>
          expand your overall work budget
        </BudgetLink>{' '}
        to accommodate your plans.
      </ShyWarningBlock>
    )
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

import { Opener } from '@lib/ui/base/Opener'
import React from 'react'
import { FocusOptionContainer } from './FocusOptionContainer'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import styled from 'styled-components'
import { CreateTaskForm } from '@increaser/ui/tasks/form/CreateTaskForm'
import { useFocusLauncher } from './state/FocusLauncherContext'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { endOfDay } from 'date-fns'

const Container = styled(FocusOptionContainer)``

const Content = styled(PrefixedItemFrame)`
  ${verticalPadding(0)};
`

export const AddTask = () => {
  const { setState } = useFocusLauncher()

  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <Container
            onClick={onOpen}
            as="button"
            type="button"
            selected={false}
          >
            <Content prefix={<PlusIcon />}>Add a task</Content>
          </Container>
        )
      }
      renderContent={({ onClose }) => (
        <PanelModal width={560} onFinish={onClose}>
          <CreateTaskForm
            defaultValue={{
              deadlineAt: endOfDay(Date.now()).getTime(),
            }}
            onFinish={(task) => {
              // wait for mutation to finish
              if (task) return

              onClose()
            }}
            onMutationFinish={(task) => {
              onClose()
              if (task) {
                setState((state) => ({
                  ...state,
                  projectId: task.projectId,
                  taskId: task.id,
                }))
              }
            }}
          />
        </PanelModal>
      )}
    />
  )
}

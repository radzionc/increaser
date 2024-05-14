import { Opener } from '@lib/ui/base/Opener'
import { interactive } from '@lib/ui/css/interactive'
import { transition } from '@lib/ui/css/transition'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { HStack } from '@lib/ui/layout/Stack'
import { Panel } from '@lib/ui/panel/Panel'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { CreateProjectForm } from './CreateProejctForm'

const Container = styled(Panel)`
  ${interactive};
  color: ${getColor('contrast')};
  border: 2px dashed ${getColor('primary')};
  font-weight: 500;

  ${transition};
  &:hover {
    background: ${getColor('foreground')};
  }
`

export const CreateProjectPrompt = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <Container onClick={onOpen} kind="secondary">
            <HStack alignItems="center" gap={8}>
              <IconWrapper>
                <PlusIcon />
              </IconWrapper>
              Add project
            </HStack>
          </Container>
        )
      }
      renderContent={({ onClose }) => <CreateProjectForm onFinish={onClose} />}
    />
  )
}

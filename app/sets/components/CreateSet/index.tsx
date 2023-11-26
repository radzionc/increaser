import styled from 'styled-components'
import { transition } from '@increaser/ui/css/transition'
import { PlusCircleIcon } from '@increaser/ui/icons/PlusCircleIcon'
import { Opener } from '@increaser/ui/base/Opener'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'

import { CreateSetOverlay } from './CreateSetOverlay'
import { getColor } from '@increaser/ui/theme/getters'
import { MemberOnlyAction } from 'membership/components/MemberOnlyAction'

const Container = styled.div`
  cursor: pointer;
  ${transition};
  color: ${getColor('text')};
  font-weight: 500;
  :hover {
    color: ${getColor('contrast')};
    background: ${getColor('mist')};
  }
`

export const CreateSet = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <MemberOnlyAction
          action={onOpen}
          render={({ action }) => (
            <Container onClick={action}>
              <HStack justifyContent="center" alignItems="center" gap={8}>
                <PlusCircleIcon />
                <Text>Add session</Text>
              </HStack>
            </Container>
          )}
        />
      )}
      renderContent={({ onClose }) => <CreateSetOverlay onClose={onClose} />}
    />
  )
}

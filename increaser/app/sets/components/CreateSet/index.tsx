import styled from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { PlusCircleIcon } from '@lib/ui/icons/PlusCircleIcon'
import { Opener } from '@lib/ui/base/Opener'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import { CreateSetOverlay } from './CreateSetOverlay'
import { getColor } from '@lib/ui/theme/getters'
import { MemberOnlyAction } from '@increaser/app/membership/components/MemberOnlyAction'

const Container = styled.div`
  cursor: pointer;
  ${transition};
  color: ${getColor('text')};
  font-weight: 500;
  &:hover {
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

import styled from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { PlusCircleIcon } from '@increaser/ui/icons/PlusCircleIcon'
import { Opener } from '@increaser/ui/ui/Opener'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { CreateSetOverlay } from './CreateSetOverlay'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { MemberOnlyAction } from 'membership/components/MemberOnlyAction'

const Container = styled.div`
  cursor: pointer;
  ${defaultTransitionCSS};
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

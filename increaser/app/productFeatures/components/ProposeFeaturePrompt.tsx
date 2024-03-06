import { Opener } from '@lib/ui/base/Opener'
import { interactive } from '@lib/ui/css/interactive'
import { transition } from '@lib/ui/css/transition'
import { VStack } from '@lib/ui/layout/Stack'
import { Panel } from '@lib/ui/panel/Panel'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { ProposeFeatureForm } from './ProposeFeatureForm'

const Container = styled(Panel)`
  ${interactive};
  color: ${getColor('contrast')};
  border: 2px dashed ${getColor('primary')};

  ${transition};
  &:hover {
    background: ${getColor('foreground')};
  }
`

export const ProposeFeaturePrompt = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        !isOpen && (
          <Container onClick={onOpen} kind="secondary">
            <VStack gap={8} alignItems="center">
              <Text size={16} weight="bold">
                Make Increaser Yours
              </Text>
              <Text size={14}>Tell us what feature you want to see next</Text>
            </VStack>
          </Container>
        )
      }
      renderContent={({ onClose }) => <ProposeFeatureForm onFinish={onClose} />}
    />
  )
}

import { Menu } from '@increaser/ui/menu'
import { Spinner } from '@increaser/ui/loaders/Spinner'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { ExpandableInputOpener } from '@increaser/ui/inputs/ExpandableInputOpener'
import { centerContent } from '@increaser/ui/css/centerContent'
import { Suspense, lazy } from 'react'
import styled from 'styled-components'

const EmojiPicker = lazy(() => import('./EmojiPicker'))

interface Props {
  value: string
  onChange: (value: string) => void
}

const EmojiMartFallback = styled.div`
  width: 352px;
  height: 435px;
  ${centerContent};
`

export const EmojiInput = ({ value, onChange }: Props) => {
  return (
    <Menu
      title="Select emoji"
      renderOpener={(props) => (
        <ExpandableInputOpener type="button" {...props}>
          <Text color="contrast" size={32}>
            {value}
          </Text>
        </ExpandableInputOpener>
      )}
      renderContent={({ onClose }) => (
        <Suspense
          fallback={
            <EmojiMartFallback>
              <HStack gap={4} alignItems="center">
                <Spinner />
                <Text>Loading emoji picker</Text>
              </HStack>
            </EmojiMartFallback>
          }
        >
          <EmojiPicker
            onSelect={(value) => {
              onChange(value)
              onClose()
            }}
          />
        </Suspense>
      )}
    />
  )
}

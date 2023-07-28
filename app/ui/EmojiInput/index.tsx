import { Menu } from '@increaser/ui/ui/Menu'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { ExpandableInputOpener } from '@increaser/ui/ui/inputs/ExpandableInputOpener'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
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
  ${centerContentCSS};
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

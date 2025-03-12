import {
  useClick,
  useFloating,
  useInteractions,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
} from '@floating-ui/react'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { HStack } from '@lib/ui/css/stack'
import { ExpandableInputOpener } from '@lib/ui/inputs/ExpandableInputOpener'
import { Spinner } from '@lib/ui/loaders/Spinner'
import { InputProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { Suspense, lazy, useState } from 'react'
import styled from 'styled-components'
const EmojiPicker = lazy(() => import('./EmojiPicker'))

const EmojiMartFallback = styled.div`
  width: 352px;
  height: 435px;
  ${centerContent};
`

const Container = styled.div`
  z-index: 1;
  padding: 0;
  ${borderRadius.s};
  overflow: hidden;
  border: 2px solid ${getColor('primary')};
  background: ${getColor('background')};
`

export const EmojiInput = ({ value, onChange }: InputProps<string>) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    floatingStyles,
    refs: { setReference, setFloating },
    context,
  } = useFloating({
    whileElementsMounted: autoUpdate,
    open: isOpen,
    placement: 'bottom-start',
    strategy: 'fixed',
    onOpenChange: setIsOpen,
    middleware: [offset(4), shift(), flip()],
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context, {
      escapeKey: true,
      outsidePress: true,
    }),
  ])

  return (
    <>
      <ExpandableInputOpener
        isActive={isOpen}
        ref={setReference}
        {...getReferenceProps()}
      >
        <Text color="contrast" size={32}>
          {value}
        </Text>
      </ExpandableInputOpener>
      {isOpen && (
        <Container
          ref={setFloating}
          style={{ ...floatingStyles, zIndex: 1 }}
          {...getFloatingProps()}
        >
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
                setIsOpen(false)
              }}
            />
          </Suspense>
        </Container>
      )}
    </>
  )
}

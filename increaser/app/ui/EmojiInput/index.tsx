import { Spinner } from '@lib/ui/loaders/Spinner'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { ExpandableInputOpener } from '@lib/ui/inputs/ExpandableInputOpener'
import { centerContent } from '@lib/ui/css/centerContent'
import { Suspense, lazy, useState } from 'react'
import styled from 'styled-components'
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
import { InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'
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

  const click = useClick(context)
  const dismiss = useDismiss(context, {
    escapeKey: true,
    outsidePress: true,
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ])

  return (
    <>
      <ExpandableInputOpener
        isActive={isOpen}
        type="button"
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

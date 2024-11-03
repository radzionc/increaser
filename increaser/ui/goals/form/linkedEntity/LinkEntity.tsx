import { ComponentWithOptionsProps, ValueFinishProps } from '@lib/ui/props'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { FloatingFocusManager } from '@floating-ui/react'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { BodyPortal } from '@lib/ui/dom/BodyPortal'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { LinkIcon } from '@lib/ui/icons/LinkIcon'
import { Text } from '@lib/ui/text'
import { LinkActionContainer } from './LinkActionContainer'

type LinkEntityProps<T> = ComponentWithOptionsProps<T> &
  ValueFinishProps<T> & {
    getOptionName: (option: T) => string
    getOptionKey: (option: T) => string
    getOptionEmoji: (option: T) => string
  }

export function LinkEntity<T>({
  onFinish,
  options,
  getOptionName,
  getOptionKey,
  getOptionEmoji,
}: LinkEntityProps<T>) {
  const {
    getReferenceProps,
    getFloatingProps,
    getOptionProps,
    isOpen,
    activeIndex,
    setIsOpen,
    context,
  } = useFloatingOptions({
    strategy: 'fixed',
    selectedIndex: null,
    placement: 'bottom-start',
    options: options.map(getOptionName),
  })

  return (
    <>
      <LinkActionContainer {...getReferenceProps()} isActive={isOpen}>
        <LinkIcon />
        <Text>Link</Text>
      </LinkActionContainer>
      {isOpen && (
        <BodyPortal>
          <FloatingFocusManager context={context} modal>
            <FloatingOptionsContainer {...getFloatingProps()}>
              {options.map((option, index) => (
                <OptionItem
                  key={getOptionKey(option)}
                  isActive={activeIndex === index}
                  {...getOptionProps({
                    index,
                    onSelect: () => {
                      onFinish(option)
                      setIsOpen(false)
                    },
                  })}
                >
                  <OptionContent>
                    <EmojiTextPrefix emoji={getOptionEmoji(option)} />
                    {getOptionName(option)}
                  </OptionContent>
                </OptionItem>
              ))}
            </FloatingOptionsContainer>
          </FloatingFocusManager>
        </BodyPortal>
      )}
    </>
  )
}

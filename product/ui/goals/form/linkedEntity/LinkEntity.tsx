import { FloatingFocusManager } from '@floating-ui/react'
import { BodyPortal } from '@lib/ui/dom/BodyPortal'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { LinkIcon } from '@lib/ui/icons/LinkIcon'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { OptionsProp, OnFinishProp } from '@lib/ui/props'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { isEmpty } from '@lib/utils/array/isEmpty'

import { LinkActionContainer } from './LinkActionContainer'

type LinkEntityProps<T> = OptionsProp<T> &
  OnFinishProp<T> & {
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

  if (isEmpty(options)) {
    return null
  }

  return (
    <>
      <LinkActionContainer {...getReferenceProps()} isActive={isOpen}>
        <PrefixedItemFrame prefix={<LinkIcon />}>Link</PrefixedItemFrame>
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

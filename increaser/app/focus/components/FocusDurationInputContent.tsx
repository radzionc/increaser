import {
  FocusDuration,
  focusDurations,
} from '@increaser/entities/FocusDuration'
import { centerContent } from '@lib/ui/css/centerContent'
import { interactive } from '@lib/ui/css/interactive'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { InvisibleHTMLRadio } from '@lib/ui/inputs/InvisibleHTMLRadio'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import { InputProps } from '@lib/ui/props'
import { useId } from 'react'
import styled, { useTheme } from 'styled-components'

type FocusDurationInputContentProps = InputProps<FocusDuration> & {
  width: number
}

const labelSize = 16
const largeItemHeight = 28
const smallItemHeight = 12
const height = largeItemHeight + labelSize + panelDefaultPadding

const Wrapper = styled(HStack)`
  width: 100%;
  height: ${toSizeUnit(height)};
  gap: 1px;
  padding: 0;
`

const Item = styled.label`
  height: 100%;
  ${interactive};
  ${centerContent};
  position: relative;
`

const Content = styled(VStack)`
  position: absolute;
  bottom: ${toSizeUnit(panelDefaultPadding)};
  width: 2px;
`

const primaryFocusDurations: FocusDuration[] = [30, 60, 90]

export const FocusDurationInputContent = ({
  width,
  value,
  onChange,
}: FocusDurationInputContentProps) => {
  const itemSize =
    (width - panelDefaultPadding * 2) / (focusDurations.length - 1)

  const edgeItemSize = itemSize / 2 + panelDefaultPadding

  const id = useId()

  const { colors } = useTheme()

  return (
    <Wrapper>
      {focusDurations.map((duration, index) => {
        const isFirst = index === 0
        const isLast = index === focusDurations.length - 1
        const isOnEdge = isFirst || isLast
        const isSelected = duration === value
        const height = primaryFocusDurations.includes(duration)
          ? largeItemHeight
          : smallItemHeight
        const color = (
          duration <= value ? colors.contrast : colors.textShy
        ).toCssValue()
        return (
          <Item
            key={duration}
            style={isOnEdge ? { width: edgeItemSize } : { flex: 1 }}
          >
            <InvisibleHTMLRadio
              groupName={id}
              value={duration}
              isSelected={isSelected}
              onSelect={() => {
                onChange(duration)
              }}
            />
            <Content
              style={{
                background: color,
                height,
                left: isFirst ? panelDefaultPadding : undefined,
                right: isLast ? panelDefaultPadding : undefined,
              }}
            ></Content>
          </Item>
        )
      })}
    </Wrapper>
  )
}

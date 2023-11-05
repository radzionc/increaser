import { ReactNode, useState } from 'react'
import styled, { css } from 'styled-components'
import { Hoverable } from '../Hoverable'
import { defaultTransitionCSS } from '../animations/transitions'
import { CheckIcon } from '../../icons/CheckIcon'
import {
  InvisibleHTMLCheckboxProps,
  InvisibleHTMLCheckbox,
} from '../inputs/Checkbox/InvisibleHTMLCheckbox'
import { centerContentCSS } from '../utils/centerContentCSS'
import { Text } from '../Text'
import { ChecklistItemFrame } from './ChecklistItemFrame'
import { getColor, matchColor } from '../theme/getters'
import { Confetti } from '../animations/Confetti'

interface ChecklistItemProps extends InvisibleHTMLCheckboxProps {
  name: ReactNode
  style?: React.CSSProperties
  shouldCrossOut?: boolean
  hasCongratulation?: boolean
}

export const Box = styled.div<{ isChecked: boolean }>`
  width: 100%;
  aspect-ratio: 1/1;

  ${centerContentCSS};

  border-radius: 4px;
  border: 2px solid ${getColor('textShy')};
  color: ${getColor('background')};

  ${defaultTransitionCSS}

  ${({ isChecked }) =>
    isChecked &&
    css`
      background: ${getColor('primary')};
      border-color: ${getColor('primary')};
    `};
`

const Content = styled(Text)<{ isChecked: boolean }>`
  max-width: 100%;
  position: relative;
  color: ${matchColor('isChecked', {
    true: 'textSupporting',
    false: 'text',
  })};
`

const Line = styled.span<{ isChecked: boolean }>`
  position: absolute;
  ${defaultTransitionCSS};
  left: 0;
  border-top: 2px solid;
  bottom: 8px;
  width: ${({ isChecked }) => (isChecked ? '100%' : '0%')};
`

export const ChecklistItem = ({
  value,
  onChange,
  name,
  style,
  shouldCrossOut,
  hasCongratulation,
}: ChecklistItemProps) => {
  const [showConfetti, setShowConfetti] = useState(false)

  return (
    <Hoverable style={style} as="label">
      <ChecklistItemFrame>
        <Box isChecked={value}>{value && <CheckIcon />}</Box>
        {showConfetti && <Confetti x={20} y={-20} />}
        <Content as="div" isChecked={value} cropped>
          {name}
          {shouldCrossOut && <Line isChecked={value} />}
        </Content>
        <InvisibleHTMLCheckbox
          value={value}
          onChange={() => {
            const newValue = !value
            onChange(newValue)
            if (hasCongratulation) {
              setShowConfetti(newValue)
            }
          }}
        />
      </ChecklistItemFrame>
    </Hoverable>
  )
}

import styled, { css } from 'styled-components'
import { centerContent } from '../css/centerContent'
import { getColor } from '../theme/getters'
import { transition } from '../css/transition'
import { CheckIcon } from '../icons/CheckIcon'
import { UIComponentProps } from '../props'

type CheckStatusProps = UIComponentProps & {
  value: boolean
}

const Container = styled.div<{ isChecked: boolean }>`
  width: 100%;
  aspect-ratio: 1/1;

  ${centerContent};

  border-radius: 4px;
  border: 1px solid ${getColor('textSupporting')};
  color: ${getColor('background')};

  ${transition}

  ${({ isChecked }) =>
    isChecked &&
    css`
      background: ${getColor('primary')};
      border-color: ${getColor('primary')};
    `};
`

export const CheckStatus = ({ value, ...rest }: CheckStatusProps) => {
  return (
    <Container {...rest} isChecked={value}>
      {value && <CheckIcon />}
    </Container>
  )
}

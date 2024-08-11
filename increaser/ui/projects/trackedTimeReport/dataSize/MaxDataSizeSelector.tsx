import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import styled, { css } from 'styled-components'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { ComponentWithActiveState } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { useDataSize } from './useDataSize'
import { selectorOption } from './selectorOption'

const Button = styled(UnstyledButton)<ComponentWithActiveState>`
  height: 100%;
  font-size: 14px;
  font-weight: 500;
  ${horizontalPadding(8)};
  color: ${getColor('text')};

  ${selectorOption};

  ${({ isActive }) =>
    isActive
      ? css`
          color: ${getColor('contrast')};
        `
      : css`
          &:hover {
            background: ${getColor('mist')};
          }
        `}
`

export const MaxDataSizeSelector = () => {
  const [value, setValue] = useDataSize()

  return (
    <Button isActive={value === null} onClick={() => setValue(null)}>
      max
    </Button>
  )
}

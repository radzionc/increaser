import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { useTrackedTimeDataSize } from './state/useTrackedTimeDataSize'
import styled, { css } from 'styled-components'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { ComponentWithActiveState } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'

const Button = styled(UnstyledButton)<ComponentWithActiveState>`
  height: 100%;
  font-size: 14px;
  font-weight: 500;
  ${horizontalPadding(8)};
  color: ${getColor('text')};

  ${borderRadius.s};

  border: 2px solid ${getColor('mistExtra')};

  ${({ isActive }) =>
    isActive
      ? css`
          border-color: ${getColor('primary')};
          color: ${getColor('contrast')};
        `
      : css`
          &:hover {
            background: ${getColor('mist')};
          }
        `}
`

export const MaxDataSizeSelector = () => {
  const [value, setValue] = useTrackedTimeDataSize()

  return (
    <Button isActive={value === null} onClick={() => setValue(null)}>
      max
    </Button>
  )
}

import { CenterAbsolutely } from '@increaser/ui/layout/CenterAbsolutely'
import { PositionAbsolutelyCenterHorizontally } from '@increaser/ui/PositionAbsolutelyCenterHorizontally'
import { VStack } from '@increaser/ui/layout/Stack'
import { transition } from '@increaser/ui/css/transition'
import { ChevronDownIcon } from '@increaser/ui/icons/ChevronDownIcon'
import { ChevronUpIcon } from '@increaser/ui/icons/ChevronUpIcon'
import { getColor } from '@increaser/ui/theme/getters'
import { centerContent } from '@increaser/ui/css/centerContent'
import { ComponentProps } from 'react'
import styled from 'styled-components'

const InteractiveArea = styled.div`
  width: 100%;
  cursor: row-resize;
  ${centerContent};
  height: 20px;
  color: ${getColor('contrast')};
  svg {
    font-size: 18px;
    ${transition};
  }
  :hover {
    svg {
      transform: scale(1.24);
    }
  }
`

interface BoundaryInteractiveAreaProps
  extends ComponentProps<typeof InteractiveArea> {
  top: number
}

export const BoundaryInteractiveArea = ({
  top,
  ...rest
}: BoundaryInteractiveAreaProps) => {
  return (
    <PositionAbsolutelyCenterHorizontally fullWidth top={top}>
      <InteractiveArea {...rest}>
        <CenterAbsolutely>
          <VStack alignItems="center">
            <ChevronUpIcon />
            <ChevronDownIcon />
          </VStack>
        </CenterAbsolutely>
      </InteractiveArea>
    </PositionAbsolutelyCenterHorizontally>
  )
}

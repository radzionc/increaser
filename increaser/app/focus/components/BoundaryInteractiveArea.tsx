import { CenterAbsolutely } from '@lib/ui/layout/CenterAbsolutely'
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { VStack } from '@lib/ui/layout/Stack'

import { ChevronDownIcon } from '@lib/ui/icons/ChevronDownIcon'
import { ChevronUpIcon } from '@lib/ui/icons/ChevronUpIcon'
import { getColor } from '@lib/ui/theme/getters'
import { ComponentProps } from 'react'
import styled from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { centerContent } from '@lib/ui/css/centerContent'

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
  &:hover {
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

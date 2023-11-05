import { CenterAbsolutely } from '@increaser/ui/ui/CenterAbsolutely'
import { PositionAbsolutelyCenterHorizontally } from '@increaser/ui/ui/PositionAbsolutelyCenterHorizontally'
import { VStack } from '@increaser/ui/ui/Stack'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { ChevronDownIcon } from '@increaser/ui/icons/ChevronDownIcon'
import { ChevronUpIcon } from '@increaser/ui/icons/ChevronUpIcon'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { ComponentProps } from 'react'
import styled from 'styled-components'

const InteractiveArea = styled.div`
  width: 100%;
  cursor: row-resize;
  ${centerContentCSS};
  height: 20px;
  color: ${getColor('contrast')};
  svg {
    font-size: 18px;
    ${defaultTransitionCSS};
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

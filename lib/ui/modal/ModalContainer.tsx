import styled, { css } from 'styled-components'
import { getColor } from '../theme/getters'
import { takeWholeSpace } from '../css/takeWholeSpace'
import { toSizeUnit } from '../css/toSizeUnit'
import { borderRadius } from '../css/borderRadius'
import { vStack } from '../css/stack'
import { ComponentPropsWithoutRef, ElementType } from 'react'
import { useIsScreenWidthLessThan } from '../hooks/useIsScreenWidthLessThan'
import { modalConfig } from './config'
import { stopPropagation } from '../utils/stopPropagation'
import { AsElementComponent } from '../props'

export type ModalPlacement = 'top' | 'center'

type ContainerProps = {
  width?: number
  placement: ModalPlacement
}

const Container = styled.div<ContainerProps>`
  ${vStack()};

  max-height: 100%;
  background: ${getColor('background')};

  ${({ width, placement }) =>
    width
      ? css`
          width: ${toSizeUnit(width)};
          ${borderRadius.m};
          max-height: 92%;
          ${placement === 'top' &&
          css`
            align-self: start;
            margin-top: 4%;
          `}
        `
      : takeWholeSpace};

  border: 2px solid ${getColor('textShy')};
  overflow: hidden;
`

type ModalContainerProps<T extends ElementType = 'div'> = Omit<
  ComponentPropsWithoutRef<T>,
  'width' | 'placement'
> &
  AsElementComponent<T> & {
    targetWidth?: number
    placement?: ModalPlacement
  }

export const ModalContainer = <T extends ElementType = 'div'>({
  targetWidth = 400,
  placement = 'center',
  ...props
}: ModalContainerProps<T>) => {
  const isFullScreen = useIsScreenWidthLessThan(
    targetWidth + modalConfig.minHorizontalFreeSpaceForMist,
  )

  return (
    <Container
      onClick={stopPropagation()}
      width={isFullScreen ? undefined : targetWidth}
      placement={placement}
      {...props}
    />
  )
}

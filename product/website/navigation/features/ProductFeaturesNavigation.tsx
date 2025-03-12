import {
  useFloating,
  useInteractions,
  autoUpdate,
  flip,
  shift,
  useHover,
  safePolygon,
} from '@floating-ui/react'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { IsActiveProp } from '@lib/ui/props'
import { text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { productTools } from '@product/entities/ProductTool'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { getProductToolUrl } from '../productTool'

import { ProductToolOption } from './ProductToolOption'

const Opener = styled(UnstyledButton)<IsActiveProp>`
  ${borderRadius.s};
  outline: none;
  ${horizontalPadding(20)};
  height: 40px;

  ${text({
    color: 'contrast',
    weight: '600',
    size: 14,
    centerVertically: true,
  })}

  gap: 6px;

  &:hover {
    background: ${getColor('mist')};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${getColor('mist')};
    `};
`

const Content = styled(FloatingOptionsContainer)`
  min-width: 240px;
  ${verticalPadding(6)};
`

export const ProductFeaturesNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    context,
    floatingStyles,
    refs: { setReference, setFloating },
  } = useFloating({
    whileElementsMounted: autoUpdate,

    open: isOpen,
    onOpenChange: setIsOpen,
    strategy: 'fixed',
    placement: 'bottom-start',
    middleware: [shift(), flip()],
  })

  const hover = useHover(context, {
    handleClose: safePolygon(),
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  const { push } = useRouter()

  return (
    <>
      <Opener ref={setReference} isActive={isOpen} {...getReferenceProps()}>
        Product
        <CollapsableStateIndicator isOpen={isOpen} />
      </Opener>
      {isOpen && (
        <Content
          style={{ ...floatingStyles }}
          ref={setFloating}
          {...getFloatingProps()}
        >
          {productTools.map((option) => (
            <ProductToolOption
              onClick={() => {
                push(getProductToolUrl(option))
                setIsOpen(false)
              }}
              key={option}
              value={option}
            />
          ))}
        </Content>
      )}
    </>
  )
}

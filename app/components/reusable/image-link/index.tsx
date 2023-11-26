import { round } from '@increaser/ui/css/round'
import { transition } from '@increaser/ui/css/transition'
import React from 'react'
import { ExternalLink } from 'router/Link/ExternalLink'
import styled from 'styled-components'

interface Props {
  src: string
  to: string
  side: number
  alt?: string
  style?: React.CSSProperties
}

const ImageContainer = styled.div<{ side: number }>`
  height: ${(p) => p.side}px;
  width: ${(p) => p.side}px;
  ${round}
  position: relative;
  border: 2px solid transparent;
  ${transition};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  :hover {
    border-color: ${({ theme }) => theme.colors.text.toCssValue()};
  }
`

const Image = styled.img`
  width: 100%;
  height: auto;
`

export const ImageLink = ({ src, to, side, alt, style }: Props) => {
  return (
    <ExternalLink to={to}>
      <ImageContainer style={style} side={side}>
        {src && <Image src={src} alt={alt} />}
      </ImageContainer>
    </ExternalLink>
  )
}

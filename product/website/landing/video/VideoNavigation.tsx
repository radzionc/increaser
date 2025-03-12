import { IsActiveProp, InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { productTools } from '@product/entities/ProductTool'
import { InfoYouTubeVideo } from '@product/info/infoYouTubeVideos'
import styled, { css } from 'styled-components'

import { ProductToolOption } from '../../navigation/features/ProductToolOption'

const Option = styled(ProductToolOption)<IsActiveProp>`
  border: 2px solid transparent;

  ${({ isActive }) =>
    isActive &&
    css`
      border-color: ${getColor('primary')};
    `}
`

export const VideoNavigation = ({
  value,
  onChange,
}: InputProps<InfoYouTubeVideo>) => {
  return (
    <>
      {productTools.map((option) => (
        <Option
          isActive={option === value}
          onClick={() => {
            onChange(option)
          }}
          key={option}
          value={option}
        />
      ))}
    </>
  )
}

import { InfoYouTubeVideo } from '@increaser/info/infoYouTubeVideos'
import { IsActiveProp, InputProps } from '@lib/ui/props'
import { ProductToolOption } from '../../navigation/features/ProductToolOption'
import styled, { css } from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { productTools } from '@increaser/entities/ProductTool'

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

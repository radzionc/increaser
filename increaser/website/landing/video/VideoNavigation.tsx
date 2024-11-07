import {
  InfoYouTubeVideo,
  infoYouTubeVideos,
} from '@increaser/info/infoYouTubeVideos'
import { ComponentWithActiveState, InputProps } from '@lib/ui/props'
import { ProductToolOption } from '../../navigation/features/ProductToolOption'
import { getRecordKeys } from '@lib/utils/record/getRecordKeys'
import styled, { css } from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'

const Option = styled(ProductToolOption)<ComponentWithActiveState>`
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
      {getRecordKeys(infoYouTubeVideos).map((option) => (
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

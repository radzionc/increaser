import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { centerContent } from '@lib/ui/css/centerContent'
import { HStack } from '@lib/ui/css/stack'
import { modalConfig } from '@lib/ui/modal/config'
import { IsActiveProp } from '@lib/ui/props'
import styled, { css } from 'styled-components'
import { youTubeWidgetConfig } from './config'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { getColor } from '@lib/ui/theme/getters'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

const soundsViews = ['all', 'favourites'] as const
type SoundsView = (typeof soundsViews)[number]

const soundViewName = {
  all: 'My videos',
  favourites: 'Favourites',
}

const ItemUnderline = styled.div`
  ${absoluteOutline(0, 0)};
  border-bottom: ${toSizeUnit(youTubeWidgetConfig.navigation.borderWidth)} solid
    transparent;
`

const Option = styled(UnstyledButton)<IsActiveProp>`
  height: 100%;
  ${centerContent};
  ${horizontalPadding(
    modalConfig.padding - youTubeWidgetConfig.navigation.leftOffset,
  )}
  font-weight: 600;

  position: relative;

  ${({ isActive }) =>
    isActive
      ? css`
          ${ItemUnderline} {
            border-color: ${getColor('contrast')};
          }
          color: ${getColor('contrast')};
        `
      : css`
          color: ${getColor('textSupporting')};
          &:hover {
            color: ${getColor('contrast')};
          }
        `}
`

export const YouTubeViewSelector = () => {
  const [value, setValue] = usePersistentState<SoundsView>(
    PersistentStateKey.FocusSoundsView,
    'all',
  )

  return (
    <HStack fullHeight>
      {soundsViews.map((option) => (
        <Option
          isActive={value === option}
          onClick={() => setValue(option)}
          key={option}
        >
          {soundViewName[option]}
          <ItemUnderline />
        </Option>
      ))}
    </HStack>
  )
}

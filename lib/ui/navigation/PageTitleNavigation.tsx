import styled, { css } from 'styled-components'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { ComponentWithActiveState, InputProps } from '../props'
import { HStack } from '../layout/Stack'
import { centerContent } from '../css/centerContent'
import { horizontalPadding } from '../css/horizontalPadding'
import { getColor } from '../theme/getters'
import { absoluteOutline } from '../css/absoluteOutline'

const Underline = styled.div`
  ${absoluteOutline(0, 2)};
  border-bottom: 2px solid transparent;
`

const Option = styled(UnstyledButton)<ComponentWithActiveState>`
  position: relative;
  font-size: 14px;
  font-weight: 600;
  height: 100%;
  ${horizontalPadding(12)};
  ${centerContent};
  align-items: end;
  padding-bottom: 12px;
  ${({ isActive }) =>
    isActive
      ? css`
          ${Underline} {
            border-color: ${getColor('contrast')};
          }
          color: ${getColor('contrast')};
        `
      : css`
          color: ${getColor('textSupporting')};
          &:hover {
            color: ${getColor('contrast')};
          }
        `};
`

type PageTitleNavigationProps<T extends string> = InputProps<T> & {
  options: readonly T[]
  getOptionName: (option: T) => string
}

export function PageTitleNavigation<T extends string>({
  value,
  getOptionName,
  options,
  onChange,
}: PageTitleNavigationProps<T>) {
  return (
    <HStack fullHeight>
      {options.map((v) => (
        <Option onClick={() => onChange(v)} isActive={v === value} key={v}>
          {getOptionName(v)}
          <Underline />
        </Option>
      ))}
    </HStack>
  )
}

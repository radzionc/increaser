import styled, { css } from 'styled-components'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { ComponentWithActiveState, InputProps } from '../props'
import { horizontalPadding } from '../css/horizontalPadding'
import { getColor } from '../theme/getters'
import { absoluteOutline } from '../css/absoluteOutline'
import { HStack } from '../layout/Stack'
import { pageTitle } from '../text/PageTitle'

const Underline = styled.div`
  ${absoluteOutline(0, 0)};
  border-bottom: 2px solid transparent;
`

const Container = styled(HStack)`
  height: 100%;
`

const Option = styled(UnstyledButton)<ComponentWithActiveState>`
  position: relative;
  ${pageTitle};
  height: 100%;
  ${horizontalPadding(12)};
  min-width: 80px;
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
    <Container>
      {options.map((v) => (
        <Option onClick={() => onChange(v)} isActive={v === value} key={v}>
          {getOptionName(v)}
          <Underline />
        </Option>
      ))}
    </Container>
  )
}

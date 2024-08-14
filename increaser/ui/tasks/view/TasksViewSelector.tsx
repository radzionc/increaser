import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { HStack } from '@lib/ui/layout/Stack'
import { ComponentWithActiveState } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'
import { taskViews, useTasksView } from './useTasksView'
import { useId } from 'react'
import { InvisibleHTMLRadio } from '@lib/ui/inputs/InvisibleHTMLRadio'
import { Match } from '@lib/ui/base/Match'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { Columns3Icon } from '@lib/ui/icons/Columns3Icon'
import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'
import { match } from '@lib/utils/match'
import { interactive } from '@lib/ui/css/interactive'

const Container = styled(HStack)`
  gap: 1px;
  height: 40px;
  border: 1px solid ${getColor('mistExtra')};
  ${borderRadius.s};
  overflow: hidden;
`

const Option = styled.label<ComponentWithActiveState>`
  height: 100%;
  ${horizontalPadding(16)};
  ${centerContent};
  ${interactive};

  ${({ isActive }) =>
    isActive
      ? css`
          color: ${getColor('contrast')};
          background: ${getColor('mist')};
        `
      : css`
          color: ${getColor('textSupporting')};
          &:hover {
            background: ${getColor('mist')};
          }
        `};
`

export const TasksViewSelector = () => {
  const [view, setView] = useTasksView()
  const id = useId()

  return (
    <Container>
      {taskViews.map((option) => (
        <Option
          title={match(option, {
            upcoming: () => 'Scheduled tasks',
            board: () => 'Board',
          })}
          isActive={option === view}
          key={option}
        >
          <InvisibleHTMLRadio
            isSelected={option === view}
            value={option}
            groupName={id}
            onSelect={() => {
              setView(option)
            }}
          />
          <IconWrapper>
            <Match
              value={option}
              board={() => <Columns3Icon />}
              upcoming={() => <CalendarIcon />}
            />
          </IconWrapper>
        </Option>
      ))}
    </Container>
  )
}

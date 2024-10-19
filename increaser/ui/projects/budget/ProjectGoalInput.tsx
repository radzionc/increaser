import { hStack } from '@lib/ui/css/stack'
import {
  goalOptionName,
  ProjectGoal,
  projectGoals,
} from '@increaser/entities/Project'
import { pluralize } from '@lib/utils/pluralize'
import { Text } from '@lib/ui/text'
import { ComponentWithActiveState, InputProps } from '@lib/ui/props'
import { Switch } from '@lib/ui/inputs/Switch'
import styled, { css } from 'styled-components'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { interactive } from '@lib/ui/css/interactive'
import { centerContent } from '@lib/ui/css/centerContent'
import { InvisibleHTMLRadio } from '@lib/ui/inputs/InvisibleHTMLRadio'
import { useId } from 'react'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { getColor } from '@lib/ui/theme/getters'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

type ProjectGoalInputProps = InputProps<ProjectGoal | null> & {
  hours: number
}

const GoalSwitch = styled(Switch)`
  padding-left: ${toSizeUnit(panelDefaultPadding)};
`

const Container = styled.div`
  padding: 0;

  ${hStack({
    fullWidth: true,
  })}

  height: 60px;

  > *:only-child {
    flex: 1;
  }
`

const OptionsContainer = styled.div`
  ${hStack()}
`

const space = 8

const Option = styled.label<ComponentWithActiveState>`
  height: 100%;
  ${interactive};
  ${centerContent};
  &:first-child {
    padding-left: ${toSizeUnit(space)};
    padding-right: ${toSizeUnit(space / 2)};
  }
  &:last-child {
    padding-left: ${toSizeUnit(space / 2)};
    padding-right: ${toSizeUnit(space)};
  }

  ${({ isActive }) =>
    isActive
      ? css`
          ${OptionUnderline} {
            opacity: 1;
          }
          color: ${getColor('contrast')};
        `
      : css`
          color: ${getColor('textShy')};
          &:hover {
            color: ${getColor('text')};
          }
        `}
`

const OptionUnderline = styled.div`
  ${absoluteOutline(0, 4)};

  border-bottom: 2px dashed ${getColor('primary')};

  opacity: 0;
`

const OptionContent = styled.div<ComponentWithActiveState>`
  position: relative;
`

export const ProjectGoalInput = ({
  value,
  onChange,
  hours,
}: ProjectGoalInputProps) => {
  const id = useId()

  return (
    <Container>
      <GoalSwitch
        size="s"
        onChange={() => onChange(value ? null : 'doMore')}
        value={value !== null}
        label={`Set a goal to work${value ? '' : ' ...'}`}
      />
      {value !== null && (
        <>
          <OptionsContainer>
            {projectGoals.map((option) => {
              const isSelected = option === value

              return (
                <Option isActive={isSelected} key={option}>
                  <InvisibleHTMLRadio
                    isSelected={isSelected}
                    value={option}
                    groupName={id}
                    onSelect={() => {
                      onChange(option)
                    }}
                  />
                  <OptionContent>
                    <Text>{goalOptionName[option]}</Text>
                    <OptionUnderline />
                  </OptionContent>
                </Option>
              )
            })}
          </OptionsContainer>
          <Text style={{ height: '100%' }} centerVertically color="contrast">
            {pluralize(hours, 'hour')} per week
          </Text>
        </>
      )}
    </Container>
  )
}

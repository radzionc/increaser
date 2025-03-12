import { panelDefaultPadding } from '@lib/ui/css/panel'
import { hStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { TextEmbeddedRadioInput } from '@lib/ui/inputs/select/TextEmbeddedRadioInput'
import { Switch } from '@lib/ui/inputs/Switch'
import { InputProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { pluralize } from '@lib/utils/pluralize'
import {
  goalOptionName,
  ProjectGoal,
  projectGoals,
} from '@product/entities/Project'
import styled from 'styled-components'

type ProjectGoalInputProps = InputProps<ProjectGoal | null> & {
  hours: number
}

const Container = styled.div`
  padding-left: ${toSizeUnit(panelDefaultPadding)};

  ${hStack({
    fullWidth: true,
    wrap: 'wrap',
  })}

  > * {
    height: 60px;
  }

  > *:only-child {
    flex: 1;
  }
`

export const ProjectGoalInput = ({
  value,
  onChange,
  hours,
}: ProjectGoalInputProps) => {
  return (
    <Container>
      <Switch
        size="s"
        onChange={() => onChange(value ? null : 'doMore')}
        value={value !== null}
        label={`Set a goal to work${value ? '' : ' ...'}`}
      />
      {value !== null && (
        <>
          <TextEmbeddedRadioInput<ProjectGoal>
            value={value}
            onChange={onChange}
            options={projectGoals}
            renderOption={(option) => goalOptionName[option]}
          />
          <Text centerVertically color="contrast">
            {pluralize(hours, 'hour')} per week
          </Text>
        </>
      )}
    </Container>
  )
}

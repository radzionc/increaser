import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { useUser } from '@increaser/ui/user/state/user'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { ValueFinishProps } from '@lib/ui/props'

type SelectGoalTaskFactoryProps = ValueFinishProps<string> & {
  options: string[]
}

const Container = styled(ExpandableSelector)`
  background: ${getColor('transparent')};
  border-color: ${getColor('transparent')};
  color: ${getColor('contrast')};
  gap: 12px;
` as typeof ExpandableSelector<string>

export const SelectGoalTaskFactory = ({
  onFinish,
  options,
}: SelectGoalTaskFactoryProps) => {
  const { taskFactories } = useUser()
  return (
    <Container
      value={null}
      openerContent="Select an existing task"
      onChange={onFinish}
      options={options}
      getOptionKey={(option) => option}
      getOptionName={(option) => taskFactories[option].name}
      showToggle={false}
      renderOption={(option) => (
        <>
          <Text>{taskFactories[option].name}</Text>
        </>
      )}
    />
  )
}

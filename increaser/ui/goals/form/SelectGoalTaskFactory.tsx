import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { useAssertUserState } from '../../user/UserStateContext'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'

type SelectGoalTaskFactoryProps = {
  onFinish: (id: string) => void
  options: string[]
}

const Container = styled(ExpandableSelector)`
  background: ${getColor('transparent')};
  border-color: ${getColor('mistExtra')};
  color: ${getColor('contrast')};
  gap: 12px;
` as typeof ExpandableSelector<string>

export const SelectGoalTaskFactory = ({
  onFinish,
  options,
}: SelectGoalTaskFactoryProps) => {
  const { taskFactories } = useAssertUserState()
  return (
    <Container
      value={null}
      openerContent="Select an existing task"
      onChange={onFinish}
      options={options}
      getOptionKey={(option) => option}
      getOptionName={(option) => taskFactories[option].task.name}
      renderOption={(option) => (
        <>
          <Text>{taskFactories[option].task.name}</Text>
        </>
      )}
    />
  )
}

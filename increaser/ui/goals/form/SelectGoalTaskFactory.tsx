import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { useAssertUserState } from '../../user/UserStateContext'
import { Text } from '@lib/ui/text'

type SelectGoalTaskFactoryProps = {
  onFinish: (id?: string) => void
  options: string[]
}

export const SelectGoalTaskFactory = ({
  onFinish,
  options,
}: SelectGoalTaskFactoryProps) => {
  const { goals } = useAssertUserState()
  return (
    <ExpandableSelector
      value={null}
      openerContent="Select an existing task"
      floatingOptionsWidthSameAsOpener={false}
      onChange={onFinish}
      options={options}
      getOptionKey={(option) => option}
      renderOption={(option) => (
        <>
          <Text>{goals[option].name}</Text>
        </>
      )}
    />
  )
}

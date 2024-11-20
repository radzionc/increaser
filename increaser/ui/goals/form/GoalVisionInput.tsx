import { InputProps } from '@lib/ui/props'
import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { useMemo } from 'react'
import { without } from '@lib/utils/array/without'
import { LinkedEntitiesContainer } from './linkedEntity/LinkedEntitiesContainer'
import { AddLinkedEntity } from './linkedEntity/AddLinkedEntity'
import { LinkEntity } from './linkedEntity/LinkEntity'
import { LinkedEntityActionsContainer } from './linkedEntity/LinkedEntityActionsContainer'
import { useVisionAttributes } from '../../vision/hooks/useVisionAttributes'
import { ActiveVisionItem } from '../../vision/ActiveVisionItem'
import { CurrentVisionAttributeProvider } from '../../vision/CurrentVisionAttributeProvider'
import { CreateVisionAttributeForm } from '../../vision/form/CreateVisionAttributeForm'
import { ManageGoalVision } from './ManageGoalVision'
import { goalLinkedEntityTitle } from './linkedEntity/GoalLinkedEntity'

export const GoalVisionInput = ({ value, onChange }: InputProps<string[]>) => {
  const attributes = useVisionAttributes()

  const options = useMemo(
    () => attributes.filter(({ id }) => !value.includes(id)),
    [attributes, value],
  )

  return (
    <LinkedEntitiesContainer title={goalLinkedEntityTitle.vision}>
      <VStack>
        {value.length > 0 && (
          <ActiveItemIdProvider initialValue={null}>
            <ActiveVisionItem />

            {attributes
              .filter(({ id }) => value.includes(id))
              .map((item) => (
                <CurrentVisionAttributeProvider key={item.id} value={item}>
                  <ManageGoalVision
                    onRemove={() => onChange(without(value, item.id))}
                  />
                </CurrentVisionAttributeProvider>
              ))}
          </ActiveItemIdProvider>
        )}
        <LinkedEntityActionsContainer>
          <AddLinkedEntity
            renderCreateForm={({ onClose }) => (
              <CreateVisionAttributeForm
                onFinish={(item) => {
                  onClose()
                  if (item) {
                    onChange([...value, item.id])
                  }
                }}
              />
            )}
          />
          <LinkEntity
            options={options}
            getOptionName={(option) => option.name}
            getOptionKey={(option) => option.id}
            getOptionEmoji={(option) => option.emoji}
            onFinish={(item) => {
              onChange([...value, item.id])
            }}
          />
        </LinkedEntityActionsContainer>
      </VStack>
    </LinkedEntitiesContainer>
  )
}

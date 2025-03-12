import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { InputProps } from '@lib/ui/props'
import { without } from '@lib/utils/array/without'
import { useMemo } from 'react'

import { ActiveVisionItem } from '../../vision/ActiveVisionItem'
import { CurrentVisionAttributeProvider } from '../../vision/CurrentVisionAttributeProvider'
import { CreateVisionAttributeForm } from '../../vision/form/CreateVisionAttributeForm'
import { useVisionAttributes } from '../../vision/hooks/useVisionAttributes'

import { AddLinkedEntity } from './linkedEntity/AddLinkedEntity'
import { goalLinkedEntityTitle } from './linkedEntity/GoalLinkedEntity'
import { LinkedEntitiesContainer } from './linkedEntity/LinkedEntitiesContainer'
import { LinkedEntityActionsContainer } from './linkedEntity/LinkedEntityActionsContainer'
import { LinkEntity } from './linkedEntity/LinkEntity'
import { ManageGoalVision } from './ManageGoalVision'

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

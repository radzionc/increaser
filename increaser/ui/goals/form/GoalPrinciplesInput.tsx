import { InputProps } from '@lib/ui/props'
import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { useMemo } from 'react'
import { without } from '@lib/utils/array/without'
import { CurrentPrincipleProvider } from '../../principles/CurrentPrincipleProvider'
import { usePrinciples } from '../../principles/hooks/usePrinciples'
import { ActivePrinciple } from '../../principles/ActivePrinciple'
import { LinkedEntitiesContainer } from './linkedEntity/LinkedEntitiesContainer'
import { AddLinkedEntity } from './linkedEntity/AddLinkedEntity'
import { LinkEntity } from './linkedEntity/LinkEntity'
import { LinkedEntityActionsContainer } from './linkedEntity/LinkedEntityActionsContainer'
import { CreatePrincipleForm } from '../../principles/form/CreatePrincipleForm'
import { useUser } from '../../user/state/user'
import { ManageGoalPrinciple } from './ManageGoalPrinciple'
import { goalLinkedEntityTitle } from './linkedEntity/GoalLinkedEntity'

export const GoalPrinciplesInput = ({
  value,
  onChange,
}: InputProps<string[]>) => {
  const principles = usePrinciples()
  const { principleCategories } = useUser()

  const options = useMemo(
    () => principles.filter(({ id }) => !value.includes(id)),
    [principles, value],
  )

  return (
    <LinkedEntitiesContainer title={goalLinkedEntityTitle.principle}>
      <VStack>
        {value.length > 0 && (
          <ActiveItemIdProvider initialValue={null}>
            <ActivePrinciple />

            {principles
              .filter(({ id }) => value.includes(id))
              .map((item) => (
                <CurrentPrincipleProvider key={item.id} value={item}>
                  <ManageGoalPrinciple
                    onRemove={() => onChange(without(value, item.id))}
                  />
                </CurrentPrincipleProvider>
              ))}
          </ActiveItemIdProvider>
        )}
        <LinkedEntityActionsContainer>
          <AddLinkedEntity
            renderCreateForm={({ onClose }) => (
              <CreatePrincipleForm
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
            getOptionEmoji={(option) =>
              principleCategories[option.categoryId].emoji
            }
            onFinish={(item) => {
              onChange([...value, item.id])
            }}
          />
        </LinkedEntityActionsContainer>
      </VStack>
    </LinkedEntitiesContainer>
  )
}

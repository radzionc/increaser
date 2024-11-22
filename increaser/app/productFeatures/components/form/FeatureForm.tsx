import { useState } from 'react'
import { useProposeFeatureMutation } from '../../hooks/useProposeFeatureMutation'
import { FeatureFormShape } from './FeatureFormShape'
import { Validators } from '@lib/ui/form/utils/Validators'
import { validate } from '@lib/ui/form/utils/validate'
import { ListItemForm } from '@increaser/ui/form/ListItemForm'
import { getId } from '@increaser/entities-utils/shared/getId'
import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { EmbeddedDescriptionInput } from '@lib/ui/inputs/EmbeddedDescriptionInput'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'

const initialValue: FeatureFormShape = {
  name: '',
  description: '',
}

const featureFormValidator: Validators<FeatureFormShape> = {
  name: (name) => {
    if (!name) {
      return 'Name is required'
    }
  },
  description: () => {},
}

const TitleInput = styled(EmbeddedTitleInput)`
  background: ${getColor('background')};
`

export const FeatureForm = () => {
  const { mutate: proposeFeature } = useProposeFeatureMutation()

  const [value, setValue] = useState(initialValue)

  const errors = validate(value, featureFormValidator)

  const [isDisabled] = Object.values(errors)

  const onSubmit = () => {
    proposeFeature({
      name: value.name,
      description: value.description,
      id: getId(),
      createdAt: Date.now(),
    })
    setValue(initialValue)
  }

  return (
    <ListItemForm onSubmit={onSubmit} isDisabled={isDisabled}>
      <TitleInput
        placeholder="Feature name"
        autoFocus
        onChange={(name) =>
          setValue((prev) => ({
            ...prev,
            name,
          }))
        }
        value={value.name}
        onSubmit={onSubmit}
      />
      <EmbeddedDescriptionInput
        label="Details"
        placeholder="All the additional details here..."
        onChange={(description) =>
          setValue((prev) => ({
            ...prev,
            description,
          }))
        }
        rows={3}
        value={value.description}
      />
      <CancelSubmitFormFooter isDisabled={isDisabled} />
    </ListItemForm>
  )
}

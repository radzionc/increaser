import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import { validate } from '@lib/ui/form/utils/validate'
import { Validators } from '@lib/ui/form/utils/Validators'
import { EmbeddedDescriptionInput } from '@lib/ui/inputs/EmbeddedDescriptionInput'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { getColor } from '@lib/ui/theme/getters'
import { getId } from '@product/entities-utils/shared/getId'
import { ListItemForm } from '@product/ui/form/ListItemForm'
import { useState } from 'react'
import styled from 'styled-components'

import { useProposeFeatureMutation } from '../../hooks/useProposeFeatureMutation'

import { FeatureFormShape } from './FeatureFormShape'

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

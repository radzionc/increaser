import { Button } from '@lib/ui/buttons/Button'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { FinishableComponentProps } from '@lib/ui/props'
import { useProposeFeatureMutation } from '../hooks/useProposeFeatureMutation'
import { useState } from 'react'
import { Fields } from '@lib/ui/inputs/Fields'
import { Field } from '@lib/ui/inputs/Field'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { TextArea } from '@lib/ui/inputs/TextArea'
import { Validators } from '@lib/ui/form/utils/Validators'
import { validate } from '@lib/ui/form/utils/validate'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Modal } from '@lib/ui/modal'

type FeatureFormShape = {
  name: string
  description: string
}

const featureFormValidator: Validators<FeatureFormShape> = {
  name: (name) => {
    if (!name) {
      return 'Name is required'
    }
  },
  description: (description) => {
    if (!description) {
      return 'Description is required'
    }
  },
}

export const ProposeFeatureForm = ({ onFinish }: FinishableComponentProps) => {
  const { mutate } = useProposeFeatureMutation()

  const [value, setValue] = useState<FeatureFormShape>({
    name: '',
    description: '',
  })

  const errors = validate(value, featureFormValidator)

  const [isDisabled] = Object.values(errors)

  return (
    <Modal
      title="Propose a Feature"
      onClose={onFinish}
      width={440}
      footer={
        <UniformColumnGrid gap={20}>
          <Button size="l" type="button" kind="secondary" onClick={onFinish}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (isDisabled) return

              mutate({
                name: value.name,
                description: value.description,
                id: getId(),
                createdAt: Date.now(),
              })
              onFinish()
            }}
            isDisabled={isDisabled}
            size="l"
            type="submit"
            kind="primary"
          >
            Submit
          </Button>
        </UniformColumnGrid>
      }
    >
      <Fields>
        <Field>
          <TextInput
            autoFocus
            value={value.name}
            onValueChange={(name) => setValue({ ...value, name })}
            label="Title"
            placeholder="Give your feature a clear name"
          />
        </Field>
        <Field>
          <TextArea
            rows={4}
            value={value.description}
            onValueChange={(description) => setValue({ ...value, description })}
            label="Description"
            placeholder="Describe your feature for easy understanding"
          />
        </Field>
      </Fields>
    </Modal>
  )
}

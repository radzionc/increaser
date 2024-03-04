import { Button } from '@lib/ui/buttons/Button'
import { Form } from '@lib/ui/form/components/Form'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { Panel } from '@lib/ui/panel/Panel'
import { FinishableComponentProps } from '@lib/ui/props'
import styled from 'styled-components'
import { useProposeFeatureMutation } from '../hooks/useProposeFeatureMutation'
import { useState } from 'react'
import { Fields } from '@lib/ui/inputs/Fields'
import { Field } from '@lib/ui/inputs/Field'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { TextArea } from '@lib/ui/inputs/TextArea'
import { Validators } from '@lib/ui/form/utils/Validators'
import { validate } from '@lib/ui/form/utils/validate'
import { getId } from '@increaser/entities-utils/shared/getId'

const Container = styled(Panel)``

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
    <Container kind="secondary">
      <Form
        onSubmit={() => {
          if (isDisabled) return

          mutate({
            name: value.name,
            description: value.description,
            id: getId(),
            createdAt: Date.now(),
          })
          onFinish()
        }}
        content={
          <Fields>
            <Field>
              <TextInput
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
                onValueChange={(description) =>
                  setValue({ ...value, description })
                }
                label="Description"
                placeholder="Detail your feature for easy understanding"
              />
            </Field>
          </Fields>
        }
        actions={
          <UniformColumnGrid gap={20}>
            <Button size="l" type="button" kind="secondary" onClick={onFinish}>
              Cancel
            </Button>
            <Button
              isDisabled={isDisabled}
              size="l"
              type="submit"
              kind="primary"
            >
              Submit
            </Button>
          </UniformColumnGrid>
        }
      />
    </Container>
  )
}

import { Button } from '@lib/ui/buttons/Button'
import { Panel } from '@lib/ui/css/panel'
import { HStack } from '@lib/ui/css/stack'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { InputLabel } from '@lib/ui/inputs/InputLabel'
import { OnFinishProp } from '@lib/ui/props'
import { DayInput } from '@lib/ui/time/day/DayInput'
import { stringToDay, dayToString, Day } from '@lib/utils/time/Day'
import { useUser } from '@product/ui/user/state/user'
import { useState } from 'react'
import styled from 'styled-components'

import { useUpdateUserMutation } from '../../user/mutations/useUpdateUserMutation'

import { getDefaultDob } from './getDefaultDob'
import { useDobBoundaries } from './useDobBoundaries'

const Container = styled(HStack)`
  width: 100%;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
`

export const SetDobForm = ({ onFinish }: OnFinishProp) => {
  const { dob } = useUser()
  const { mutate: updateUser } = useUpdateUserMutation()
  const [value, setValue] = useState<Day>(() => {
    if (dob) {
      return stringToDay(dob)
    }

    return getDefaultDob()
  })

  const [min, max] = useDobBoundaries()

  return (
    <InputContainer as="div" style={{ gap: 8 }}>
      <InputLabel>Your date of birth</InputLabel>
      <Panel kind="secondary">
        <Container
          as="form"
          {...getFormProps({
            onClose: onFinish,
            onSubmit: () => {
              updateUser({ dob: dayToString(value) })
              onFinish()
            },
          })}
        >
          <DayInput min={min} max={max} value={value} onChange={setValue} />
          <Button type="submit">Submit</Button>
        </Container>
      </Panel>
    </InputContainer>
  )
}

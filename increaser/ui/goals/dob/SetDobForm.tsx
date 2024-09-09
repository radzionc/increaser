import { HStack } from '@lib/ui/css/stack'
import { Button } from '@lib/ui/buttons/Button'
import styled from 'styled-components'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { DayInput } from '@lib/ui/time/day/DayInput'
import { stringToDay, dayToString, Day } from '@lib/utils/time/Day'
import { NoValueFinishProps } from '@lib/ui/props'
import { useState } from 'react'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { useUpdateUserMutation } from '../../user/mutations/useUpdateUserMutation'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { useAssertUserState } from '../../user/UserStateContext'
import { Panel } from '@lib/ui/css/panel'
import { useDobBoundaries } from './useDobBoundaries'
import { getDefaultDob } from './getDefaultDob'

const Container = styled(HStack)`
  width: 100%;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
`

export const SetDobForm = ({ onFinish }: NoValueFinishProps) => {
  const { dob } = useAssertUserState()
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
      <LabelText>Your date of birth</LabelText>
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
          <Button>Submit</Button>
        </Container>
      </Panel>
    </InputContainer>
  )
}

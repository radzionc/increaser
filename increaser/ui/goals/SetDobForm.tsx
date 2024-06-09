import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import styled from 'styled-components'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { DayInput } from '@lib/ui/time/DayInput'
import { toDay, stringToDay, dayToString, Day } from '@lib/utils/time/Day'
import { FinishableComponentProps } from '@lib/ui/props'
import { useMemo, useState } from 'react'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { subYears } from 'date-fns'
import { useUpdateUserMutation } from '../user/mutations/useUpdateUserMutation'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { useAssertUserState } from '../user/UserStateContext'
import { Panel } from '@lib/ui/panel/Panel'

const Container = styled(HStack)`
  width: 100%;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
`

export const SetDobForm = ({ onFinish }: FinishableComponentProps) => {
  const { dob } = useAssertUserState()
  const { mutate: updateUser } = useUpdateUserMutation()
  const [value, setValue] = useState<Day>(() => {
    if (dob) {
      return stringToDay(dob)
    }

    return toDay(subYears(Date.now(), 20).getTime())
  })

  const maxDob = useMemo(() => toDay(subYears(Date.now(), 6).getTime()), [])
  const minDob = useMemo(() => toDay(subYears(Date.now(), 100).getTime()), [])

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
          <DayInput
            min={minDob}
            max={maxDob}
            value={value}
            onChange={setValue}
          />
          <Button>Submit</Button>
        </Container>
      </Panel>
    </InputContainer>
  )
}

import { analytics } from 'analytics'
import { useProjects } from 'projects/hooks/useProjects'
import { getProjectColor } from 'projects/utils/getProjectColor'
import { Controller, useForm } from 'react-hook-form'
import { Set } from 'sets/Set'
import { useTheme } from 'styled-components'
import { Button } from '@increaser/ui/buttons/Button'
import { SubmitFormButton } from '@increaser/ui/buttons/SubmitFormButton'
import { Modal } from '@increaser/ui/modal'
import { VStack } from '@increaser/ui/layout/Stack'
import { MS_IN_MIN } from '@increaser/utils/time'

import { TodaySessionIntervalInput } from '../IntervalInput/TodaySessionIntervalInput'
import { SelectProject } from './SelectProject'
import { useAddSetMutation } from 'sets/hooks/useAddSetMutation'

interface Props {
  onClose: () => void
}

type SetFormShape = Pick<Set, 'projectId'> & {
  interval: Pick<Set, 'start' | 'end'>
}

export const CreateSetOverlay = ({ onClose }: Props) => {
  const { projectsRecord } = useProjects()

  const { handleSubmit, control, watch, setValue } = useForm<SetFormShape>({
    mode: 'onSubmit',
    defaultValues: {
      interval: {
        start: Date.now() - MS_IN_MIN * 30,
        end: Date.now(),
      },
    },
  })

  const projectId = watch('projectId')

  const isProjectSelected = !!projectId

  const { mutate: addSet } = useAddSetMutation()

  const theme = useTheme()

  const onSubmit = ({ projectId, interval }: SetFormShape) => {
    addSet({ projectId, ...interval })
    analytics.trackEvent('Add session')
    onClose()
  }

  return (
    <Modal
      title="Add Session"
      width={380}
      placement="top"
      onClose={onClose}
      footer={
        isProjectSelected ? (
          <VStack fullWidth gap={4}>
            <SubmitFormButton
              onClick={handleSubmit(onSubmit)}
              text={`Add ${projectsRecord[projectId].name} Session`}
            />
            <Button
              size="l"
              kind="ghostSecondary"
              onClick={() => setValue('projectId', '')}
            >
              Back
            </Button>
          </VStack>
        ) : undefined
      }
    >
      {isProjectSelected ? (
        <VStack fullWidth>
          <Controller
            control={control}
            name="interval"
            render={({ field: { value, onChange } }) => {
              return (
                <TodaySessionIntervalInput
                  color={getProjectColor(projectsRecord, theme, projectId)}
                  value={value}
                  onChange={onChange}
                />
              )
            }}
          />
        </VStack>
      ) : (
        <Controller
          control={control}
          name="projectId"
          render={({ field: { onChange } }) => (
            <SelectProject onSelect={onChange} />
          )}
        />
      )}
    </Modal>
  )
}

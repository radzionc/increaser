import { Modal } from '@lib/ui/modal'
import { ClosableComponentProps } from '@lib/ui/props'
import { focusAudioConfig } from '../../config'
import { validate } from '@lib/ui/form/utils/validate'
import { useState } from 'react'
import { combineValidators } from '@lib/utils/validation/combineValidators'
import { getUniqueValueValidator } from '@lib/utils/validation/getUniqueValueValidator'
import { validateUrl } from '@lib/utils/validation/validateUrl'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { TextInput } from '@lib/ui/inputs/TextInput'
import YouTubePlayer from 'react-player/lazy'
import { VStack } from '@lib/ui/css/stack'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'

type VideoFormShape = {
  url: string
  name: string
}

const VideoContainer = styled.div`
  overflow: hidden;
  width: 100%;
  background: ${getColor('foreground')};
  ${borderRadius.s};
  aspect-ratio: 16 / 9;
`

export const AddYouTubeVideoOverlay = ({ onClose }: ClosableComponentProps) => {
  const [value, setValue] = useState<VideoFormShape>({
    url: '',
    name: '',
  })

  const { focusSounds } = useAssertUserState()
  const { mutate: updateUser } = useUpdateUserMutation()

  const validateUnique = getUniqueValueValidator(
    new Set(focusSounds.map((sound) => sound.url)),
    'sound',
  )

  const errors = validate(value, {
    url: combineValidators(validateUrl, validateUnique),
    name: (name) => {
      if (!name) {
        return 'Give it a name'
      }
    },
  })

  const [isDisabled] = Object.values(errors)

  return (
    <Modal
      title="Add a YouTube video"
      targetWidth={focusAudioConfig.modalWidth}
      placement="top"
      onClose={onClose}
      as="form"
      {...getFormProps({
        isDisabled,
        onClose,
        onSubmit: () => {
          updateUser({
            focusSounds: [
              {
                url: value.url,
                name: value.name,
                favourite: true,
              },
              ...focusSounds,
            ],
          })
          onClose()
        },
      })}
      footer={<CreateFormFooter onCancel={onClose} isDisabled={isDisabled} />}
    >
      <VStack gap={20}>
        <TextInput
          label="YouTube video URL"
          placeholder="https://youtu.be/..."
          value={value.url}
          onValueChange={(url) => setValue({ ...value, url })}
        />
        {value.url && (
          <>
            <ElementSizeAware
              render={({ setElement, size }) => {
                return (
                  <VideoContainer ref={setElement}>
                    {size && (
                      <YouTubePlayer
                        loop
                        url={value.url}
                        width={size.width}
                        height={size.height}
                        volume={0.8}
                        config={{
                          youtube: {
                            playerVars: {
                              autoplay: 1,
                              controls: 0,
                              iv_load_policy: 3,
                            },
                          },
                        }}
                      />
                    )}
                  </VideoContainer>
                )
              }}
            />
            <TextInput
              label="Name"
              autoFocus
              placeholder="Focus music"
              value={value.name}
              onValueChange={(name) => setValue({ ...value, name })}
            />
          </>
        )}
      </VStack>
    </Modal>
  )
}

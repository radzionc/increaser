import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { validate } from '@lib/ui/form/utils/validate'
import { Fields } from '@lib/ui/inputs/Fields'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { Modal } from '@lib/ui/modal'
import { ModalContent } from '@lib/ui/modal/ModalContent'
import { OnCloseProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { trimTextWithoutCuttingWords } from '@lib/utils/string/trimTextWithoutCuttingWords'
import { combineValidators } from '@lib/utils/validation/combineValidators'
import { getUniqueValueValidator } from '@lib/utils/validation/getUniqueValueValidator'
import { validateUrl } from '@lib/utils/validation/validateUrl'
import { useUpdateUserMutation } from '@product/ui/user/mutations/useUpdateUserMutation'
import { useUser } from '@product/ui/user/state/user'
import { useState } from 'react'
import YouTubePlayer from 'react-player/lazy'
import styled from 'styled-components'

import { focusAudioConfig } from '../../config'
import { useYouTubeFocusPreference } from '../state/useYouTubeFocusPreference'

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

export const AddYouTubeVideoOverlay = ({ onClose }: OnCloseProp) => {
  const [value, setValue] = useState<VideoFormShape>({
    url: '',
    name: '',
  })

  const [, setPreference] = useYouTubeFocusPreference()

  const { focusSounds } = useUser()
  const { mutate: updateUser } = useUpdateUserMutation({
    onOptimisticUpdate: () => {
      setPreference((prev) => ({ ...prev, url: value.url }))
      onClose()
    },
  })

  const validateUnique = getUniqueValueValidator(
    new Set(focusSounds.map((sound) => sound.url)),
    'sound',
  )

  const errors = validate(value, {
    url: combineValidators(validateUrl, validateUnique),
    name: (name) => {
      if (!name) {
        return 'Enter a name for the video'
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
        },
      })}
      footer={
        <CancelSubmitFormFooter onCancel={onClose} isDisabled={isDisabled} />
      }
    >
      <ModalContent gap={40}>
        <Fields>
          <TextInput
            label="YouTube video URL"
            placeholder="https://youtu.be/..."
            value={value.url}
            onValueChange={(url) => setValue({ ...value, url })}
            autoFocus
          />
          {!errors.url && (
            <TextInput
              label="Name"
              autoFocus
              placeholder="Focus music"
              value={value.name}
              onValueChange={(name) => setValue({ ...value, name })}
            />
          )}
        </Fields>
        {!errors.url && (
          <ElementSizeAware
            render={({ setElement, size }) => (
              <VideoContainer ref={setElement}>
                {size && (
                  <YouTubePlayer
                    loop
                    url={value.url}
                    width={size.width}
                    height={size.height}
                    volume={0.8}
                    onReady={(player) => {
                      const title = player.getInternalPlayer().videoTitle
                      if (title && !value.name) {
                        setValue((prev) => ({
                          ...prev,
                          name: trimTextWithoutCuttingWords(title, 40),
                        }))
                      }
                    }}
                    config={{
                      youtube: {
                        playerVars: {
                          controls: 0,
                          iv_load_policy: 3,
                        },
                      },
                    }}
                  />
                )}
              </VideoContainer>
            )}
          />
        )}
      </ModalContent>
    </Modal>
  )
}

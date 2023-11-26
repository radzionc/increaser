import { ExternalLink } from 'router/Link/ExternalLink'
import { SCHEDULE_EDUCATION_URL } from 'shared/externalResources'
import { PersistentStateKey } from 'state/persistentState'
import { usePersistentState } from 'state/persistentState'
import { ThemeProvider } from 'styled-components'
import { Button } from '@increaser/ui/buttons/Button'
import { YouTubeIcon } from '@increaser/ui/icons/YouTubeIcon'
import { ImageBanner } from '@increaser/ui/images/ImageBanner'
import { CoverImage } from '@increaser/ui/images/CoverImage'
import { SafeImage } from '@increaser/ui/images/SafeImage'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { darkTheme } from '@increaser/ui/theme/darkTheme'

export const ScheduleEducationBanner = () => {
  const [interactionDate, setInteractionDate] = usePersistentState<
    number | undefined
  >(PersistentStateKey.ScheduleEducationWasAt, undefined)

  const handleInteraction = () => {
    setInteractionDate(Date.now())
  }

  if (interactionDate) return null

  return (
    <ThemeProvider theme={darkTheme}>
      <ImageBanner
        onClose={handleInteraction}
        action={
          <Button size="xl" kind="reversed" as="div">
            <HStack alignItems="center" gap={8}>
              <YouTubeIcon />
              <Text>Watch now</Text>
            </HStack>
          </Button>
        }
        title={
          <Text height="regular" as="span" color="reversed">
            how to finish
            <br />
            important work
            <br /> before breakfast
          </Text>
        }
        renderInteractiveArea={(props) => (
          <ExternalLink
            onClick={handleInteraction}
            to={SCHEDULE_EDUCATION_URL}
            {...props}
          />
        )}
        image={
          <SafeImage
            src="/images/beach.webp"
            render={(props) => <CoverImage {...props} />}
          />
        }
      />
    </ThemeProvider>
  )
}

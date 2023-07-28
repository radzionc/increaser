import { ExternalLink } from 'router/Link/ExternalLink'
import { HABITS_EDUCATION_URL } from 'shared/externalResources'
import { PersistentStorageKey } from 'state/persistentStorage'
import { usePersistentStorageValue } from 'state/persistentStorage'
import { ThemeProvider } from 'styled-components'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { YouTubeIcon } from '@increaser/ui/ui/icons/YouTubeIcon'
import { ImageBanner } from '@increaser/ui/ui/ImageBanner'
import { CoverImage } from '@increaser/ui/ui/images/CoverImage'
import { SafeImage } from '@increaser/ui/ui/images/SafeImage'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { darkTheme } from '@increaser/ui/ui/theme/darkTheme'

const titleColor = new HSLA(220, 45, 30)

export const HabitsEducationBanner = () => {
  const [interactionDate, setInteractionDate] = usePersistentStorageValue<
    number | undefined
  >(PersistentStorageKey.HabitsEducationWasAt, undefined)

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
          <Text as="span" style={{ color: titleColor.toCssValue() }}>
            learn to build better habits
          </Text>
        }
        renderInteractiveArea={(props) => (
          <ExternalLink
            onClick={handleInteraction}
            to={HABITS_EDUCATION_URL}
            {...props}
          />
        )}
        image={
          <SafeImage
            src="/images/mountains.webp"
            render={(props) => <CoverImage {...props} />}
          />
        }
      />
    </ThemeProvider>
  )
}

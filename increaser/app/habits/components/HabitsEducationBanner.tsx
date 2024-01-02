import { HABITS_EDUCATION_URL } from '@increaser/app/shared/externalResources'
import { PersistentStateKey } from '@increaser/app/state/persistentState'
import { usePersistentState } from '@increaser/app/state/persistentState'
import { ThemeProvider } from 'styled-components'
import { Button } from '@lib/ui/buttons/Button'
import { HSLA } from '@lib/ui/colors/HSLA'
import { YouTubeIcon } from '@lib/ui/icons/YouTubeIcon'
import { ImageBanner } from '@lib/ui/images/ImageBanner'
import { CoverImage } from '@lib/ui/images/CoverImage'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { darkTheme } from '@lib/ui/theme/darkTheme'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'

const titleColor = new HSLA(220, 45, 30)

export const HabitsEducationBanner = () => {
  const [interactionDate, setInteractionDate] = usePersistentState<
    number | undefined
  >(PersistentStateKey.HabitsEducationWasAt, undefined)

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

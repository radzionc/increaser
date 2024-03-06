import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

export const FocusDurationEducation = () => {
  return (
    <VStack gap={8}>
      <Text>
        According to Andrew Huberman, the best duration for focused work is
        around 90 minutes. While you can improve your ability to focus through
        different protocols, quality sleep, and consistent physical activities,
        most of us are limited to two or three 90 minutes blocks of deep work a
        day. Try doing more than that, and you'll quickly experience diminishing
        returns in productivity.
      </Text>
      <Text>
        You can divide the 90-minute block into a few sessions with small breaks
        or do it in one go. After one such block of work, it's good to have
        quality decompression time for at least 30 minutes where you are not
        focusing on anything specific and give your mind quality recovery time,
        e.g. cleaning, cooking, or exercising, but try to escape using the phone
        or checking social media.
      </Text>
      <Text>
        An easy scheduling technique to consistently finish work early is to do
        90 minutes block before breakfast and one after. That way, you will also
        get health benefits from intermittent fasting by pushing the first meal
        to later in the day.
      </Text>
    </VStack>
  )
}

import { Text } from '@lib/ui/text'
import { Center } from '@lib/ui/layout/Center'
import { makeWebsitePage } from '../layout/makeWebsitePage'

export default makeWebsitePage(() => {
  return (
    <Center>
      <Text color="contrast" as="h1">
        Increaser is a tool for increasing your productivity
      </Text>
    </Center>
  )
})

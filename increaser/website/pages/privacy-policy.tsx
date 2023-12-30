import { Text } from '@lib/ui/text'
import { Center } from '@lib/ui/layout/Center'
import { makeWebsitePage } from '../layout/makeWebsitePage'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { productName } from '@increaser/config'

const name = 'Privacy policy'

export default makeWebsitePage(() => {
  return (
    <>
      <PageMetaTags title={`${productName} - ${name}`} />
      <Center>
        <Text color="contrast" as="h1">
          {name}
        </Text>
      </Center>
    </>
  )
})

import { ComponentProps } from 'react'
import { Text } from '@increaser/ui/ui/Text'

export const SliceTitle = (props: ComponentProps<typeof Text>) => (
  <Text
    color="contrast"
    height="large"
    weight="bold"
    size={32}
    as="h1"
    style={{ textTransform: 'uppercase' }}
    {...props}
  />
)

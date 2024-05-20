import { Spacer } from '@lib/ui/layout/Spacer'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useIsScreenWidthLessThan } from '@lib/ui/hooks/useIsScreenWidthLessThan'
import { ReactNode } from 'react'
import { productName } from '@increaser/entities'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'

interface Props {
  title: React.ReactNode
  description?: string
  children?: ReactNode
  documentTitle?: string
}

const SMALL_SCREEN_BREAKPOINT = 600

export const PageTitle = ({
  title,
  children,
  description,
  documentTitle,
}: Props) => {
  const isSmallScreen = useIsScreenWidthLessThan(SMALL_SCREEN_BREAKPOINT)

  return (
    <>
      <HStack fullWidth justifyContent="space-between">
        <>
          <Text
            weight="semibold"
            style={{ flex: 1 }}
            as="div"
            color="contrast"
            size={isSmallScreen ? 24 : 32}
          >
            {title}
          </Text>
          {children}
        </>
      </HStack>
      {documentTitle && (
        <PageMetaTags title={[documentTitle, productName].join(' | ')} />
      )}
      {description && (
        <>
          <Spacer height={8} />
          <Text
            style={{ maxWidth: SMALL_SCREEN_BREAKPOINT }}
            color="supporting"
            size={18}
          >
            {description}
          </Text>
        </>
      )}
      <Spacer height={isSmallScreen ? 24 : 32} />
    </>
  )
}

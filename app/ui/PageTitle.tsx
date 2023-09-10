import { Spacer } from '@increaser/ui/ui/Spacer'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useIsScreenWidthLessThan } from '@increaser/ui/hooks/useIsScreenWidthLessThan'
import Head from 'next/head'
import { ReactNode } from 'react'
import { APP_NAME } from 'shared/product'

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
            size={isSmallScreen ? 24 : 32}
          >
            {title}
          </Text>
          {children}
        </>
      </HStack>
      {documentTitle && (
        <Head>
          <title>{[documentTitle, APP_NAME].join(' | ')}</title>
        </Head>
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

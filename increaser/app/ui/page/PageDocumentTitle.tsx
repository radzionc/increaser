import { productName } from '@increaser/config'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { EntityWithEmoji } from '@lib/utils/entities/EntityWithEmoji'

type PageDocumentTitleProps = EntityWithEmoji & {
  title: string
}

export const PageDocumentTitle = ({ title, emoji }: PageDocumentTitleProps) => (
  <PageMetaTags title={[`${emoji} ${title}`, productName].join(' | ')} />
)

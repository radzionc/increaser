import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { Changelog } from './Changelog'

export const ChangelogPage = () => (
  <>
    <PageMetaTags
      title="Increaser Changelog"
      description="Stay updated with the latest features, improvements, and bug fixes for Increaser. Discover what's new and how we're continuously enhancing your productivity experience."
    />
    <Changelog />
  </>
)

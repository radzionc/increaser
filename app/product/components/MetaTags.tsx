import { LogoMetaTags } from './LogoMetaTags'

interface SeoMetaTagsProps {
  title: string
  description: string
  image: string
  url: string
  twitterId?: string
}

export const MetaTags = ({
  title,
  description,
  image,
  url,
  twitterId,
}: SeoMetaTagsProps) => (
  <>
    <meta name="application-name" content={title} />
    <meta name="description" content={description} />

    <meta name="apple-mobile-web-app-title" content={title} />
    <meta name="apple-mobile-web-app-capable" content="yes" />

    <meta name="mobile-web-app-capable" content="yes" />

    <link rel="manifest" href="/manifest.json" />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={image} />
    <meta property="og:image:alt" content={description} />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    <meta http-equiv="Content-Language" content="en" />

    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:url" content={url} />
    <meta name="twitter:image:src" content={image} />
    <meta name="twitter:image:alt" content={description} />
    {twitterId && <meta name="twitter:site" content={twitterId} />}

    <LogoMetaTags />
  </>
)

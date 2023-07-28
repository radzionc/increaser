import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { IconsMeta } from 'product/components/IconsMeta'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />), //gets the styles from all the components inside <App>
        })
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {/*👇 insert the collected styles to the html document*/}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-name" content="Increaser" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Increaser" />
          <meta
            name="description"
            content="Stop overworking and get more done with right tools"
          />
          <meta name="msapplication-TileColor" content="#fff" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#1a1a1a" />

          {/* <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://yourdomain.com" />
          <meta name="twitter:title" content="PWA App" />
          <meta
          name="twitter:description"
          content="Best PWA App in the world"
          />
          <meta
          name="twitter:image"
          content="https://yourdomain.com/icons/android-chrome-192x192.png"
          />
          <meta name="twitter:creator" content="@DavidWShadow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="PWA App" />
          <meta property="og:description" content="Best PWA App in the world" />
          <meta property="og:site_name" content="PWA App" />
          <meta property="og:url" content="https://yourdomain.com" />
          <meta
          property="og:image"
          content="https://yourdomain.com/icons/apple-touch-icon.png"
        /> */}

          <IconsMeta />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

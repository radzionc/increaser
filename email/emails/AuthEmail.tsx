import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Font,
} from '@react-email/components'

interface AuthEmailProps {
  url: string
  email: string
}

export const AuthEmail = ({
  url,
  email = 'john@gmail.com',
}: AuthEmailProps) => (
  <Html>
    <Head>
      <Font
        fontFamily="OpenSans"
        fallbackFontFamily="Verdana"
        webFont={{
          url: 'https://fonts.gstatic.com/s/opensans/v36/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-mu0SC55I.woff2',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Font
        fontFamily="OpenSans"
        fallbackFontFamily="Verdana"
        webFont={{
          url: 'https://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVIUwaEQbjA.woff2',
          format: 'woff2',
        }}
        fontWeight={700}
        fontStyle="normal"
      />
    </Head>
    <Preview>Log in to Increaser</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://increaser.org/images/logo.png`}
          width="68"
          height="68"
          alt="Increaser"
        />
        <Heading style={heading}>Increaser</Heading>
        <Text>
          Click the button below to log in to <b>Increaser</b>.
          <br />
          This button will expire in 20 minutes.
        </Text>
        <Section style={buttonContainer}>
          <Button pY={20} pX={20} style={button} href={url}>
            Log in to Increaser
          </Button>
        </Section>
        <Text>
          Confirming this request will securely log you in using{' '}
          <a style={userEmail}>{email}</a>.
        </Text>
        <Text>- Increaser Team</Text>
      </Container>
    </Body>
  </Html>
)

export default AuthEmail

const main = {
  backgroundColor: '#ffffff',
  color: '#000000',
  fontFamily:
    'OpenSans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '500px',
}

const heading = {
  fontSize: '32px',
  fontWeight: '700',
  lineHeight: '1.3',
}

const button = {
  backgroundColor: '#2282e2',
  borderRadius: '8px',
  fontWeight: '700',
  color: '#fff',
  fontSize: '18px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
}

const buttonContainer = {
  padding: '8px 0 8px',
}

const userEmail = {
  textDecoration: 'none',
  color: '#2282e2',
  fontWeight: 700,
}

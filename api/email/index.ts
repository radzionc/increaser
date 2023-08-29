import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'

type HtmlTemplate = 'auth' | 'appsumo-refund'

const templateRecord: Record<HtmlTemplate, string> = {
  auth: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    </head>
    <body style="font-family: sans-serif">
      <div style="margin: 0 auto; max-width: 450px">
        <h2 style="text-align: center">
          Hey {{email}}! Welcome to increaser.org
        </h2>
  
        <h3 style="text-align: center">
          Click the button below to login to increaser.org
        </h3>
  
        <a
          href="{{auth-link}}"
          style="
            display: block;
            margin: 0 auto;
            width: 80%;
            padding: 1.5rem;
            background: #2282e2;
            border-radius: 7px;
            border-width: 0;
            font-size: 1.1rem;
            text-align: center;
            font-family: sans-serif;
            text-decoration: none;
            color: white;
          "
        >
          Login to Increaser
        </a>
  
        <div style="text-align: center; margin-top: 1rem; font-size: 0.9rem">
          <div style="color: grey">This link is valid for 30 minutes.</div>
          <a
            href="https://increaser.org"
            style="margin-top: 0.4rem; display: block"
            >Click here to request a new link.</a
          >
        </div>
  
        <hr
          style="
            width: 20%;
            height: 0px;
            border: 1px solid lightgrey;
            margin-top: 2rem;
            margin-bottom: 2rem;
          "
        />
  
        <div
          style="
            text-align: center;
            color: grey;
            font-size: 0.8rem;
            line-height: 1.2rem;
          "
        >
          You received this because your email address was used to sign up for an
          account on
          <a href="https://increaser.org" style="color: grey">increaser.org</a>.
          If you didn't sign up for an account, feel free to disregard this email.
        </div>
      </div>
    </body>
  </html>
  `,
  ['appsumo-refund']: `<p>Hi {{name}}!</p>

  <p>
    I noticed you refunded Increaser on AppSumo. I'm curious, what was missing for
    you?
  </p>
  
  <p>
    -- <br />
    Stay productive,<br />
    Radzion<br />
  </p>
  `,
}

export const getHTMLTemplate = (template: HtmlTemplate) =>
  templateRecord[template]

export const fillHtmlTemplate = (
  html: string,
  variables: Record<string, string>,
) => {
  let result = html
  Object.entries(variables).forEach(([key, value]) => {
    result = result.split(`{{${key}}}`).join(value)
  })

  return result
}

interface SendEmailParameters {
  email: string
  body: string
  subject: string
  source: string
}

const client = new SESv2Client({ region: 'us-east-1' })

export const sendEmail = ({
  email,
  body,
  subject,
  source,
}: SendEmailParameters) => {
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [email],
    },
    Content: {
      Simple: {
        Body: {
          Html: {
            Data: body,
          },
        },
        Subject: {
          Data: subject,
        },
      },
    },
    FromEmailAddress: source,
  })

  return client.send(command)
}

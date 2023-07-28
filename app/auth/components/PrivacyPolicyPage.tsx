import { ExternalLink } from 'router/Link/ExternalLink'
import { Path } from 'router/Path'
import { APP_NAME, APP_SUPPORT_EMAIL } from 'shared/product'

import { LegalPage } from './LegalPage'
import { LegalSection } from './LegalSection'
import Link from 'next/link'

export const PrivacyPolicyPage = () => {
  return (
    <LegalPage title="Privacy Policy">
      <LegalSection title="Privacy policy">
        Your privacy is important to us, and so is being transparent about how
        we collect, use, and share information about you. This Privacy Policy
        covers the information we collect about you when you use our products or
        services, or otherwise interact with ${APP_NAME}. If you do not agree
        with this policy, do not access or use our services or interact with any
        other aspect of our business.
      </LegalSection>
      <LegalSection title="Name, email and country">
        To create an account, we need your name and email address. Your name and
        email are used to identify your user in support of errands. Your email
        will also be used to send you notifications and newsletters. We receive
        your name and email from the authorization provider you are using to
        sign in, and country determined by location from where you started an
        interaction with the service.
      </LegalSection>
      <LegalSection title="Billing information">
        When you sign up for a membership, your billing information is needed.
        You may update your billing information under the Settings section.
      </LegalSection>
      <LegalSection title="Terms of Service">
        Please also read our{' '}
        <Link href={Path.TermsOfService}>Terms of Service</Link>, establishing
        the use, disclaimers, and limitations of liability governing the use of
        our service.
      </LegalSection>
      <LegalSection title="Your consent">
        By using our service, you consent to our Privacy Policy. You have the
        right to complain to the data protection authority in the country where
        you live, work, or where you feel your rights were not upheld.
      </LegalSection>
      <LegalSection title="Changes to our Privacy Policy">
        If we decide to change our Privacy Policy, we will post those changes on
        this page. For significant changes, you will be prompted from the
        application and/or by email to accept those changes to keep using the
        service.
      </LegalSection>
      <LegalSection title="The data we collect">
        This privacy policy applies to all personal data processed in Increaser,
        which typically includes focus sessions along with personal data used to
        create an account (name and email address).
      </LegalSection>
      <LegalSection title="Data use">
        The personal information as indicated being collected above is used for
        identification, authentication, service improvement, and contact.
        Although Increaser owns the code, databases, and all rights to the Llama
        application, you retain all rights to your data. We will never share
        your personal data with a 3rd party without your prior authorization,
        and we will never sell data to 3rd parties.
      </LegalSection>
      <LegalSection title="Data deletion">
        You have the right to request the erasure of your personal data. This
        enables you to ask us to delete or remove personal data by sending an
        email to{' '}
        <ExternalLink to={`mailto:${APP_SUPPORT_EMAIL}`}>
          {APP_SUPPORT_EMAIL}
        </ExternalLink>
      </LegalSection>
    </LegalPage>
  )
}

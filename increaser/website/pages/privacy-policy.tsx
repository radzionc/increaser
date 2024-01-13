import { makeWebsitePage } from '../layout/makeWebsitePage'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { productName, supportEmail } from '@increaser/config'
import { LegalPageContent } from '@lib/ui/website/legal/LegalPageContent'
import { LegalPageSection } from '@lib/ui/website/legal/LegalPageSection'
import Link from 'next/link'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { WebsitePath } from '@increaser/ui/navigation/WebsitePath'

const name = 'Privacy policy'

export default makeWebsitePage(() => {
  return (
    <>
      <PageMetaTags title={`${productName} - ${name}`} />
      <LegalPageContent title={name}>
        <LegalPageSection title="Privacy policy">
          Your privacy is important to us, and so is being transparent about how
          we collect, use, and share information about you. This Privacy Policy
          covers the information we collect about you when you use our products
          or services, or otherwise interact with ${productName}. If you do not
          agree with this policy, do not access or use our services or interact
          with any other aspect of our business.
        </LegalPageSection>
        <LegalPageSection title="Name, email and country">
          To create an account, we need your name and email address. Your name
          and email are used to identify your user in support of errands. Your
          email will also be used to send you notifications and newsletters. We
          receive your name and email from the authorization provider you are
          using to sign in, and country determined by location from where you
          started an interaction with the service.
        </LegalPageSection>
        <LegalPageSection title="Billing information">
          When you sign up for a membership, your billing information is needed.
          You may update your billing information under the Settings section.
        </LegalPageSection>
        <LegalPageSection title="Terms of Service">
          Please also read our{' '}
          <Link href={WebsitePath.TermsOfService}>Terms of Service</Link>,
          establishing the use, disclaimers, and limitations of liability
          governing the use of our service.
        </LegalPageSection>
        <LegalPageSection title="Your consent">
          By using our service, you consent to our Privacy Policy. You have the
          right to complain to the data protection authority in the country
          where you live, work, or where you feel your rights were not upheld.
        </LegalPageSection>
        <LegalPageSection title="Changes to our Privacy Policy">
          If we decide to change our Privacy Policy, we will post those changes
          on this page. For significant changes, you will be prompted from the
          application and/or by email to accept those changes to keep using the
          service.
        </LegalPageSection>
        <LegalPageSection title="The data we collect">
          This privacy policy applies to all personal data processed in
          Increaser, which typically includes focus sessions along with personal
          data used to create an account (name and email address).
        </LegalPageSection>
        <LegalPageSection title="Data use">
          The personal information as indicated being collected above is used
          for identification, authentication, service improvement, and contact.
          Although Increaser owns the code, databases, and all rights to the
          Llama application, you retain all rights to your data. We will never
          share your personal data with a 3rd party without your prior
          authorization, and we will never sell data to 3rd parties.
        </LegalPageSection>
        <LegalPageSection title="Data deletion">
          You have the right to request the erasure of your personal data. This
          enables you to ask us to delete or remove personal data by sending an
          email to{' '}
          <ExternalLink to={`mailto:${supportEmail}`}>
            {supportEmail}
          </ExternalLink>
        </LegalPageSection>
      </LegalPageContent>
    </>
  )
})

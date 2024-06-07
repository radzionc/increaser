import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import {
  deleteInactiveAccountAfter,
  legalEntity,
  productName,
  supportEmail,
} from '@increaser/config'
import { LegalPageContent } from '@lib/ui/website/legal/LegalPageContent'
import { LegalPageSection } from '@lib/ui/website/legal/LegalPageSection'

const name = 'Terms of service'

const TermsOfServicePage = () => (
  <>
    <PageMetaTags title={`${productName} - ${name}`} />
    <LegalPageContent title={name}>
      <LegalPageSection title="Acceptance of terms">
        Application (collectively, the &quot;Service&quot;). Your use of the
        Service is subject to these Terms of Service and Privacy Policy
        (collectively, the “Terms of Service” or “Agreement”). These Terms of
        Service are a legal agreement between You and {legalEntity}, for use of
        the {productName} service. &quot;You&quot; refers to any individual who
        creates an account on the Service, or, if the Service is being used on
        behalf of an entity by an individual authorized to agree to such terms
        on behalf of such entity, then &quot;You&quot; refers to such entity. By
        using this service, you consent to all parts of this Terms of Service
        and the Privacy Policy. Do not use this service if you don&apos;t agree
        to all terms.
      </LegalPageSection>
      <LegalPageSection title="Description of Service">
        The Service includes, and is limited to, a service, web site, or mobile
        application that allows you access to and use of a single {productName}{' '}
        Account. &quot;{productName}&quot; referred to herein means an online
        tool that helps you to become more productive by providing time tracker,
        work timeline and productivity reports. A &quot;{productName}{' '}
        Account&quot; or &quot;Account&quot; referred to herein means a service,
        web site, or mobile application, provided by {productName}, where you
        may use {productName} to have more features, for example,
        synchronization between devices and app settings. Unless explicitly
        stated otherwise, any new features that augment or enhance the current
        Service, including the release of new tools and resources, shall be
        subject to the Agreement.
      </LegalPageSection>
      <LegalPageSection title="Billing/Payment Terms">
        Additional groupings of features may be added to the service and made
        available to you as a paid upgrade (&quot;Membership&quot;). If you
        choose to subscribe to a Membership, you shall pay fees to {productName}
        . Upon selection of a Membership, you will provide {productName} with
        the necessary billing information (&quot;Billing Data&quot;). Credit
        cards are the only payment mechanism {productName} will accept for
        payment of a monthly subscription fee for a Membership. All currency
        references are in U.S. dollars. If you select a Membership, you must
        provide current, complete, and accurate Billing Data. You must promptly
        update all Billing Data to keep your Account current, complete, and
        accurate (such as a change in billing address, credit card number, or
        credit card expiration date), and you must promptly notify {productName}{' '}
        if your Payment Method is changed. You agree that {productName} may
        continue charging you for any use of the Membership under your Billing
        Data unless you have terminated your membership as set forth herein. As
        long as your Account remains active and in good standing, You will be
        charged the Subscription Fee even if you never use the service. you may,
        however, cancel your Membership at any time. Our order process is
        conducted by our online reseller Paddle.com. Paddle.com is the Merchant
        of Record for all our orders. Paddle provides all customer service
        inquiries and handles returns.
      </LegalPageSection>
      <LegalPageSection title="User content and ownership">
        You agree that you are fully responsible for the content you submit or
        upload, and have the necessary permissions to do so. We do not claim any
        ownership over the content you submit or upload to this service.
        However, we store and use the content to provide this service.
      </LegalPageSection>
      <LegalPageSection title="Data security">
        We take data security seriously and strive to follow best practices for
        securing your data. For example, We use TLS/SSL to encrypt the web
        traffic between our system and your browser, and we use encryption when
        storing database backups.
      </LegalPageSection>
      <LegalPageSection title="Intellectual property rights">
        You agree that you will respect the copyright of the source code for
        this service. You agree that you will not try to reverse engineer the
        source code for this service. You agree that you will respect the{' '}
        {productName} trademark.
      </LegalPageSection>
      <LegalPageSection title="Fair usage">
        You agree that you will not attempt to hack into this service or on
        purpose try to overload or disrupt it. If we suspect that you do so, you
        agree that your account may be suspended or removed without warning.
      </LegalPageSection>
      <LegalPageSection title="Limitation of liability">
        THIS SERVICE IS PROVIDED BY THE COPYRIGHT HOLDERS &quot;AS IS&quot; AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
        IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
        PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
        CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
        EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
        PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
        PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
        LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
        NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
      </LegalPageSection>
      <LegalPageSection title="Inactive Accounts">
        Accounts that remain inactive for a period of{' '}
        {deleteInactiveAccountAfter} days will be automatically deleted.
        Inactivity is defined as not logging into the account or using any of
        the {productName} services. If your account is deleted due to
        inactivity, you may create a new account, but previous data will not be
        recoverable.
      </LegalPageSection>
      <LegalPageSection title="Privacy">
        Please read our Privacy Policy for how we manage the personal data you
        provide us when using our service.
      </LegalPageSection>
      <LegalPageSection title="Changes to our Terms of Service">
        If we decide to change our Terms of Service, we will post those changes
        on this page. For significant changes you will be prompted from the
        application and/or by email to accept those changes to keep using the
        service.
      </LegalPageSection>
      <LegalPageSection title="Contact information">
        If there are any questions regarding this Terms of Service, you may
        contact us on {supportEmail}.
      </LegalPageSection>
    </LegalPageContent>
  </>
)

export default TermsOfServicePage

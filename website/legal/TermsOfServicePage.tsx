import { APP_NAME, APP_SUPPORT_EMAIL } from 'shared/product'

import { LegalPage } from './LegalPage'
import { LegalSection } from './LegalSection'
import { Page } from 'components/Page'

export const TermsOfServicePage: Page = () => {
  return (
    <LegalPage title="Terms of Service">
      <LegalSection title="Acceptance of terms">
        Application (collectively, the "Service"). Your use of the Service is
        subject to these Terms of Service and Privacy Policy (collectively, the
        “Terms of Service” or “Agreement”). These Terms of Service are a legal
        agreement between You and Radzion Chachura, for use of the {APP_NAME}{' '}
        service. "You" refers to any individual who creates an account on the
        Service, or, if the Service is being used on behalf of an entity by an
        individual authorized to agree to such terms on behalf of such entity,
        then "You" refers to such entity. By using this service, you consent to
        all parts of this Terms of Service and the Privacy Policy. Do not use
        this service if you don't agree to all terms.
      </LegalSection>
      <LegalSection title="Description of Service">
        The Service includes, and is limited to, a service, web site, or mobile
        application that allows you access to and use of a single {APP_NAME}{' '}
        Account. "{APP_NAME}" referred to herein means an online tool that helps
        you to become more productive by providing time tracker, work timeline
        and productivity reports. A "{APP_NAME} Account" or "Account" referred
        to herein means a service, web site, or mobile application, provided by{' '}
        {APP_NAME}, where you may use {APP_NAME} to have more features, for
        example, synchronization between devices and app settings. Unless
        explicitly stated otherwise, any new features that augment or enhance
        the current Service, including the release of new tools and resources,
        shall be subject to the Agreement.
      </LegalSection>
      <LegalSection title="Billing/Payment Terms">
        Additional groupings of features may be added to the service and made
        available to you as a paid upgrade ("Membership"). If you choose to
        subscribe to a Membership, you shall pay fees to {APP_NAME}. Upon
        selection of a Membership, you will provide {APP_NAME} with the
        necessary billing information ("Billing Data"). Credit cards are the
        only payment mechanism {APP_NAME} will accept for payment of a monthly
        subscription fee for a Membership. All currency references are in U.S.
        dollars. If you select a Membership, you must provide current, complete,
        and accurate Billing Data. You must promptly update all Billing Data to
        keep your Account current, complete, and accurate (such as a change in
        billing address, credit card number, or credit card expiration date),
        and you must promptly notify {APP_NAME} if your Payment Method is
        changed. You agree that {APP_NAME} may continue charging you for any use
        of the Membership under your Billing Data unless you have terminated
        your membership as set forth herein. As long as your Account remains
        active and in good standing, You will be charged the Subscription Fee
        even if you never use the service. you may, however, cancel your
        Membership at any time. Our order process is conducted by our online
        reseller Paddle.com. Paddle.com is the Merchant of Record for all our
        orders. Paddle provides all customer service inquiries and handles
        returns.
      </LegalSection>
      <LegalSection title="User content and ownership">
        You agree that you are fully responsible for the content you submit or
        upload, and have the necessary permissions to do so. We do not claim any
        ownership over the content you submit or upload to this service.
        However, we store and use the content to provide this service.
      </LegalSection>
      <LegalSection title="Data security">
        We take data security seriously and strive to follow best practices for
        securing your data. For example, We use TLS/SSL to encrypt the web
        traffic between our system and your browser, and we use encryption when
        storing database backups.
      </LegalSection>
      <LegalSection title="Intellectual property rights">
        You agree that you will respect the copyright of the source code for
        this service. You agree that you will not try to reverse engineer the
        source code for this service. You agree that you will respect the{' '}
        {APP_NAME} trademark.
      </LegalSection>
      <LegalSection title="Fair usage">
        You agree that you will not attempt to hack into this service or on
        purpose try to overload or disrupt it. If we suspect that you do so, you
        agree that your account may be suspended or removed without warning.
      </LegalSection>
      <LegalSection title="Limitation of liability">
        THIS SERVICE IS PROVIDED BY THE COPYRIGHT HOLDERS "AS IS" AND ANY
        EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
        IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
        PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
        CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
        EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
        PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
        PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
        LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
        NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
      </LegalSection>
      <LegalSection title="Privacy">
        Please read our Privacy Policy for how we manage the personal data you
        provide us when using our service.
      </LegalSection>
      <LegalSection title="Changes to our Terms of Service">
        If we decide to change our Terms of Service, we will post those changes
        on this page. For significant changes you will be prompted from the
        application and/or by email to accept those changes to keep using the
        service.
      </LegalSection>
      <LegalSection title="Contact information">
        If there are any questions regarding this Terms of Service, you may
        contact us on {APP_SUPPORT_EMAIL}.
      </LegalSection>
    </LegalPage>
  )
}

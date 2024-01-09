import { VStack } from '@lib/ui/layout/Stack'
import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import styled from 'styled-components'
import { productName } from '@increaser/config'
import { TextButton } from '@lib/ui/buttons/TextButton'
import { FaqItem } from '@lib/ui/website/FaqItem'
import { AppLink } from '../navigation/AppLink'
import { AppPath } from '@increaser/ui/navigation/AppPath'

const Content = styled(VStack)`
  gap: 16px;
  max-width: 800px;
  width: 100%;
`

export const FaqSlice = () => {
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title="Questions? We're Here to Help"
          subtitle="Explore our FAQs and feel free to reach out directly to the founder for personalized answers."
        />
        <Content>
          <FaqItem title={`Will there be a mobile app for ${productName}?`}>
            At {productName}, we've optimized our platform to function
            seamlessly on all devices, so a separate mobile app isn't necessary.{' '}
            {productName} is available as a Progressive Web App (PWA), allowing
            you to 'install' it directly on your device for an app-like
            experience. To do this, simply navigate to{' '}
            <AppLink to={AppPath.Home}>
              <TextButton text={productName} />
            </AppLink>{' '}
            on your mobile browser, and select 'Add to Home Screen' from your
            browser's menu. This will add {productName} to your device, making
            it accessible just like a regular app, but without the need to
            download it from an app store.
          </FaqItem>
          <FaqItem
            title={`Is there a desktop app available for ${productName}?`}
          >
            We currently do not offer a separate desktop application for
            {productName} as our web platform is fully optimized for desktop
            usage. By accessing {productName} through your preferred web
            browser, you can enjoy all the functionalities and features without
            the need for a separate download. This approach ensures you always
            have access to the latest updates and features without any
            additional installation.
          </FaqItem>
          <FaqItem
            title={`What makes ${productName} different from other time management tools?`}
          >
            {productName} stands out from other time management tools through
            its unique focus on enhancing the productivity of remote workers.
            Unlike generic time trackers, {productName} is specifically tailored
            to the needs and challenges of remote work environments, offering
            features that help manage distractions, track time spent on various
            projects, and establish a balanced work-life integration. Its
            user-friendly interface is designed for simplicity and
            effectiveness, enabling users to easily set and track personal
            goals. Moreover, {productName}'s emphasis on developing healthy work
            habits and providing insights into time allocation makes it more
            than just a tool; it's a comprehensive system for personal and
            professional growth, offering a customized approach to productivity
            that resonates with the evolving dynamics of modern remote work.
          </FaqItem>
          <FaqItem title="How does the time tracking feature work?">
            {productName}'s time tracking feature is centered around 'focus
            sessions' where you start a timer and select a project, seamlessly
            recording your work in the system. This method not only tracks your
            time but aligns it with specific project objectives. For times when
            you might forget to start a timer, {productName} allows the addition
            of sessions manually, ensuring all your efforts are accounted for.
            To provide comprehensive insights into your productivity,{' '}
            {productName} offers detailed session reports for the last 30 days
            and project-based reports for previous weeks and months, allowing
            you to analyze and optimize your time management effectively.
          </FaqItem>
          <FaqItem title={`Who is ${productName} ideal for?`}>
            {productName} is designed to cater to a wide range of knowledge
            workers, particularly those who spend a significant portion of their
            workday on a computer. It's an especially valuable tool for remote
            workers, who often have more flexibility and control over their
            time, allowing them to optimize their schedules more effectively.
            However, Increaser is not just for remote professionals;
            office-based employees will also find it beneficial for managing
            their time and tasks efficiently. Additionally, Increaser is an
            excellent resource for students who are looking to improve their
            time organization and focus. Whether you're working from home, the
            office, or studying, Increaser provides the tools and insights
            needed to enhance productivity and focus across various work
            environments
          </FaqItem>
        </Content>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}

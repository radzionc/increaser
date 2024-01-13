import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { Text } from '@lib/ui/text'
import { FounderSignature } from './FounderSignature'
import { FoundersNote } from '@lib/ui/website/FoundersNote'

export const FoundersNoteSlice = () => {
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader title="Welcome to Your Productivity Partner Increaser" />
        <FoundersNote
          avatarUrl="/images/founder-avatar.webp"
          signature={<FounderSignature />}
        >
          <Text>
            I'm Radzion, the creator of Increaser. This project started as my
            own quest to tackle the productivity challenges that knowledge
            workers and students face in today's digital age. As a software
            engineer, I too struggled to find that perfect balance between work
            and life, which led me to develop Increaser.
          </Text>
          <Text>
            Increaser is built on a straightforward yet effective concept: using
            structured time to enhance focus and productivity. It's not just
            about managing your tasks; it's about optimizing the way you work
            and live. This tool is my solution to the common pitfalls of remote
            work and the distractions of a hyper-connected world.
          </Text>
          <Text>
            As a web app accessible on any device, Increaser is a personal
            assistant for your work life. It's an extension of my own practices,
            refined over years of balancing a full-time job with the development
            of this app.
          </Text>
          <Text>
            As a web app accessible on any device, Increaser is a personal
            assistant for your work life. It's an extension of my own practices,
            refined over years of balancing a full-time job with the development
            of this app.
          </Text>
          <Text>
            I invite you to try Increaser, not just as a tool but as a new
            approach to productivity. Your feedback is invaluable, helping shape
            Increaser's future and ensuring it continues to meet your needs.
          </Text>
          <Text>
            Join us in this journey to smarter, more efficient work habits.
            Together, let's make every minute productive.
          </Text>
        </FoundersNote>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}

import { ProductTool } from '@increaser/entities/ProductTool'
import { ProductToolEducation } from './ProductToolEducation'

export const productToolEducationRecord: Partial<
  Record<ProductTool, ProductToolEducation>
> = {
  focus: {
    title: 'Boost Your Productivity with Focus Sessions',
    subtitle: 'Learn how focus sessions can help you work smarter, not harder.',
    content: (
      <>
        <p>
          Welcome to Increaser's Focus Sessions! This powerful tool is designed
          to help you work with intention, maintain concentration, and achieve
          more in less time.
        </p>

        <h3>What is a Focus Session?</h3>
        <p>
          A focus session is a dedicated block of time where you commit to
          working on a specific project or task. By setting clear boundaries for
          your work, you can minimize distractions and dive deep into meaningful
          work.
        </p>

        <h3>How Focus Sessions Improve Productivity</h3>
        <ul>
          <li>
            <strong>Work in Blocks:</strong> The Focus feature is built around
            the idea of working in 90-minute blocks. After each block, you take
            a short break to recharge and come back stronger for your next
            session.
          </li>
          <li>
            <strong>Track Your Progress:</strong> See how much time you’ve spent
            on each project and stay on top of your goals.
          </li>
          <li>
            <strong>Session History:</strong> Keep track of your work history
            with session logs that show what you’ve worked on, and for how long.
          </li>
          <li>
            <strong>Prevent Overworking:</strong> If you forget to end a
            session, Increaser will automatically stop it after 3 hours to help
            prevent burnout.
          </li>
        </ul>

        <h3>Get Started in Seconds</h3>
        <p>Starting a Focus session is simple:</p>
        <ol>
          <li>Select a project or task you want to work on.</li>
          <li>Choose a target duration.</li>
          <li>Hit the start button, and you’re ready to focus!</li>
        </ol>

        <h3>Stay in the Zone</h3>
        <p>
          You can set up focus notifications to remind you when your session
          ends, when it’s time for a break, or when your workday is about to
          end. You can also mix and match ambient sounds to help maintain your
          concentration.
        </p>

        <h3>Adjust on the Go</h3>
        <p>
          If you forget to start or stop a session, don’t worry. You can adjust
          the start and end times easily so your tracked time is accurate.
        </p>

        <p>
          Ready to take your productivity to the next level? Start your first
          focus session now and experience the difference!
        </p>
      </>
    ),
  },
}

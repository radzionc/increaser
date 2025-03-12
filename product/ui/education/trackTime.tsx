import { infoYouTubeVideos } from '../../info/infoYouTubeVideos'

import { ProductToolEducation } from './ProductToolEducation'

export const trackTimeEducation: ProductToolEducation = {
  title: 'Boost Productivity with Time Tracking',
  subtitle: `Increaser's Focus tool helps you structure your work into productive sessions with optimal breaks, allowing you to maintain deep concentration and avoid burnout. By organizing your tasks into manageable blocks, you can enhance focus, track your progress, and accomplish more in less time. Learn how to use Focus sessions to achieve better results and a balanced workflow.`,
  youTubeVideoUrl: infoYouTubeVideos.trackTime,
  content: (
    <>
      <h2>Focus Sessions: Structure Your Work</h2>
      <p>
        The core of Time Tracking is the focus session. Focus sessions are
        structured blocks of time dedicated to uninterrupted work. You begin a
        session by selecting a project and optionally a task, then hit start to
        begin tracking. This encourages deep focus and helps you avoid
        distractions, ensuring your work is more productive.
      </p>

      <h2>Adjustable Session Times</h2>
      <p>
        If you forget to start or stop a session, Increaser gives you the
        flexibility to adjust your session times. You can manually change the
        start or end time of any session to accurately reflect the time you’ve
        worked. This way, you maintain accurate records without losing any
        valuable time spent on tasks.
      </p>

      <h2>Project and Goal Integration</h2>
      <p>
        Time Tracking seamlessly integrates with other Increaser tools,
        especially Projects and Goals. On the "Projects" page, you can set a
        weekly time budget for each project, and Time Tracking will help you
        monitor your progress toward that budget. By aligning your tracked time
        with specific goals, every session brings you closer to achieving what
        matters most.
      </p>

      <h2>Detailed Reports for Insight</h2>
      <p>
        The "Report" page provides a visual breakdown of how you've distributed
        your time across projects. By reviewing your tracked sessions over days,
        weeks, or months, you can identify patterns, adjust your focus, and
        optimize how you spend your time. This empowers you to make informed
        decisions about your work habits.
      </p>

      <h2>Stay Flexible and Productive</h2>
      <p>
        Time Tracking in Increaser is not just about logging hours—it’s about
        improving how you work. From flexible session adjustments to insights on
        your work patterns, this tool is designed to help you work smarter and
        achieve your goals faster. Whether you're managing multiple projects or
        focusing on personal growth, Time Tracking gives you the control you
        need.
      </p>
    </>
  ),
}

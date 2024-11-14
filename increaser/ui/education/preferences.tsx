import { ProductToolEducation } from './ProductToolEducation'

export const preferencesEducation: ProductToolEducation = {
  title: 'Customize Your Work Preferences for Peak Productivity',
  subtitle: `Setting up your work preferences is a powerful way to customize your schedule, enhance productivity, and maintain a healthy work-life balance. By tailoring settings like your preferred workday end time, weekend days, and daily work hours, you align the app with your personal goals and routines.`,
  content: (
    <>
      <h2>Setting Your Preferred Workday End Time</h2>
      <p>
        On the <strong>Preferences</strong> page, you can specify the time you
        aim to finish work each day. This setting influences several aspects of
        the app:
      </p>
      <ul>
        <li>
          <strong>Focus Page:</strong> A countdown at the bottom of the timeline
          shows how much time is left until your workday ends, helping you stay
          on schedule.
        </li>
        <li>
          <strong>Notifications:</strong> Five minutes before your workday ends,
          you'll receive a notification to wrap up your tasks.
        </li>
        <li>
          <strong>Focus Launcher:</strong> After your set end time, the Focus
          launcher is disabled by default to encourage rest, but you can unlock
          it if you need to continue working.
        </li>
        <li>
          <strong>Timesheet Page:</strong> When viewing your work grouped by
          days, a line represents your preferred end of work time, allowing you
          to see if you're consistently working past your intended hours.
        </li>
      </ul>

      <h2>Selecting Your Weekend Days</h2>
      <p>
        You can choose which days are considered weekends in your schedule. If
        you don't follow a traditional workweek, you can adjust or remove
        weekend days entirely. This setting affects:
      </p>
      <ul>
        <li>
          <strong>Work Budget:</strong> It impacts your total work budget by
          allowing you to specify different work hours for workdays and
          weekends.
        </li>
        <li>
          <strong>Projects:</strong> Projects marked as "workday only" will
          consider your weekend settings to accurately display progress on the
          Focus page and Focus launcher.
        </li>
        <li>
          <strong>Recurring Tasks:</strong> Recurring tasks set to occur on
          workdays will respect your designated weekend days, ensuring tasks
          don't appear when you're off.
        </li>
        <li>
          <strong>Timesheet Page:</strong> When viewing work grouped by days,
          the app displays average work hours for both workdays and weekends,
          giving you insights into your productivity patterns.
        </li>
      </ul>

      <h2>Creating Your Personal Work Budget</h2>
      <p>
        You can specify how many hours you plan to work on workdays and
        weekends. This personal work budget influences:
      </p>
      <ul>
        <li>
          <strong>Project Budgets and Goals:</strong> When setting up projects
          on the <strong>Projects</strong> page, the total budgeted time is
          capped by your overall work budget, helping you allocate time wisely.
        </li>
        <li>
          <strong>Cumulative Chart:</strong> On the Projects page, a cumulative
          chart displays two lines—your "expected work time" based on your work
          budget and your actual "total time worked"—allowing you to see if
          you're on track.
        </li>
        <li>
          <strong>Timesheet Page:</strong> When viewing work grouped by weeks,
          you'll see a line representing the budgeted time for projects, helping
          you monitor progress and adjust efforts to meet your goals.
        </li>
      </ul>

      <h2>How Work Preferences Integrate with Other Tools</h2>
      <p>
        By customizing your work preferences, you enhance the functionality of
        various tools within the app:
      </p>
      <ul>
        <li>
          <strong>Focus Tool:</strong> Helps you manage your time effectively by
          aligning session timings with your preferred workday end time.
        </li>
        <li>
          <strong>Projects:</strong> Allows for accurate tracking and
          goal-setting based on your personal work budget and schedule.
        </li>
        <li>
          <strong>Tasks:</strong> Ensures recurring tasks appear on the correct
          days, respecting your weekend settings.
        </li>
        <li>
          <strong>Notifications:</strong> Keeps you informed about important
          time-related events, such as the end of your workday.
        </li>
        <li>
          <strong>Timesheet:</strong> Provides detailed insights into your work
          patterns, helping you maintain productivity and balance.
        </li>
      </ul>

      <h2>Getting Started</h2>
      <p>
        To set up your work preferences, navigate to the{' '}
        <strong>Preferences</strong> page accessible from the user menu in the
        top right corner of the sidebar. Take a moment to customize your
        settings and experience how these adjustments can enhance your
        productivity and work-life balance.
      </p>

      <p>
        By aligning the app with your personal schedule and goals, you make it a
        more powerful tool for achieving success and maintaining well-being.
      </p>
    </>
  ),
}

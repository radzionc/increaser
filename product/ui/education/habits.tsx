import { infoYouTubeVideos } from '../../info/infoYouTubeVideos'

import { ProductToolEducation } from './ProductToolEducation'

export const habitsEducation: ProductToolEducation = {
  title: 'Form Habits That Support Your Goals',
  subtitle: `The Habits tool is designed to help you build and maintain consistent
        behaviors that contribute to your long-term goals and vision. By
        tracking your habits daily, you'll make gradual but impactful progress
        toward becoming the person you want to be. The Habits page in Increaser
        is your central hub for creating, tracking, and analyzing your habits,
        so let's dive into its features and how it integrates with other tools
        in the app.`,
  youTubeVideoUrl: infoYouTubeVideos.habits,
  content: (
    <>
      <h2>Tracking Your Habits</h2>
      <p>
        The <strong>"Track"</strong> subpage on Habits gives you an overview of
        your active habits. Each habit has an emoji and a name, allowing you to
        personalize it, making tracking both practical and enjoyable. This page
        is organized into columns:
      </p>
      <ul>
        <li>
          <strong>Habit List</strong>: A list of all your habits. Clicking on a
          habit opens a modal where you can manage it, adjust its name, emoji,
          and description, and add a <em>habit plan</em>—a short sentence
          detailing when or how you aim to perform the habit each day.
        </li>
        <li>
          <strong>Consistency Ring</strong>: Shows your completion percentage,
          helping you gauge your habit consistency at a glance. Hover over the
          ring to see how often you skip the habit.
        </li>
        <li>
          <strong>Streak</strong>: Displays your current streak, motivating you
          to keep your habit active daily.
        </li>
        <li>
          <strong>Progress Grid</strong>: A grid view for tracking habits day by
          day. Each cell represents a day, and you can click on a cell to mark
          the habit as complete.
        </li>
      </ul>
      <p>
        At the top of this subpage, a <strong>"Reset habits"</strong> button
        allows you to wipe all tracked data for a fresh start, starting from
        today.
      </p>

      <h2>Discovering New Habits</h2>
      <p>
        The <strong>"Explore"</strong> subpage presents suggested habits for a
        well-rounded life. Categories like <em>health, relationships</em>, and{' '}
        <em>work</em> inspire you with new ideas for habits to improve various
        aspects of your life. You can easily add any suggestion to your own
        habits list.
      </p>

      <h2>Habit Management and Planning</h2>
      <p>
        Each habit includes a "plan" section, which you can use to set a
        specific time or event as a reminder for when you’ll perform the habit,
        e.g., "Right after lunch" or "Every evening at 9 PM". This structure
        reinforces consistency by connecting the habit to a daily routine.
      </p>

      <h2>Habit Reminders</h2>
      <p>
        To keep habit tracking easy and accessible, Increaser adds a reminder to
        the sidebar next to the "Habits" item if you haven’t visited the Habits
        page that day. This prompt ensures that you stay on top of your tracking
        with minimal effort.
      </p>

      <h2>Connecting Habits with Your Goals</h2>
      <p>
        The Habits tool integrates closely with the <strong>Goals</strong> tool.
        When setting a goal, you can add recurring habits directly to it or
        choose from existing habits that align with your goal. This feature
        enables you to set actionable steps, making each goal more achievable
        through consistent effort.
      </p>

      <h2>Insights and Reflection</h2>
      <p>
        By consistently tracking habits, you’ll gather insights into your
        progress over time. Viewing your streaks and consistency percentage
        helps you understand your behavior patterns and make adjustments when
        needed.
      </p>

      <p>
        The Habits tool in Increaser empowers you to shape and reinforce the
        behaviors essential to achieving your goals and vision. Use it to build
        a routine that aligns with your aspirations, and enjoy the incremental
        progress you make every day.
      </p>
    </>
  ),
}

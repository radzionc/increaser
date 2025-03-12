import { infoYouTubeVideos } from '../../info/infoYouTubeVideos'

import { ProductToolEducation } from './ProductToolEducation'

export const tasksEducation: ProductToolEducation = {
  title: 'Manage Tasks Like a Pro',
  subtitle: `Efficient task management is key to staying organized and productive. In Increaser, you can easily create, prioritize, and track tasks across projects, helping you stay focused on what matters most. Whether you're managing daily to-dos or long-term goals, this guide will show you how to use Increaser's task management tools to streamline your workflow and achieve your objectives.`,
  youTubeVideoUrl: infoYouTubeVideos.tasks,
  content: (
    <>
      <h2>Task Creation and Organization</h2>
      <p>
        In Increaser, the "Tasks" page is designed to help you manage your
        workload across various projects. You can create tasks, assign them to
        projects, and move them between different statuses: backlog, todo, in
        progress, and done. Tasks can be as simple or detailed as you like, with
        options to add descriptions, links, and checklists for better task
        breakdown.
      </p>

      <h2>Kanban Board for Clear Workflow</h2>
      <p>
        The Kanban board view allows you to visualize your tasks in columns,
        making it easier to see what needs attention and what's already
        completed. You can drag and drop tasks between columns to reflect their
        current status, helping you maintain a smooth workflow and avoid task
        pileup.
      </p>

      <h2>Recurring Tasks and Templates</h2>
      <p>
        For tasks that repeat regularly, the "Automation" subpage lets you set
        up recurring tasks based on your schedule. You can also create task
        templates to quickly generate similar tasks in the future, saving you
        time on repetitive entries.
      </p>

      <h2>Upcoming Tasks and Forecasts</h2>
      <p>
        The "Upcoming" subpage gives you a look ahead at your tasks, grouped by
        day or week. It even shows forecasted tasks that will appear in the
        future based on your recurring schedules. This view helps you plan your
        days and weeks efficiently, ensuring you're always prepared for what's
        next.
      </p>

      <h2>Integration with Other Tools</h2>
      <p>
        Task management in Increaser connects seamlessly with other tools like
        "Projects" and "Goals." You can assign tasks to specific projects,
        making it easy to track progress on long-term goals. For recurring
        actions tied to a goal, tasks help you stay consistent and on track. By
        linking tasks with time-tracking tools, you can monitor how much time
        you're dedicating to each task and project, offering valuable insights
        into your productivity.
      </p>

      <h2>Stay Organized and Productive</h2>
      <p>
        By using Increaser's task management features, you can keep your work
        structured, ensure important tasks are completed, and gain a clear view
        of your progress. Whether you're handling daily tasks or big projects,
        Increaser's task management tools empower you to stay productive and
        focused on your goals.
      </p>
    </>
  ),
}

import { TemporaryStorage } from '@lib/ui/state/TemporaryStorage'
import { LocalStorage } from '@lib/ui/state/LocalStorage'
import { createPersistentStateHook } from '@lib/ui/state/createPersistentStateHook'
import { createPersistentStateManager } from '@lib/ui/state/createPersistentStateManager'

export enum PersistentStateKey {
  AuthSession = 'auth-session',
  HasBreakBrowserNotification = 'breakBrowserNotification',
  HasBreakSoundNotification = 'breakSoundNotification',
  HasBreakAutomaticBreak = 'hasBreakAutomaticBreak',
  SidebarInstallPromptWasRejectedAt = 'sidebarInstallPromptWasRejectedAt',
  BreakEducationWasAt = 'breakEducationWasAt',
  FocusSoundsView = 'focusSoundsView',
  PathAttemptedWhileUnauthenticated = 'pathAttemptedWhileUnauthenticated',
  ReactQueryState = 'reactQueryState',
  FocusAudioMode = 'focusAudioMode2',
  IsFocusAudioEnabled = 'isFocusAudioEnabled',
  FocusSoundsPreference = 'focusSoundsPreference',
  YouTubeFocusPreference = 'youTubeFocusPreference',
  FocusIntervals = 'focusIntervals',
  FocusLauncher = 'focusLauncher3',
  MyVisionView = 'myVisionView2',
  MyHabitsView = 'myHabitsView',
  AreFocusSoundsCollapsed = 'areFocusSoundsCollapsed',
  YouTubePlayerPosition = 'youTubePlayerPosition',
  WorkTimeReportPreferences = 'workTimeReportPreferences',
  GoalsStatusFilter = 'goalsStatusFilter',
  IsGoalsEducationOpen = 'isGoalsEducationOpen',
  ProjectsBudgetReportView = 'projectsBudgetReportView2',
  TrackedTimeReportDataSize = 'trackedTimeReportDataSize',
  IsCurrentPeriodIncluded = 'isCurrentPeriodIncluded',
  TimeGrouping = 'timeGrouping',
  ActiveProject = 'activeProject',
  ShouldHideProjectNames = 'shouldHideProjectNames',
  LastPageView = 'lastPageView',
  TaskTimeGrouping = 'taskTimeGrouping',
  TasksView = 'tasksView',
  IsChecklistOpen = 'isChecklistOpen',
  FocusNotificationsHaveSound = 'FocusNotificationsHaveSound',
  FocusNotifications = 'FocusNotifications',
  FocusDuration = 'FocusDuration',
}

const persistentStorage =
  typeof window !== 'undefined'
    ? new LocalStorage<PersistentStateKey>()
    : new TemporaryStorage<PersistentStateKey>()

export const usePersistentState =
  createPersistentStateHook<PersistentStateKey>(persistentStorage)

export const managePersistentState =
  createPersistentStateManager<PersistentStateKey>(persistentStorage)

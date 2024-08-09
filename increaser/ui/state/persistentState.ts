import { TemporaryStorage } from '@lib/ui/state/TemporaryStorage'
import { LocalStorage } from '@lib/ui/state/LocalStorage'
import { createPersistentStateHook } from '@lib/ui/state/createPersistentStateHook'
import { createPersistentStateManager } from '@lib/ui/state/createPersistentStateManager'

export enum PersistentStateKey {
  OnboardedToBreak = 'onboarded-to-break',
  AuthSession = 'auth-session',
  FocusDuration = 'focusDuration',
  HasTimerSoundNotification = 'hasTimerSoundNotification',
  HasTimerBrowserNotification = 'hasTimerBrowserNotification',
  HasBreakBrowserNotification = 'breakBrowserNotification',
  HasBreakSoundNotification = 'breakSoundNotification',
  HasBreakAutomaticBreak = 'hasBreakAutomaticBreak',
  UnsyncedSets = 'unsyncedSets',
  LastPromptToKeepWorkingWasAt = 'lastPromptToKeepWorkingWasAt',
  FocusSounds = 'focus-sounds-5',
  SidebarInstallPromptWasRejectedAt = 'sidebarInstallPromptWasRejectedAt',
  SelectedSleepAdvice = 'selectedSleepAdvice',
  ThemePreference = 'themePreference',
  YesterdayRetroWasAt = 'yesterdayRetroWasAt',
  LastWeekRetroWasAt = 'lastWeekRetroWasAt',
  BreakEducationWasAt = 'breakEducationWasAt',
  TwoDayRuleEducation = 'twoDayRuleEducationWasAt',
  FocusDurationEducationWasAt = 'focusDurationEducationWasAt',
  FocusSoundsView = 'focusSoundsView',
  PathAttemptedWhileUnauthenticated = 'pathAttemptedWhileUnauthenticated',
  ReactQueryState = 'reactQueryState',
  IncludeTodayInSetsExplorer = 'includeTodayInSetsExplorer',
  TrackedTimeReportPreferences = 'trackedTimeReportPreferences2',
  TrackedTimePreference = 'trackedTimePreference2',
  SelectFocusView = 'selectFocusView',
  FocusAudioMode = 'focusAudioMode2',
  IsFocusAudioEnabled = 'isFocusAudioEnabled',
  FocusSoundsPreference = 'focusSoundsPreference',
  YouTubeFocusPreference = 'youTubeFocusPreference',
  FocusSession = 'focusSession',
  FocusLauncher = 'focusLauncher2',
  MyVisionView = 'myVisionView2',
  MyHabitsView = 'myHabitsView',
  AreFocusSoundsCollapsed = 'areFocusSoundsCollapsed',
  YouTubePlayerPosition = 'youTubePlayerPosition',
  WorkTimeReportPreferences = 'workTimeReportPreferences',
  GoalsStatusFilter = 'goalsStatusFilter',
  IsGoalsEducationOpen = 'isGoalsEducationOpen',
  ProjectFilter = 'projectFilter',
  ProjectsBudgetReportView = 'projectsBudgetReportView2',
}

export const persistentStorage =
  typeof window !== 'undefined'
    ? new LocalStorage<PersistentStateKey>()
    : new TemporaryStorage<PersistentStateKey>()

export const usePersistentState =
  createPersistentStateHook<PersistentStateKey>(persistentStorage)

export const managePersistentState =
  createPersistentStateManager<PersistentStateKey>(persistentStorage)

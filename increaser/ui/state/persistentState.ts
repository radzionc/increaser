import { TemporaryStorage } from '@lib/ui/state/TemporaryStorage'
import { LocalStorage } from '@lib/ui/state/LocalStorage'
import { createPersistentStateHook } from '@lib/ui/state/createPersistentStateHook'
import { createPersistentStateManager } from '@lib/ui/state/createPersistentStateManager'
import { hasWindow } from '@lib/ui/utils/window'

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
  AreFocusSoundsCollapsed = 'areFocusSoundsCollapsed',
  YouTubePlayerPosition = 'youTubePlayerPosition',
  WorkTimeReportPreferences = 'workTimeReportPreferences',
  GoalsStatusFilter = 'goalsStatusFilter',
  IsGoalsEducationOpen = 'isGoalsEducationOpen',
  TrackedTimeInterval = 'TrackedTimeInterval',
  TimeGrouping = 'timeGrouping',
  ActiveProject = 'activeProject',
  ShouldHideProjectNames = 'shouldHideProjectNames',
  LastPageView = 'lastPageView',
  TaskTimeGrouping = 'taskTimeGrouping',
  IsChecklistOpen = 'isChecklistOpen',
  FocusNotificationsHaveSound = 'FocusNotificationsHaveSound',
  FocusNotifications = 'FocusNotifications',
  FocusDuration = 'FocusDuration',
  ProjectFilter = 'projectFilter',
  YouTubeFocusMusicLeftAt = 'youTubeFocusMusicLeftAt',
  PrincipleCategoryFilter = 'principleCategoryFilter',
  UserChangedFocusDurationAt = 'userChangedFocusDurationAt',
  FocusProject = 'focusProject',
  FocusProjectTask = 'focusProjectDefaultTask',
  GoalsTimelineType = 'goalsTimelineType',
}

const persistentStorage = hasWindow
  ? new LocalStorage<PersistentStateKey>()
  : new TemporaryStorage<PersistentStateKey>()

export const usePersistentState =
  createPersistentStateHook<PersistentStateKey>(persistentStorage)

export const managePersistentState =
  createPersistentStateManager<PersistentStateKey>(persistentStorage)

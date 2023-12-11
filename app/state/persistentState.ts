import { TemporaryStorage } from '@increaser/ui/state/TemporaryStorage'
import { LocalStorage } from '@increaser/ui/state/LocalStorage'
import { createPersistentStateHook } from '@increaser/ui/state/createPersistentStateHook'
import { createPersistentStateManager } from '@increaser/ui/state/createPersistentStateManager'

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
  HadFocusOnboarding = 'hadFocusOnboarding',
  FocusSounds = 'focus-sounds-5',
  SidebarInstallPromptWasRejectedAt = 'sidebarInstallPromptWasRejectedAt',
  SelectedSleepAdvice = 'selectedSleepAdvice',
  ThemePreference = 'themePreference',
  YesterdayRetroWasAt = 'yesterdayRetroWasAt',
  LastWeekRetroWasAt = 'lastWeekRetroWasAt',
  SupportOnboardingWasAt = 'supportOnboardingWasAt',
  BreakEducationWasAt = 'breakEducationWasAt',
  TwoDayRuleEducation = 'twoDayRuleEducationWasAt',
  FocusDurationEducationWasAt = 'focusDurationEducationWasAt',
  FocusSoundsView = 'focusSoundsView',
  ScheduleEducationWasAt = 'scheduleEducationWasAt',
  HabitsEducationWasAt = 'habitsEducationWasAt',
  PathAttemptedWhileUnauthenticated = 'pathAttemptedWhileUnauthenticated',
  ReactQueryState = 'reactQueryState',
  IncludeTodayInSetsExplorer = 'includeTodayInSetsExplorer',
}

export const persistentStorage =
  typeof window !== 'undefined'
    ? new LocalStorage<PersistentStateKey>()
    : new TemporaryStorage<PersistentStateKey>()

export const usePersistentState =
  createPersistentStateHook<PersistentStateKey>(persistentStorage)

export const managePersistentState =
  createPersistentStateManager<PersistentStateKey>(persistentStorage)

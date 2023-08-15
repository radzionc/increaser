import { TemporaryStorage } from '@increaser/ui/state/TemporaryStorage'
import { LocalStorage } from '@increaser/ui/state/LocalStorage'
import { createUsePersistantStorageValueHook } from '@increaser/ui/state/createUsePersistantStorageValueHook'

export enum PersistentStorageKey {
  OnboardedToBreak = 'onboarded-to-break',
  AuthToken = 'token',
  AuthTokenExpirationTime = 'tokenExpirationTime',
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
}

export const persistentStorage =
  typeof window !== 'undefined'
    ? new LocalStorage<PersistentStorageKey>()
    : new TemporaryStorage<PersistentStorageKey>()

export const usePersistentStorageValue =
  createUsePersistantStorageValueHook<PersistentStorageKey>(persistentStorage)

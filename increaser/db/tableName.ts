const prefix = process.env.NODE_ENV === 'test' ? 'test_' : 'pomodoro_'

export const tableName = {
  users: `${prefix}users`,
  appSumoCodes: `${prefix}app_sumo_codes`,
  scoreboards: `${prefix}scoreboards`,
  features: `${prefix}features`,
}

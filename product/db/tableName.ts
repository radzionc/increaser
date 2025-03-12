const prefix = process.env.NODE_ENV === 'test' ? 'test_' : 'pomodoro_'

export const tableName = {
  users: `${prefix}users`,
  scoreboards: `${prefix}scoreboards`,
  features: `${prefix}features`,
  emails: `${prefix}emails`,
}

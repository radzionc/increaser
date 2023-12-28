import { User } from '@increaser/entities/User'

export type AuthenticationResult = Pick<User, 'email' | 'name'>

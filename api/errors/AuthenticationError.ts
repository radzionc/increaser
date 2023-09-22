import { GraphQLError } from 'graphql'
import { ApiErrorCode } from './ApiErrorCode'

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: ApiErrorCode.Authentication,
      },
    })
  }
}

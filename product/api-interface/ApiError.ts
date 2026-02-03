type ApiErrorId =
  | 'invalidAuthToken'
  | 'invalidInput'
  | 'registrationClosed'
  | 'unknown'

export class ApiError extends Error {
  constructor(
    public readonly id: ApiErrorId,
    public readonly message: string,
  ) {
    super(message)
  }
}

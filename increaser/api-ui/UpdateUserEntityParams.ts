import { UserEntity, UserEntityType } from '@increaser/entities/User'

export type UpdateUserEntityParams<T extends UserEntity> = {
  id: string
  fields: Partial<Omit<UserEntityType[T], 'id'>>
}

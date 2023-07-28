import { v4 as uuid } from 'uuid'

export const getId = () => 'a' + uuid().split('-').join('')

import { convertDuration } from '@lib/utils/time/convertDuration'
import { getSecret } from '@product/secrets'
import jwt from 'jsonwebtoken'

import { getTokenExpirationTime } from './getTokenExpirationTime'

export const generateAuthLinkToken = async (email: string) =>
  jwt.sign(
    {
      email,
      exp: getTokenExpirationTime(convertDuration(20, 'min', 's')),
    },
    await getSecret('emailSecret'),
  )

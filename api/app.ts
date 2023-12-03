import express, { Router } from 'express'
import cors from 'cors'
import { implementation } from './resolvers'
import { getErrorMessage } from '@increaser/utils/getErrorMessage'
import { ApiResolverParams } from './resolvers/ApiResolver'
import { getResolverContext } from './resolvers/utils/getResolverContext'
import { ApiError } from '@increaser/api-interface/ApiError'
import { reportError } from './utils/reportError'
import { pick } from '@increaser/utils/record/pick'
import { ApiMethodName } from '@increaser/api-interface/ApiInterface'

const router = Router()

router.use(express.json())

Object.entries(implementation).forEach(([endpoint, resolver]) => {
  router.post(`/${endpoint}`, async (req, res) => {
    const input = req.body
    const context = await getResolverContext(req)

    try {
      const resolverParams: ApiResolverParams<ApiMethodName> = {
        input,
        context,
      }

      const response = await resolver(resolverParams as never)
      res.json(response)
    } catch (err) {
      const isApiError = err instanceof ApiError
      if (!isApiError) {
        reportError(err, { endpoint, input, context })
      }

      const response = pick(
        isApiError ? err : new ApiError('unknown', getErrorMessage(err)),
        ['id', 'message'],
      )

      res.status(400).json(response)
    }
  })
})

export const app = express()

app.use(cors())

app.use('/', router)

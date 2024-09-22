import { Router } from 'express'
import { unbookmarkTweetController } from '~/controllers/bookmarks.controller'
import { likeTweetController, unlikeTweetController } from '~/controllers/likes.controller'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const likesRouter = Router()

/**
 * Description: Like Tweet
 * Path: /
 * Method: POST
 * Body: { tweet_id: string}
 * Header: {Authorization: Bearer <access_token>}
 */

likesRouter.post('/', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(likeTweetController))

/**
 * Description: Unlike Tweet
 * Path: /:tweet_id
 * Method: POST
 * Body: { tweet_id: string}
 * Header: {Authorization: Bearer <access_token>}
 */

likesRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(unlikeTweetController)
)

export default likesRouter

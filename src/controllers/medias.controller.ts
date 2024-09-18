import { Request, Response, NextFunction } from 'express'
import { USERS_MESSAGE } from '~/constants/messages'
import mediasService from '~/services/medias.services'

export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await mediasService.handleUploadSingleImage(req)
  return res.json({
    message: USERS_MESSAGE.UPLOAD_SUCCESS,
    result: result
  })
}

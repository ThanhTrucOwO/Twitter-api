import { Request, Response, NextFunction } from 'express'
import path from 'path'
import { UPLOAD_DIR } from '~/constants/dir'
import { USERS_MESSAGE } from '~/constants/messages'
import mediasService from '~/services/medias.services'

export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await mediasService.handleUploadSingleImage(req)
  return res.json({
    message: USERS_MESSAGE.UPLOAD_SUCCESS,
    result: result
  })
}

export const serveImageController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  console.log(name)
  return res.sendFile(path.resolve(UPLOAD_DIR, name), (err) => {
    console.log(err)
    if (err) {
      res.status((err as any).status).send('Not found')
    }
  })
}

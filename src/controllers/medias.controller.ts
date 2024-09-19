import { Request, Response, NextFunction } from 'express'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { USERS_MESSAGE } from '~/constants/messages'
import mediasService from '~/services/medias.services'

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.uploadImage(req)
  return res.json({
    message: USERS_MESSAGE.UPLOAD_SUCCESS,
    result: url
  })
}

export const uploadVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.uploadVideo(req)
  return res.json({
    message: USERS_MESSAGE.UPLOAD_SUCCESS,
    result: url
  })
}

export const serveImageController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  console.log(name)
  return res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, name), (err) => {
    console.log(err)
    if (err) {
      res.status((err as any).status).send('Not found')
    }
  })
}

export const serveVideoController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  console.log(name)
  return res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, name), (err) => {
    console.log(err)
    if (err) {
      res.status((err as any).status).send('Not found')
    }
  })
}

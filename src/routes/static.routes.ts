import { Router } from 'express'
import {
  serveImageController,
  serveSegmentController,
  serveVideoStreamController,
  serveM3u8Controller
} from '~/controllers/medias.controller'

const staticRoutes = Router()

staticRoutes.get('/image/:name', serveImageController)
staticRoutes.get('/video-stream/:name', serveVideoStreamController)
staticRoutes.get('/video-hls/:id/master.m3u8', serveM3u8Controller)
staticRoutes.get('/video-hls/:id/:v/:segment', serveSegmentController)

export default staticRoutes

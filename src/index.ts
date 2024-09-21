import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
import staticRoutes from './routes/static.routes'
import cors from 'cors'

config()
databaseService.connect().then(() => databaseService.indexUsers())
const app = express()
app.use(cors())
const port = process.env.PORT || 4000
// Tạo folder upload
initFolder()

app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRoutes)
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))
// app.use('/static', express.static(UPLOAD_IMAGE_DIR))

app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// const mgclient = new MongoClient(
//   `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@facebook.plk13.mongodb.net/?retryWrites=true&w=majority&appName=Facebook`
// )

// const db = mgclient.db('earth')
// // Tạo 1000 document vào collection users
// const users = db.collection('users')
// const usersData = []
// function getRandomNumber() {
//   return Math.floor(Math.random() * 100) + 1
// }

// for (let i = 0; i < 1000; i++) {
//   usersData.push({
//     name: 'user' + (i + 1),
//     age: getRandomNumber(),
//     sex: i % 2 === 0 ? 'male' : 'female'
//   })
// }
// users.insertMany(usersData)

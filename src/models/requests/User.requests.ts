import { JwtPayload } from 'jsonwebtoken'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { ParamsDictionary } from 'express-serve-static-core'

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginBody:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: kusodanma14@gmail.com
 *         password:
 *           type: string
 *           example: Truc123!
 *     SuccessAuthentication:
 *       type: object
 *       properties:
 *         access_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZmMGUyOTU4MmYzMjVkNDRmZTdhN2UyIiwidG9rZW5fdHlwZSI6MCwidmVyaWZ5IjoxLCJpYXQiOjE3Mjc1NzY1MDMsImV4cCI6MTcyODQ3NjUwM30.vSHwB2xGZDG9QImiwSMynxaDOh58Qvflhr5Zps_pr6g
 *         refresh_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZmMGUyOTU4MmYzMjVkNDRmZTdhN2UyIiwidG9rZW5fdHlwZSI6MSwidmVyaWZ5IjoxLCJpYXQiOjE3Mjc1NzY1MDMsImV4cCI6MTczNjIxNjUwM30.LJIOWGykN7HHAffcd188y74qA23aBE3Nie1JIwLF08M
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: MongoId
 *           description: 'ID của người dùng'
 *           example: '66f0e29582f325d44fe7a7e2'
 *         name:
 *           type: string
 *           description: 'Tên của người dùng'
 *           example: 'th truc23'
 *         email:
 *           type: string
 *           description: 'Email của người dùng'
 *           example: 'tr20@gmail.com'
 *         date_of_birth:
 *           type: string
 *           format: IOS8601
 *           description: 'Ngày sinh của người dùng'
 *           example: 2024-09-11T15:39:34.069Z
 *         created_at:
 *           type: string
 *           format: IOS8601
 *           description: 'Thời gian tạo tài khoản'
 *           example: 2024-09-23T03:37:57.305Z
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: 'Thời gian cập nhật gần nhất'
 *           example: 2024-09-23T04:28:22.016Z
 *         verify:
 *           $ref: '#/components/schemas/UserVerifyStatus'
 *         twitter_circle:
 *           type: array
 *           items:
 *             type: string
 *             format: MongoId
 *           description: 'Danh sách ID trong Twitter Circle'
 *           example:
 *             - '66f23a2f398151fc7937459a'
 *         bio:
 *           type: string
 *           description: 'Tiểu sử ngắn của người dùng'
 *           example: 'hello bro'
 *         location:
 *           type: string
 *           description: 'Vị trí địa lý của người dùng'
 *           example: ''
 *         website:
 *           type: string
 *           description: 'Website cá nhân'
 *           example: ''
 *         username:
 *           type: string
 *           description: 'Tên người dùng'
 *           example: 'user66f0e29582f325d44fe7a7e2'
 *         avatar:
 *           type: string
 *           description: 'Đường dẫn đến ảnh đại diện'
 *           example: 'http://localhost:4000/images/avatars/doremon.jpg'
 *         cover_photo:
 *           type: string
 *           description: 'Đường dẫn đến ảnh bìa'
 *           example: 'http://localhost:4000/images/avatars/doremon.jpg'
 *     UserVerifyStatus:
 *       type: number
 *       enum: [Unverified, Verified, Banned]
 *       example: 1
 */

export interface UpdateMeReqBody {
  name?: string
  date_of_birth?: string
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
}

export interface FollowReqBody {
  followed_user_id: string
}

export interface ChangePasswordReqBody {
  old_password: string
  password: string
  confirm_password: string
}

export interface LoginReqBody {
  email: string
  password: string
}

export interface VerifyEmailReqBody {
  email_verify_token: string
}

export interface GetProfileReqParams extends ParamsDictionary {
  username: string
}

export interface UnfollowReqParams extends ParamsDictionary {
  user_id: string
}

export interface ResetPasswordReqBody {
  password: string
  confirm_password: string
  forgot_password_token: string
}

export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface LogoutReqBody {
  refresh_token: string
}

export interface RefreshTokenReqBody {
  refresh_token: string
}

export interface ForgotPasswordReqBody {
  email: string
}

export interface VerifyForgotPasswordReqBody {
  forgot_password_token: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: UserVerifyStatus
  exp: number
  iat: number
}

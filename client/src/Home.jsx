import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'
import { MediaPlayer, MediaProvider } from '@vidstack/react'
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default'
import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/video.css'
const getGoogleAuthUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env
  const url = `https://accounts.google.com/o/oauth2/v2/auth`
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'].join(
      ' '
    ),
    prompt: 'consent',
    access_type: 'offline'
  }
  const queryString = new URLSearchParams(query).toString()
  return `${url}?${queryString}`
}

const googleOAuthUrl = getGoogleAuthUrl()

export default function Home() {
  const isAuthenticated = Boolean(localStorage.getItem('access_token'))
  const profile = JSON.parse(localStorage.getItem('profile')) || {}
  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.reload()
  }
  return (
    <>
      <div>
        <span>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </span>
        <span>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </span>
      </div>
      <video controls width={500}>
        <source src='http://localhost:4000/static/video-stream/3c7b77cecbb29cf5809a23700.mp4' type='video/mp4' />
      </video>
      <h2>HLS Streaming</h2>
      <MediaPlayer src='http://localhost:4000/static/video-hls/Hh_y0Ni7jPqvoHM4c3mzP/master.m3u8'>
        <MediaProvider />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
      <h1>Google OAuth 2.0</h1>
      <p className='read-the-docs'>
        {isAuthenticated ? (
          <>
            <span>
              Hello <strong>{profile.email}</strong>, you are logged in.
            </span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to={googleOAuthUrl}>Login with Google</Link>
        )}
      </p>
    </>
  )
}

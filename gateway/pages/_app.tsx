import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'

const generalsans = localFont({
  src: [
    {
      path: './fonts/GeneralSans-Semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/GeneralSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-main'
})

export default function App({ Component, pageProps }: AppProps) {
  
  return <main className={`${generalsans.variable}`}>
           <Component {...pageProps}  />
          </main> 
}

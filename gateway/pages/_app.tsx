import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'

export default function App({ Component, pageProps }: AppProps) {
  const generalsans = localFont({
    src: [
      {
        path: './fonts/GeneralSans-Semibold.ttf',
        weight: '600',
        style: 'normal',
      },
      
    ],
    variable: '--font-main'
  })
  return <main>
           <Component {...pageProps} className={`${generalsans.variable}`} />
  </main> 
}

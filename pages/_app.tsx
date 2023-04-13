import '@/styles/globals.scss'

import type { AppProps } from 'next/app'
import MainLayout from '@/src/components/layout/main-layout'

export default function App({ Component, pageProps }: AppProps) {
  return <div>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  </div>
}

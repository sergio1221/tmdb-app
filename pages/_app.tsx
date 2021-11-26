import React from 'react'
import type { AppProps } from 'next/app'

import 'styles/general.scss'
import 'styles/layout.scss'
import 'styles/movie.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

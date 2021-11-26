import React from 'react'
import Head from 'next/head'

type TitleProps = {
  value: string;
}
export const Title: React.FC<TitleProps> = ({ value }) => (
  <Head>
    <title>{value}</title>
  </Head>
)

import React from 'react'
import Head from 'next/head'

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>In💯gram - Instagram clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </div>
  )
}

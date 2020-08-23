import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>In💯gram - Instagram clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-white border-b flex justify-center top-0 sticky">
        <div className="flex w-full max-w-4xl p-4">
          <div className="italic flex-auto">
            <Link href="/">
              <button className="flex">
                <div>In</div>
                <div style={{ padding: '5px 2px 0 1px' }}>💯</div>
                <div>gram</div>
              </button>
            </Link>
          </div>
          {/* TODO link */}
          <div className="flex-auto flex justify-center">search...</div>
          <div className="flex-auto flex justify-end">nav item...</div>
        </div>
      </nav>

      {children}
    </div>
  )
}

import React, { useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Logo } from './Logo'
import { AppContext } from '../store/context'

export const Layout: React.FC = ({ children }) => {
  const { state } = useContext(AppContext)

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
                <Logo />
              </button>
            </Link>
          </div>
          {/* TODO link */}
          <div className="flex-auto flex justify-center">search...</div>
          <div
            className="flex-auto flex justify-end"
            title={'logged as ' + state.loggedUserState.loggedUser.email}
          >
            nav item...
          </div>
        </div>
      </nav>

      {children}
    </div>
  )
}

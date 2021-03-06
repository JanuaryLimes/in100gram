import React, { useContext } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import {
  RiHomeLine,
  RiHomeFill,
  RiSendPlaneLine,
  RiSendPlaneFill,
  RiCompass3Line,
  RiCompass3Fill,
  RiHeart3Line,
  RiHeart3Fill,
} from 'react-icons/ri'
import { FaRegUserCircle } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { AppContext } from '../store/context'

enum Locations {
  home = '/',
  inbox = '/direct/inbox',
  explore = '/explore',
  activity = '/accounts/activity',
}

export const Navigation = () => {
  const { state } = useContext(AppContext)
  const { route } = useRouter()

  const buttons = {
    home: {
      href: Locations.home,
      condition: route == Locations.home,
      on: <RiHomeFill />,
      off: <RiHomeLine />,
    },
    inbox: {
      href: Locations.home, // TODO
      condition: route == Locations.inbox,
      on: <RiSendPlaneFill />,
      off: <RiSendPlaneLine />,
    },
    explore: {
      href: Locations.home, // TODO
      condition: route == Locations.explore,
      on: <RiCompass3Fill />,
      off: <RiCompass3Line />,
    },
    activity: {
      href: Locations.home, // TODO
      condition: route == Locations.activity,
      on: <RiHeart3Fill />,
      off: <RiHeart3Line />,
    },
  }

  function user() {
    const photoUrl = state?.loggedUserState?.loggedUser?.viewer?.photoUrl
    const name = state?.loggedUserState?.loggedUser?.viewer?.displayName

    return (
      <div className="flex items-center ml-2" title={name}>
        {photoUrl ? (
          <img className="rounded-full" src={photoUrl}></img>
        ) : (
          <div className="text-2xl">
            <FaRegUserCircle />
          </div>
        )}
      </div>
    )
  }

  return (
    <nav className="bg-white border-b flex justify-center top-0 sticky">
      <div className="flex items-center w-full max-w-4xl p-4">
        <div className="italic flex-auto">
          <Link href="/">
            <button className="flex">
              <Logo />
            </button>
          </Link>
        </div>
        <div className="flex-auto flex justify-center">
          <div>
            <input
              placeholder="Search"
              className="border p-1 rounded-sm text-sm w-56"
            />
          </div>
        </div>
        <div className="flex-auto flex justify-end">
          <div className="flex text-3xl text-gray-900">
            <NavButton {...buttons.home} />
            <NavButton {...buttons.inbox} />
            <NavButton {...buttons.explore} />
            <NavButton {...buttons.activity} />
            {user()}
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavButton({ condition, on, off, href }) {
  return (
    <Link href={href}>
      <button className="hover:text-gray-700 ml-2">
        {condition ? on : off}
      </button>
    </Link>
  )
}

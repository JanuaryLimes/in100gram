import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useApolloClient } from '@apollo/client'
import { getErrorMessage } from '../../lib/form'
import { Logo } from '../../components/Logo'
import { AppContext } from '../../store/context'
import { LoggedUserKey, User } from '../../types'
import { useSignInMutationMutation } from '../../apollo/generated/graphql'
import { Layout } from '../../components/Layout'

function SignIn() {
  const client = useApolloClient()
  const [signIn] = useSignInMutationMutation()
  const [errorMsg, setErrorMsg] = useState()
  const router = useRouter()
  const { dispatch } = useContext(AppContext)

  async function handleSubmit(event) {
    event.preventDefault()

    const emailElement = event.currentTarget.elements.email
    const passwordElement = event.currentTarget.elements.password

    try {
      await client.resetStore()
      const { data } = await signIn({
        variables: {
          email: emailElement.value,
          password: passwordElement.value,
        },
      })
      if (data.signIn.user) {
        const email = data.signIn.user.email
        localStorage.setItem(LoggedUserKey, JSON.stringify({ email } as User))
        dispatch({
          type: 'login',
          payload: { email },
        })
        await router.push('/')
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  const inputClasses = 'border p-2 rounded-sm text-sm w-full mb-2'

  return (
    <Layout>
      <div className="flex flex-col items-center p-4">
        <div className="w-full max-w-sm border bg-white rounded-sm p-10">
          <div className="text-3xl flex justify-center pb-2">
            <Logo />
          </div>

          <form onSubmit={handleSubmit} className="pt-10">
            <div>
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className={inputClasses}
              />
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                className={inputClasses}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 font-semibold p-1 rounded text-white w-full"
            >
              Log in
            </button>

            {errorMsg && <p className="py-4">{errorMsg}</p>}

            {/* TODO reset password? */}
          </form>
        </div>
        <div className="w-full max-w-sm border bg-white rounded-sm p-6 mt-2 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/accounts/emailsignup">
            <button>
              <span className="text-blue-500 font-semibold">Sign up</span>
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default SignIn

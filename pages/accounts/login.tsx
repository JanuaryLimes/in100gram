import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql } from '@apollo/client'
import { useMutation, useApolloClient } from '@apollo/client'
import { getErrorMessage } from '../../lib/form'
import Head from 'next/head'
import { Logo } from '../../components/Logo'

const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`

function SignIn() {
  const client = useApolloClient()
  const [signIn] = useMutation(SignInMutation)
  const [errorMsg, setErrorMsg] = useState()
  const router = useRouter()

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
        await router.push('/')
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  const inputClasses = 'border p-2 rounded-sm text-sm w-full mb-2'

  return (
    <>
      <Head>
        <title>In💯gram - Instagram clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
    </>
  )
}

export default SignIn

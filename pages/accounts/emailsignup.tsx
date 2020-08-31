import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useMutation } from '@apollo/client'
import { getErrorMessage } from '../../lib/form'
import { Logo } from '../../components/Logo'
import { Layout } from '../../components/Layout'

const SignUpMutation = gql`
  mutation SignUpMutation($email: String!, $password: String!) {
    signUp(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`

function SignUp() {
  const [signUp] = useMutation(SignUpMutation)
  const [errorMsg, setErrorMsg] = useState()
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()
    const emailElement = event.currentTarget.elements.email
    const passwordElement = event.currentTarget.elements.password

    try {
      await signUp({
        variables: {
          email: emailElement.value,
          password: passwordElement.value,
        },
      })

      router.push('/accounts/login')
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
          <p className="flex justify-center text-center font-bold text-lg">
            Sign up to see photos and videos from your friends.
          </p>

          <form onSubmit={handleSubmit} className="pt-10 pb-4">
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
              Sign up
            </button>

            {errorMsg && <p className="py-4">{errorMsg}</p>}
          </form>
          <p className="text-center text-xs">
            By signing up, you agree to our Terms . Learn how we collect, use
            and share your data in our Data Policy and how we use cookies and
            similar technology in our Cookies Policy .
          </p>
        </div>
        <div className="w-full max-w-sm border bg-white rounded-sm p-6 mt-2 text-center text-sm">
          Have an account?{' '}
          <Link href="/accounts/login">
            <button>
              <span className="text-blue-500 font-semibold">Log in</span>
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default SignUp

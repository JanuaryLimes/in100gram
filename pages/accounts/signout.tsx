import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation, useApolloClient } from '@apollo/client'
import { Layout } from '../../components/Layout'

const SignOutMutation = gql`
  mutation SignOutMutation {
    signOut
  }
`

function SignOut() {
  const client = useApolloClient()
  const router = useRouter()
  const [signOut] = useMutation(SignOutMutation)

  useEffect(() => {
    signOut().then(() => {
      client.resetStore().then(() => {
        router.push('/accounts/login')
      })
    })
  }, [signOut, router, client])

  return (
    <Layout>
      <p>Signing out...</p>
    </Layout>
  )
}

export default SignOut

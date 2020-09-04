import { useRouter } from 'next/router'
import { Layout } from '../components/Layout'
import { Navigation } from '../components/Navigation'
import { Content } from '../components/Content'
import { FaRegUserCircle } from 'react-icons/fa'
import { useUserQuery } from '../apollo/generated/graphql'
import { Loader } from '../components/Loader'

export const UserPage = () => {
  const router = useRouter()
  const { user } = router.query
  const { data, loading } = useUserQuery({
    variables: { displayName: (user as string) ?? '' },
  })

  if (loading) {
    return (
      <div className="fixed inset-0">
        <Loader />
      </div>
    )
  }

  if (!data.user) {
    return '404' // TODO
  }

  const photoUrl = data.user.photoUrl

  return (
    <Layout>
      <Navigation />
      <Content>
        <div>hej {user}</div>

        <div className="">
          {photoUrl ? (
            <img className="rounded-full" src={photoUrl}></img>
          ) : (
            <div className="text-2xl">
              <FaRegUserCircle />
            </div>
          )}
        </div>
      </Content>
    </Layout>
  )
}

export default UserPage

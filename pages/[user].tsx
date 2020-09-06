import { useRouter } from 'next/router'
import { Layout } from '../components/Layout'
import { Navigation } from '../components/Navigation'
import { Content } from '../components/Content'
import { FaRegUserCircle } from 'react-icons/fa'
import { useUserQuery } from '../apollo/generated/graphql'
import { Loader } from '../components/Loader'

function useUserPageState() {
  const router = useRouter()
  const { user } = router.query
  const { data, loading } = useUserQuery({
    variables: { displayName: (user as string) ?? '' },
  })

  // eslint-disable-next-line no-console
  // console.log('user page props', { router, user, data })

  return {
    loading,
    userInfo: data?.user,
  }
}

export const UserPage = () => {
  const { loading, userInfo } = useUserPageState()

  if (loading) {
    return (
      <div className="fixed inset-0">
        <Loader />
      </div>
    )
  }

  if (!userInfo) {
    return '404' // TODO
  }

  const { photoUrl, postsCount, followers, following, displayName } = userInfo

  function photo() {
    return photoUrl ? (
      <img className="rounded-full" src={photoUrl}></img>
    ) : (
      <div style={{ fontSize: '10rem' }}>
        <FaRegUserCircle />
      </div>
    )
  }

  function info() {
    return (
      <>
        <div className="flex">
          <div className="text-xl">{displayName}</div>
          <div className="pl-2">
            <button className="bg-blue-500 font-semibold p-1 px-2 rounded text-white w-full">
              follow
            </button>
          </div>
        </div>
        <div className="flex">
          <div>posts: {postsCount}</div>
          <div>followersCount: {followers.length}</div>
          <div>followingCount: {following.length}</div>
        </div>
      </>
    )
  }

  return (
    <Layout>
      <Navigation />
      <Content>
        <div className="flex">
          <div className="p-6">{photo()}</div>
          <div className="flex-auto">{info()}</div>
        </div>
      </Content>
    </Layout>
  )
}

export default UserPage

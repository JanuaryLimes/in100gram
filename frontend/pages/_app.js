import '../styles/index.css'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import { AppProvider } from '../store/context'

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  return (
    <ApolloProvider client={apolloClient}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ApolloProvider>
  )
}

export default MyApp

import './App.css'
import './config/i18n'
import { RouterProvider } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from './contexts/AuthContext'
import { apolloClient } from './services/graphql/client'
import { router } from './router'

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App

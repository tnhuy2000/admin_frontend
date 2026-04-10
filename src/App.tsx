import './App.css'
import './config/i18n'
import { RouterProvider } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client/react'
import { AuthProvider } from './contexts/AuthContext'
import { PublicSettingsProvider } from './contexts/PublicSettingsContext'
import { apolloClient } from './services/graphql/client'
import { router } from './router'

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <PublicSettingsProvider>
          <RouterProvider router={router} />
        </PublicSettingsProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App

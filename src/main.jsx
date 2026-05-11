import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
import { router } from './routes/Routes.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast' // 🔥 ADD THIS

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>

    <AuthProvider>
      <RouterProvider router={router} />

      
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            zIndex: 999999, // fix modal overlap issue
          },
        }}
      />

    </AuthProvider>

  </QueryClientProvider>
)
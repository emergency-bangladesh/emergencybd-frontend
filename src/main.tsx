import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import './styles.css'
import { ThemeProvider } from './integrations/theme/theme-provider.tsx'
import { LanguageProvider } from './integrations/language/language-provider.tsx'
import { queryClient } from './integrations/tanstack-query/query-client.ts'
import { Toaster } from './components/ui/sonner.tsx'

// Import the generated route tree
import { routeTree } from './route-tree.gen'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <LanguageProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster visibleToasts={6} richColors />
          </QueryClientProvider>
        </ThemeProvider>
      </LanguageProvider>
    </StrictMode>,
  )
}

import { Outlet, createRootRoute } from '@tanstack/react-router'

import MainLayout from '../layouts/MainLayout'

export const Route = createRootRoute({
  component: () => (
    
      <MainLayout>
        <Outlet />
      </MainLayout>

  ),
  errorComponent: ({ error }) => <div>Something went wrong: {error.message}</div>
})

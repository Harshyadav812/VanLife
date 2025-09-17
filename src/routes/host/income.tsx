import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/host/income')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/host/income"!</div>
}

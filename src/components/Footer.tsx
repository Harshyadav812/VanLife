import { type JSX, type ReactNode } from "react"


export default function Footer({children}:{children: ReactNode}): JSX.Element{
  return (
  <footer className="bg-footer-bg px-6 py-4 md:py-8 mt-auto text-neutral-400">
    <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {children}
    </div>
  </footer>
  )
}

function Section({children}: {children: ReactNode}){
  return (
    <div className="text-lg font-semibold">{children}</div>
  )
}

function FooterNav({children}:{children: ReactNode}){
  return (
    <nav className="flex gap-6 text-sm">
      {children}
    </nav>
  )
}

function FooterLegal(): JSX.Element{
  return (
      <p className="text-xs">
    © {new Date().getFullYear()} My App. All rights reserved.
  </p>
  )
}

Footer.Section = Section
Footer.Nav = FooterNav
Footer.Legal = FooterLegal
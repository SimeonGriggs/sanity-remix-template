import {Logo} from '~/components/Logo'
import {ThemeToggle} from '~/components/ThemeToggle'

type HeaderProps = {
  siteTitle?: string | null
}

export function Header(props: HeaderProps) {
  return (
    <header className="border-b border-gray-100 transition-colors duration-1000 ease-in-out dark:border-gray-900">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
        <Logo siteTitle={props.siteTitle} />
        <ThemeToggle />
      </div>
    </header>
  )
}

import {Logo} from '~/components/Logo'
import {ThemeToggle} from '~/components/ThemeToggle'
import type {LogoProps} from '~/types/home'

export function Header(props: LogoProps) {
  return (
    <header className="border-b border-gray-100 transition-colors duration-1000 ease-in-out dark:border-gray-900">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
        <Logo home={props.home} />
        <ThemeToggle />
      </div>
    </header>
  )
}

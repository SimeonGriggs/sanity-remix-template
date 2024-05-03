import {Logo} from '~/components/Logo'
import type {LogoProps} from '~/types/home'

export function Footer(props: LogoProps) {
  return (
    <header className="border-t border-gray-100 transition-colors duration-1000 ease-in-out dark:border-gray-900">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
        <Logo home={props.home} />
        <div className="flex max-w-sm text-right flex-1 flex-col items-end justify-end gap-2 text-sm lg:flex-row lg:items-center lg:gap-5">
          <a
            className="hover:text-cyan-600 dark:hover:text-cyan-200"
            href="/studio"
          >
            Log in to embedded Sanity Studio
          </a>
          <a
            className="hover:text-cyan-600 dark:hover:text-cyan-200"
            href="https://sanity.io"
          >
            Sign up free at Sanity.io
          </a>
          <a
            className="hover:text-cyan-600 dark:hover:text-cyan-200"
            href="https://github.com/SimeonGriggs/remix-sanity-studio-v3"
          >
            Star this project on GitHub
          </a>
        </div>
      </div>
    </header>
  )
}

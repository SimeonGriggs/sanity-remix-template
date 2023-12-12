import {type PropsWithChildren} from 'react'

import {Footer} from '~/components/Footer'
import {Header} from '~/components/Header'
import {Title} from '~/components/Title'
import type {LogoProps} from '~/types/home'
import type {ThemePreference} from '~/types/themePreference'

export type LayoutProps = PropsWithChildren<
  LogoProps & {theme: ThemePreference}
>

export function Layout({home, theme, children}: LayoutProps) {
  return (
    <>
      <Header home={home} theme={theme} />
      <div className="container mx-auto p-4 lg:p-12 grid grid-cols-1 gap-4 lg:gap-12">
        {home?.title ? <Title>{home?.title}</Title> : null}
        {children}
      </div>
      <Footer home={home} />
    </>
  )
}

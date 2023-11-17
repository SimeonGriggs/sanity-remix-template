import {type PropsWithChildren} from 'react'

import {Footer} from '~/components/Footer'
import {Header} from '~/components/Header'
import type {LogoProps} from '~/types/home'

import {Title} from './Title'

export function Layout({home, children}: PropsWithChildren<LogoProps>) {
  return (
    <>
      <Header home={home} />
      <div className="container mx-auto p-4 lg:p-12 grid grid-cols-1 gap-4 lg:gap-12">
        {home?.title ? <Title>{home?.title}</Title> : null}
        {children}
      </div>
      <Footer home={home} />
    </>
  )
}

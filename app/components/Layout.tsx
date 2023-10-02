import {type PropsWithChildren, Suspense} from 'react'

import {useRootLoaderData} from '~/lib/useRootLoaderData'

import {Footer} from './Footer'
import {Header} from './Header'
import {PreviewProvider} from './PreviewProvider'

export function Layout(props: PropsWithChildren) {
  const rootData = useRootLoaderData()
  const children = (
    <>
      <Header />
      <div className="container mx-auto p-4 lg:p-12">{props.children}</div>
      <Footer />
    </>
  )

  return rootData.preview ? (
    <Suspense fallback={children}>
      <PreviewProvider>{children}</PreviewProvider>
    </Suspense>
  ) : (
    children
  )
}

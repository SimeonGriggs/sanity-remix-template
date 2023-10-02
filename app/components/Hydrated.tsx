import type {PropsWithChildren} from 'react'
import {useEffect, useState} from 'react'

let isHydrating = true

// https://remix.run/docs/en/1.19.3/guides/migrating-react-router-app#client-only-components
export function Hydrated(props: PropsWithChildren): JSX.Element {
  const [isHydrated, setIsHydrated] = useState(!isHydrating)

  useEffect(() => {
    isHydrating = false
    setIsHydrated(true)
  }, [])

  return isHydrated && props.children ? <>{props.children}</> : <></>
}

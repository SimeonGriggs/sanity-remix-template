import type {PropsWithChildren} from 'react'

export function Title(props: PropsWithChildren) {
  return (
    <h1
      className="text-bold max-w-4xl text-4xl font-bold tracking-tighter md:text-4xl lg:text-5xl xl:text-8xl"
      // @ts-expect-error
      style={{textWrap: 'balance'}}
    >
      {props.children}
    </h1>
  )
}
